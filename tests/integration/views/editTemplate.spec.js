/*eslint-env node, jest, amd*/
import { setupPage } from './setupViews.js'
import { updateTemplate } from '@/api/templates.api'
import { DEFAULT_DEPARTMENT } from '@/utils/constants.js'
import {
  groupSlides,
  slideDetails,
  useAllDepartmentSlides,
} from '@/data/allSlides.js'
import { allSlideCategories } from '@/data/SlideCategoryInfo.js'
import { getAllTemplatesForUpdate } from '../../__data__/templates/sampleTemplateData.js'

jest.mock('@/api/user.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/templates.api')
jest.mock('@/api/pingIdAuth.js')
jest.mock('@/api/s3Files.js')

const editTemplateFormElement = (wrapper) =>
  wrapper.find('[data-test="edit-template-form"]')

async function toggleSlideListAccordion(wrapper) {
  const expandSlidesButtons = wrapper.findAll(
    '[data-test="expand-slides-button"]',
  )
  for (const expandSlidesButton of expandSlidesButtons) {
    await expandSlidesButton.trigger('click')
  }
}

describe('edit template page', () => {
  /**
   * @type {import('@vue/test-utils').VueWrapper}
   * */
  let wrapper
  /**
   * @type {import('@/store/index.js').default}
   * */
  let store

  const tid = getAllTemplatesForUpdate()[0].templateId
  const EDIT_TempalteUrl = `/${DEFAULT_DEPARTMENT}/templates/${tid}`
  const allSlides = useAllDepartmentSlides('TRAUMA').allDepartmentSlides.value

  beforeAll(async () => {
    const setup = await setupPage(EDIT_TempalteUrl)
    wrapper = setup.wrapper
    store = setup.store
  })

  describe('Edit Template page display', () => {
    it('should show correct title', async () => {
      const pageWrapperHeader = wrapper.find(
        '[data-test="page-wrapper-header"]',
      )
      expect(pageWrapperHeader.exists()).toBe(true)
      expect(pageWrapperHeader.text()).toBe('Edit Templates')
    })

    it('should display correct headerBreadCrumps', () => {
      const breadCrumpsPageName = wrapper.find(
        '[data-test="header-bread-crumps-page-name"]',
      )
      expect(breadCrumpsPageName.exists()).toBe(true)
      expect(breadCrumpsPageName.text()).toBe('Edit Templates')
    })
    it('should display correct template tile', () => {
      const templateTitle = wrapper.find('[data-test="template-title"]')
      expect(templateTitle.exists()).toBe(true)
      expect(templateTitle.text()).toBe('Select your presentation slides')
    })

    it('displays slides and groups', async () => {
      const { wrapper, store } = await setupPage(EDIT_TempalteUrl, true)
      const defaultTemplateSlides =
        store.getters['templates/getTemplateByID'](tid).slides
      const slidesByCategory = groupSlides(defaultTemplateSlides)
      const mockGroupTitles = Object.keys(slidesByCategory).map(
        (category) => allSlideCategories.TRAUMA[category].groupTitle,
      )
      const groupTitles = wrapper.findAll('[data-test="groupTitle"]')
      const slideTitles = () => wrapper.findAll('[data-test*="slideTitle-"]')
      expect(slideTitles().length).toBe(defaultTemplateSlides.length)
      await toggleSlideListAccordion(wrapper)
      expect(slideTitles().length).toBe(0)
      await toggleSlideListAccordion(wrapper)
      expect(slideTitles().length).toBe(defaultTemplateSlides.length)
      slideTitles().forEach((slideTitle, index) =>
        expect(slideTitle.text()).toMatch(
          slideDetails(defaultTemplateSlides[index].slide).slideTitle,
        ),
      )
      expect(groupTitles.length).toBe(mockGroupTitles.length)
      groupTitles.forEach((groupTitle, index) =>
        expect(groupTitle.text()).toMatch(mockGroupTitles[index]),
      )
    })
  })

  describe('Edit Template page functionality', () => {
    describe('Slide item functionality', () => {
      let slidesByCategory

      beforeAll(() => {
        slidesByCategory =
          store.getters['templates/getEditTemplates'](tid).INTRODUCTION[0]
      })

      it('should enable slide when enable button is clicked', async () => {
        const { wrapper, store } = await setupPage(EDIT_TempalteUrl, true)
        const slide0 = wrapper.find(
          `[data-test="selection-item-${
            slidesByCategory.slideNumber || slidesByCategory.pageNumber
          }"]`,
        )
        const toggleSlideButton = slide0.find('[data-test="toggleSlide"]')
        const isEnabled = () =>
          store.getters['templates/getEditTemplates'](tid).INTRODUCTION[0]
            .isEnabled

        expect(isEnabled()).toBe(true)
        await toggleSlideButton.trigger('click')
        expect(isEnabled()).toBe(false)
      })

      it('should toggle popup', async () => {
        const { wrapper } = await setupPage(EDIT_TempalteUrl, true)

        expect(wrapper.find('[data-test="slideModal"]').exists()).toBe(false)
        const togglePopupButton = wrapper.find('[data-test="togglePopup"]')
        expect(togglePopupButton.exists()).toBe(true)
        await togglePopupButton.trigger('click')
        expect(wrapper.find('[data-test="slideModal"]').exists()).toBe(true)

        const slideNumber =
          slidesByCategory.slideNumber || slidesByCategory.pageNumber
        const slideItemHeader = wrapper.find(
          `[data-test="slide-item-header-${slideNumber}"]`,
        )
        const slide = allSlides.find(
          (slide) => slide.slideNumber === slideNumber,
        )

        expect(slideItemHeader.text()).toContain(`Slide ${slideNumber}`)
        expect(slideItemHeader.text()).toContain(slide.slideTitle)
      })

      it('should toggle full view', async () => {
        const { wrapper } = await setupPage(EDIT_TempalteUrl, true)
        const togglePopupButton = wrapper.find('[data-test="togglePopup"]')
        await togglePopupButton.trigger('click')

        const slide0 = wrapper.find(
          `[data-test="selection-item-${
            slidesByCategory.slideNumber || slidesByCategory.pageNumber
          }"]`,
        )

        expect(wrapper.find('[data-test="fullVeiwModal"]').exists()).toBe(false)
        const toggleFullViewButton = slide0.find('[data-test="toggleFullView"]')
        expect(toggleFullViewButton.text()).toBe('See in Full View')
        await toggleFullViewButton.trigger('click')
        expect(wrapper.find('[data-test="fullVeiwModal"]').exists()).toBe(true)
      })
    })

    it('save button opens dialog', async () => {
      const { wrapper } = await setupPage(EDIT_TempalteUrl, true)

      expect(editTemplateFormElement(wrapper).exists()).toBe(false)
      const editTemplateModalButton = wrapper.find(
        '[data-test="edit-template-button"]',
      )
      expect(editTemplateModalButton.text()).toBe('Save')
      await editTemplateModalButton.trigger('click')
      expect(editTemplateFormElement(wrapper).exists()).toBe(true)

      const editModalTitle = wrapper.find('[data-test="edit-modal-title"]')
      expect(editModalTitle.exists()).toBe(true)
      expect(editModalTitle.text()).toBe('Save Template')
      const editModalDescription = wrapper.find(
        '[data-test="edit-modal-description"]',
      )
      expect(editModalDescription.exists()).toBe(true)
      expect(editModalDescription.text()).toBe(
        'Please provide a name and description for your template:',
      )
      const editTemplateName = wrapper.find('[data-test="edit-template-name"]')
      expect(editTemplateName.exists()).toBe(true)
      expect(editTemplateName.text()).toBe('Template Name')
      const editTemplateDescription = wrapper.find(
        '[data-test="edit-template-description"]',
      )
      expect(editTemplateDescription.exists()).toBe(true)
      expect(editTemplateDescription.text()).toBe('Template Description')
    })

    it('template is updated', async () => {
      const { wrapper, store } = await setupPage(EDIT_TempalteUrl, true)

      const expandSlidesButtons = wrapper.findAll(
        '[data-test="expand-slides-button"]',
      )
      await expandSlidesButtons[2].trigger('click')

      const toggleButtons = wrapper.findAll('[data-test="toggleSlide"]')
      await toggleButtons[1].trigger('click')

      const editTemplateModalButton = wrapper.find(
        '[data-test="edit-template-button"]',
      )
      await editTemplateModalButton.trigger('click')
      const slideData = store.getters['templates/getEditTemplatesById'](tid)
      const slideInfos = slideData.slides.map((slideItem) => ({
        isEnabled: slideItem.isEnabled,
        pageNumber: slideItem.slideNumber || slideItem.pageNumber,
        slideCategory: slideItem.slideCategory,
        slideInfoId: slideItem.slideInfoId,
      }))

      const templateName = 'exampleName'
      const templateDescription = 'exampleNameDescription'

      const templateNameValue = wrapper.find('[data-test="template-name"]')
      await templateNameValue.setValue(templateName)
      const templateDescriptionValue = wrapper.find(
        '[data-test="template-description"]',
      )
      await templateDescriptionValue.setValue(templateDescription)

      const saveForm = editTemplateFormElement(wrapper)
      await saveForm.trigger('submit.prevent')
      const submitButton = wrapper.find('[data-test="submit-button"]')
      await submitButton.trigger('click')

      expect(updateTemplate).toHaveBeenCalledWith(
        expect.objectContaining({
          bookmarked: slideData.bookmarked,
          templateId: tid,
          templateName,
          slideInfos,
          templateDescription,
        }),
      )
    })
  })
})
