/*eslint-env node, jest, amd*/
import { setupPage } from './setupViews.js'
import { DEFAULT_DEPARTMENT } from '@/utils/constants.js'
import { flushPromises } from '@vue/test-utils'
import { groupSlides, slideDetails } from '@/data/allSlides.js'
import { syncLink, publishLink } from '@/api/link.api'
import { allSlideCategories } from '@/data/SlideCategoryInfo.js'
import { getSampleUpdatePresentation } from '../../__data__/rfps/sampleRfps'

jest.mock('@/api/user.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/rfps.api')
jest.mock('@/api/link.api')
jest.mock('@/api/pingIdAuth.js')

const pid = '34b28dfc-3488-4b24-b72f-88f831c7c1b2'
const linkId = '4c81812c-02ef-49ef-bb58-d849d825fb69'
const UPDATE_LINK_URL = `/${DEFAULT_DEPARTMENT}/update-link/${pid}/${linkId}`
const BUILDER_URL = `/${DEFAULT_DEPARTMENT}/builder/${pid}`

function storeGetLinksByPresentationId(store, pid) {
  const links = store.getters['link/getLinksByPresentationId'](pid)
  return links
}

describe('Update Link page', () => {
  /**
   * @type {import('@vue/test-utils').VueWrapper}
   * */
  let wrapper
  /**
   * @type {import('@/store/index.js').default}
   * */
  let store

  const presentationToEdit = getSampleUpdatePresentation('TRAUMA', pid)

  beforeAll(async () => {
    const setup = await setupPage(UPDATE_LINK_URL, true)
    wrapper = setup.wrapper
    store = setup.store
  })

  describe('Update link page display', () => {
    it('should show correct page wapper title', async () => {
      const pageWrapperHeader = wrapper.find(
        '[data-test="page-wrapper-header"]',
      )
      expect(pageWrapperHeader.exists()).toBe(true)
      expect(pageWrapperHeader.text()).toBe('')
    })

    it('should show presentation deck title', async () => {
      const wizardHeader = wrapper.find('[data-test="page-title"]')
      expect(wizardHeader.exists()).toBe(true)
      const headerText = presentationToEdit?.customerName + ' Presentation Deck'
      expect(wizardHeader.text()).toEqual(headerText)
    })

    it('should display correct headerBreadCrumps', () => {
      const breadCrumpsPageName = wrapper.find(
        '[data-test="header-bread-crumps-page-name-newRfp"]',
      )
      expect(breadCrumpsPageName.exists()).toBe(true)
      expect(breadCrumpsPageName.text()).toContain('Links')
    })

    // https://github.com/facebook/jest/issues/11543
    jest.setTimeout(10000)
    it('should display correct presentation Title', async () => {
      jest.setTimeout(10000)
      const { wrapper, router } = await setupPage(UPDATE_LINK_URL)
      const arrowButton = wrapper.find('[data-test="link-arrow"]')
      expect(arrowButton.exists()).toBe(true)
      expect(arrowButton.text()).toBe('Presentation')
      await arrowButton.trigger('click')
      await flushPromises()
      expect(router.currentRoute.value.path).toContain(BUILDER_URL)
    })

    it('Should display correct slides and groups', async () => {
      const rfpLinks = storeGetLinksByPresentationId(store, pid)

      const activeLink = rfpLinks.find((link) => link.id == linkId)

      const slidesByCategory = groupSlides(activeLink.slides)

      const mockGroupTitles = Object.keys(slidesByCategory).map(
        (category) => allSlideCategories.TRAUMA[category].groupTitle,
      )

      const groupTitles = wrapper.findAll('[data-test="groupTitle"]')

      const slideTitles = wrapper.findAll('[data-test*="selection-item-"]')

      expect(slideTitles.length).toBe(activeLink.slides.length)

      slideTitles.forEach((slideTitle, index) =>
        expect(slideTitle.text()).toMatch(
          slideDetails(activeLink.slides[index]).slideTitle,
        ),
      )

      expect(groupTitles.length).toBe(mockGroupTitles.length)
      groupTitles.forEach((groupTitle, index) =>
        expect(groupTitle.text()).toMatch(mockGroupTitles[index]),
      )
    })
  })

  describe('Update link page functionality', () => {
    async function toggleSlide0(wrapper, store) {
      const presentation = store.getters['rfps/getPresentationById'](pid)
      const defaultPresentationSlide0 = presentation.slides[0]
      const { pageNumber } = defaultPresentationSlide0
      const slide0 = wrapper.find(`[data-test="selection-item-${pageNumber}"]`)
      const toggleSlideButton = slide0.find(
        `[data-test="toggleSlide-${pageNumber}"]`,
      )
      const isEnabled = () =>
        wrapper.find(`[data-test="isEnabled-${pageNumber}"]`)
      const isEnabledInitially = isEnabled().exists()
      await toggleSlideButton.trigger('click')
      const isEnabledAfterClicking = isEnabled().exists()

      expect(isEnabledAfterClicking).toBe(!isEnabledInitially)
    }

    it('Should display correct updatelink form', async () => {
      const { wrapper } = await setupPage(UPDATE_LINK_URL)
      const links = storeGetLinksByPresentationId(store, pid)

      const customerName =
        store.getters['rfps/getCustomerNameByPresentationId'](pid)
      const customName = wrapper.find('[data-test="custom-name"]')
      expect(customName.text()).toBe(customerName)

      const linkSelector = wrapper.find('[data-test="link-selector"]')
      const linkSelectorOption = linkSelector.find(
        `[data-test="linkItem-name-${links[0].id}"]`,
      )
      expect(linkSelectorOption.text()).toBe(links[0].linkName)

      const activeLinkFullUrl = `${window.location.origin}/${DEFAULT_DEPARTMENT}/present/${customerName}/${links[0].hyperLink}`
      const activeLinkpath = `/${DEFAULT_DEPARTMENT}/present/${customerName}/${links[0].hyperLink}`

      const activeLink = wrapper.find('[data-test="active-link"]')
      expect(activeLink.text()).toBe(activeLinkFullUrl)
      expect(activeLink.attributes().href).toBe(activeLinkpath)

      const passCodeValueDisplay = wrapper.find('[data-test="passCode-value"]')
      expect(passCodeValueDisplay.text()).toBe(links[0].passCode)

      window.__defineGetter__('navigator', function () {
        return {
          clipboard: {
            writeText: jest.fn((x) => x),
          },
        }
      })
      navigator.clipboard.writeText = jest.fn()

      const copyPasscodeButton = wrapper.find(
        '[data-test="copy-passcode-button"]',
      )
      await copyPasscodeButton.trigger('click')

      // todo
      // expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      //   links[0].passCode,
      // )
    })

    it('should enable slide when enable button is clicked', async () => {
      const { wrapper, store } = await setupPage(UPDATE_LINK_URL, true)
      await toggleSlide0(wrapper, store)
    })

    it('should navigate to different link', async () => {
      const { wrapper, store, router } = await setupPage(UPDATE_LINK_URL, true)
      const rfpLinks = storeGetLinksByPresentationId(store, pid)
      const createdLinksBar = wrapper.find('[data-test="created-links-bar"]')

      const linkToGoTo = rfpLinks[1]
      const linkButton = createdLinksBar.find(
        `[data-test="link-item-${linkToGoTo.id}"]`,
      )
      expect(linkButton.text()).toBe(linkToGoTo.linkName)
      await linkButton.trigger('click')
      await flushPromises()
      const EDIT_LINK_URL = `/${DEFAULT_DEPARTMENT}/update-link/${linkToGoTo.presentationId}/${linkToGoTo.id}`
      expect(router.currentRoute.value.path).toContain(EDIT_LINK_URL)
    })

    it('created link presentation button is clicked', async () => {
      const { wrapper, router } = await setupPage(UPDATE_LINK_URL, true)
      const createButton = wrapper.find('[data-test="create-New-Link-Button"]')
      expect(createButton.text()).toBe('+')
      await createButton.trigger('click')
      await flushPromises()
      const CREATE_LINK_URL = `/${DEFAULT_DEPARTMENT}/create-link/${pid}`
      expect(router.currentRoute.value.path).toContain(CREATE_LINK_URL)
    })

    it('should update publishLink when update link button is clicked', async () => {
      const { wrapper, store } = await setupPage(UPDATE_LINK_URL, true)
      await toggleSlide0(wrapper, store)

      const linkForm = wrapper.find('[data-test="link-form"]')
      const submitBtn = linkForm.find('[data-test="submit-btn"]')
      await submitBtn.trigger('submit.prevent')
      await flushPromises()

      const rfpLink = storeGetLinksByPresentationId(store, pid)[0]
      expect(syncLink).toBeCalledWith(linkId)
      expect(publishLink).toBeCalledWith(
        expect.objectContaining({
          hyperLink: rfpLink.hyperLink,
          linkId: rfpLink.id,
          linkName: rfpLink.linkName,
          linkType: 'FOR_HOSPITALS',
          passCode: rfpLink.passCode,
          presentationId: pid,
          linkSlides: rfpLink.slides
            .slice(1)
            .filter((slide) => slide.isEnabled)
            .map((slide) => {
              return {
                isStarred: slide.isStarred,
                slideInfoId: slide.slideInfoId,
              }
            }),
          viewCount: rfpLink.viewCount,
        }),
      )
    })
  })
})
