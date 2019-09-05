/*eslint-env node, jest, amd*/
import { setupPage } from './setupViews.js'
import { DEFAULT_DEPARTMENT } from '@/utils/constants.js'
import { flushPromises } from '@vue/test-utils'
import { updateSlideContent } from '@/api/rfps.api'
import { DEPARTMENTS_DATA } from './testUtils.js'
import {
  getSampleUpdatePresentation,
  getMyRfps,
} from '@tests/__data__/rfps/sampleRfps.js'
jest.mock('@/api/user.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/rfps.api')
jest.mock('@/api/link.api')
jest.mock('@/api/custom-slide.api.js')
jest.mock('@/api/templates.api')
jest.mock('@/utils/strings')
jest.mock('@/api/pingIdAuth.js')

const department = 'TRAUMA'
const presentationId = DEPARTMENTS_DATA[department].pid
const presentationToEdit = getSampleUpdatePresentation(
  department,
  presentationId,
)
const customerName = presentationToEdit.customerName

const slideIdToEdit = 'INTRO1'
const SLIDE_BUILDER_URL = `/${DEFAULT_DEPARTMENT}/builder/${presentationId}/${slideIdToEdit}`
const CREATE_LINK_URL = `/${DEFAULT_DEPARTMENT}/create-link/${presentationId}`
const slideToEdit = presentationToEdit.slides.find(
  ({ slide }) => slide.prePopulatedSlide === slideIdToEdit,
)
const initialSlideContent = JSON.parse(slideToEdit.slide.slideContent)

const presentationId2 = getMyRfps(department)[6].presentationId
const SLIDE_BUILDER_URL2 = `/${DEFAULT_DEPARTMENT}/builder/${presentationId2}/${slideIdToEdit}`

