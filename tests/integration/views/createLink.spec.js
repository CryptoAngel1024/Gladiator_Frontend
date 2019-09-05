/*eslint-env node, jest, amd*/
import { setupPage } from './setupViews.js'
import { DEFAULT_DEPARTMENT } from '@/utils/constants.js'
import { flushPromises } from '@vue/test-utils'
import { groupSlides } from '@/data/allSlides.js'

import { publishLink } from '@/api/link.api'

import { getCreateLinkResponse } from '../../__data__/link/linkData'
import { allSlideCategories } from '@/data/SlideCategoryInfo.js'
import { getSampleUpdatePresentation } from '../../__data__/rfps/sampleRfps'
import { formatDate } from '@/utils/formatDate'

jest.mock('@/api/user.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/rfps.api')
jest.mock('@/api/link.api')
jest.mock('@/api/pingIdAuth.js')

const pid = `70851590-41d1-4f14-a68d-8f84199a83a1-${DEFAULT_DEPARTMENT}`
const CREATE_LINK_URL = `/${DEFAULT_DEPARTMENT}/create-link/${pid}`
const BUILDER_LINK_URL = `/${DEFAULT_DEPARTMENT}/builder/${pid}`
const SHOULD_DISPLAY_CORRECT_PRESENTATION_TITLE =
  'should display correct presentation Title'

function getPresentationById(store, presentationId) {
  const response = store.getters['rfps/getPresentationById'](presentationId)
  return response
}

describe('Create Link page', () => {
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
    const setup = await setupPage(CREATE_LINK_URL, true)
    wrapper = setup.wrapper
    store = setup.store
  })

  describe('Create link page display', () => {
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

    it(SHOULD_DISPLAY_CORRECT_PRESENTATION_TITLE, async () => {
      const { wrapper, router } = await setupPage(CREATE_LINK_URL)
      const arrowButton = wrapper.find('[data-test="link-arrow"]')
      expect(arrowButton.exists()).toBe(true)
      expect(arrowButton.text()).toBe('Presentation')
      await arrowButton.trigger('click')
      await flushPromises()
      expect(router.currentRoute.value.path).toContain(BUILDER_LINK_URL)
    })
    it('Should display correct slides and groups', async () => {
      const presentation = getPresentationById(store, pid)
      const slidesByCategory = groupSlides(presentation.slides)

      const mockGroupTitles = Object.keys(slidesByCategory).map(
        (category) => allSlideCategories.TRAUMA[category].groupTitle,
      )

      const groupTitles = wrapper.findAll('[data-test="groupTitle"]')

      const slideTitles = wrapper.findAll('[data-test*="selection-item-"]')

      expect(slideTitles.length).toBe(presentation.slides.length)

      slideTitles.forEach((slideTitle, index) =>
        expect(slideTitle.text()).toMatch(
          presentation.slides[index].slideTitle,
        ),
      )

      expect(groupTitles.length).toBe(mockGroupTitles.length)
      groupTitles.forEach((groupTitle, index) =>
        expect(groupTitle.text()).toMatch(mockGroupTitles[index]),
      )
    })
  })

  describe('Create link page functionality', () => {
    async function toggleSlide0(wrapper, store) {
      const presentation = getPresentationById(store, pid)
      const defaultPresentationSlide0 = presentation.slides[0]
      const { slideNumber } = defaultPresentationSlide0
      const slide0 = wrapper.find(`[data-test="selection-item-${slideNumber}"]`)
      const toggleSlideButton = slide0.find(
        `[data-test="toggleSlide-${slideNumber}"]`,
      )

      const isEnabled = () =>
        wrapper.find(`[data-test="isEnabled-${slideNumber}"]`)
      const isEnabledInitially = isEnabled().exists()
      await toggleSlideButton.trigger('click')
      const isEnabledAfterClicking = isEnabled().exists()

      expect(isEnabledAfterClicking).toBe(!isEnabledInitially)
    }

    it('should enable slide when enable button is clicked', async () => {
      const { wrapper, store } = await setupPage(CREATE_LINK_URL, true)
      await toggleSlide0(wrapper, store)
    })

    it('should create publishLink when create link button is clicked', async () => {
      const LINK_NAME = 'test'
      const HYPER_LINK = 'url'
      const { wrapper, store, router } = await setupPage(CREATE_LINK_URL, true)
      const presentation = getPresentationById(store, pid)

      await toggleSlide0(wrapper, store)

      const linkForm = wrapper.find('[data-test="link-form"]')
      const CustomName = wrapper.find('[data-test="custom-name"]')
      const headerText = presentationToEdit?.customerName
      expect(CustomName.text()).toEqual(headerText)
      const linkNameInput = linkForm.find('[data-test="linkName-input"]')
      linkNameInput.setValue(LINK_NAME)
      const hyperLinkInput = linkForm.find('[data-test="hype-link-input"]')
      hyperLinkInput.setValue(HYPER_LINK)

      const submitBtn = linkForm.find('[data-test="submit-btn"]')
      await submitBtn.trigger('submit.prevent')

      const links = store.getters['link/getLinksByPresentationId'](pid)
      const link = links?.find((link) => link.id == pid) || {}
      const linkSlides = presentation.slides
        .slice(1)
        .filter((slide) => slide.isEnabled)
        .map((slide) => {
          return { isStarred: slide.isStarred, slideInfoId: slide.slideInfoId }
        })

      const expectedPublishLink = expect.objectContaining({
        hyperLink: HYPER_LINK,
        linkId: links.id,
        linkName: LINK_NAME,
        linkType: 'FOR_HOSPITALS',
        presentationId: pid,
        linkSlides: expect.arrayContaining(linkSlides),
        updatedOn: link.updatedDate ? formatDate(link.updatedDate) : '',
      })
      expect(publishLink).toHaveBeenCalledWith(expectedPublishLink)
      await flushPromises()
      const EDIT_LINK_URL = `/${DEFAULT_DEPARTMENT}/update-link/${pid}/${
        getCreateLinkResponse().id
      }`
      expect(router.currentRoute.value.path).toContain(EDIT_LINK_URL)
    })
  })
})