describe('Slide Builder page', () => {
  /**
   * @type {import('@vue/test-utils').VueWrapper}
   * */
  let wrapper

  beforeAll(async () => {
    const setup = await setupPage(SLIDE_BUILDER_URL)
    wrapper = setup.wrapper
  })

  describe('Slide Builder page display', () => {
    it('should display page title', async () => {
      const pageTitle = wrapper.find('[data-test="page-title"]')
      expect(pageTitle.exists()).toBe(true)
      expect(pageTitle.text()).toBe(`${customerName} Presentation Deck`)
    })
    it('should display correct headerBreadCrumps', () => {
      const breadCrumpsPageName = wrapper.find(
        '[data-test="header-bread-crumps-page-name-newRfp"]',
      )
      expect(breadCrumpsPageName.exists()).toBe(true)
      expect(breadCrumpsPageName.text()).toBe(
        'Home \\ Update Presentation\\ Edit Slides',
      )
    })
    it('should should display generate link and exit edit mode button', async () => {
      const { wrapper, router } = await setupPage(SLIDE_BUILDER_URL)
      const generateLinkBtn = wrapper.find('[data-test="generate-link"]')
      const exitEditmode = wrapper.find('[data-test="exit-edit-mode"]')
      expect(generateLinkBtn.exists()).toBe(true)
      expect(exitEditmode.exists()).toBe(true)
      expect(generateLinkBtn.text()).toBe('Generate Link')
      expect(exitEditmode.text()).toBe('Exit edit mode')
      await generateLinkBtn.trigger('click')
      await flushPromises()
      expect(router.currentRoute.value.path).toMatch(CREATE_LINK_URL)
    })

    it('Bulder sideBar exists', async () => {
      const buiderSidbar = wrapper.find(
        '[data-test="bulder-side-bar-information"]',
      )

      expect(buiderSidbar.exists()).toBe(true)
      expect(buiderSidbar.text()).toBe('Information')
      const arrowUp = wrapper.find('[data-test="svgIcon-test-arrow-up"]')
      expect(arrowUp.exists()).toBe(true)
      const arrowDown = wrapper.find('[data-test="svgIcon-test-arrow-down"]')
      expect(arrowDown.exists()).toBe(true)
    })

    it('should display texts text', () => {
      const texts = wrapper.find(
        '[data-test="slide-builder-sidebar-texts-lable"]',
      )
      expect(texts.exists()).toBe(true)
      expect(texts.text()).toBe('Texts')
    })
    it('should display title lable', () => {
      const title = wrapper.find('[data-test="slide-builder-sidebar-title"]')
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe('Title')
    })

    it('should display subtitle lable', () => {
      const subtitle = wrapper.find(
        '[data-test="slide-builder-sidebar-subtitle"]',
      )
      expect(subtitle.exists()).toBe(true)
      expect(subtitle.text()).toBe('Subtitle')
    })

    it('should display images lable', async () => {
      const images = wrapper.find('[ data-test="slide-builder-sidebar-images"]')
      expect(images.exists()).toBe(true)
      expect(images.text()).toBe('Images')
    })
    it('should display companyLogo lable', async () => {
      const companyLogo = wrapper.find(
        '[ data-test="slide-builder-sidebar-company-logo-lable"]',
      )
      expect(companyLogo.exists()).toBe(true)
      expect(companyLogo.text()).toBe('Company Logo')
    })

    it('should display slide title', () => {
      const sildeTitle = wrapper.find('[data-test="slide-title"]')
      expect(sildeTitle.exists()).toBe(true)
      expect(sildeTitle.text()).toBe('Slide 1: Title Slide')
    })
    it('should display slide eye button', () => {
      const slideEye = wrapper.find('[data-test="slide-eye"]')
      expect(slideEye.exists()).toBe(true)
    })
    it('should display slide down button', () => {
      const slideDown = wrapper.find('[data-test="slide-slide-down"]')
      expect(slideDown.exists()).toBe(true)
    })
    it('should display slide down up', () => {
      const slideUp = wrapper.find('[data-test="slide-slide-up"]')
      expect(slideUp.exists()).toBe(true)
    })

    it('should display slide previous button', () => {
      const previous = wrapper.find('[data-test="slide-previous-button"]')
      expect(previous.exists()).toBe(true)
      expect(previous.text()).toBe('Previous')
    })
    it('should display slide next button', () => {
      const next = wrapper.find('[data-test="slide-next-button"]')
      expect(next.exists()).toBe(true)
      expect(next.text()).toBe('Next')
    })
    it('should display empty message', async () => {
      const { wrapper } = await setupPage(SLIDE_BUILDER_URL2)
      const emptySlideText = wrapper.find('[data-test="empty-slide-text"]')
      expect(emptySlideText.exists()).toBe(true)
      expect(emptySlideText.text()).toBe('Presentation not found')
    })

    it('should display title textarea', async () => {
      const titleInput = wrapper.find(
        '[data-test="slide-builder-sidebar-title-input"]',
      )

      expect(titleInput.exists()).toBe(true)
      expect(titleInput.element.value).toBe(initialSlideContent.title)
      const subtitleInput = wrapper.find(
        '[data-test="slide-builder-sidebar-subtitle-textarea"]',
      )
      expect(subtitleInput.exists()).toBe(true)
      expect(subtitleInput.element.value).toBe(initialSlideContent.subTitle)

      const introSlideTitle = wrapper.find(
        '[data-test="introduction-slide-title"]',
      )
      expect(introSlideTitle.text()).toBe(titleInput.element.value)
      const introSlideSubTitle = wrapper.find(
        '[data-test="introduction-slide-subTitle"]',
      )
      expect(introSlideSubTitle.text()).toBe(subtitleInput.element.value)
    })
  })

  describe('Slide Builder page functionality', () => {
    it('should update title and subtitle', async () => {
      const { wrapper } = await setupPage(SLIDE_BUILDER_URL)

      const titleInput = wrapper.find(
        '[data-test="slide-builder-sidebar-title-input"]',
      )
      const updatedContent = {
        title: 'Title1',
        subTitle: 'Subtitle1',
      }

      await titleInput.setValue(updatedContent.title)
      const subtitleInput = wrapper.find(
        '[data-test="slide-builder-sidebar-subtitle-textarea"]',
      )
      await subtitleInput.setValue(updatedContent.subTitle)

      const payload = {
        content: `{"title":"${updatedContent.title}","subTitle":"${updatedContent.subTitle}"}`,
        presentationId: presentationToEdit.presentationId,
        slideId: slideToEdit.slide.slideId,
      }
      expect(updateSlideContent).toHaveBeenCalledWith(
        expect.objectContaining(payload),
      )

      const introSlideTitle = wrapper.find(
        '[data-test="introduction-slide-title"]',
      )
      expect(introSlideTitle.text()).toBe(updatedContent.title)
      const introSlideSubTitle = wrapper.find(
        '[data-test="introduction-slide-subTitle"]',
      )
      expect(introSlideSubTitle.text()).toBe(updatedContent.subTitle)
    })
  })
})
