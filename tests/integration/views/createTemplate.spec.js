/*eslint-env node, jest, amd*/
import { setupPage } from './setupViews.js'
import { createTemplate } from '@/api/templates.api'
import { groupSlides } from '@/data/allSlides.js'
import { allSlideCategories } from '@/data/SlideCategoryInfo.js'
import { createdTemplateIDs } from '@/api/__mocks__/templates.api.js'

jest.mock('@/api/user.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/templates.api')
jest.mock('@/api/pingIdAuth.js')
jest.mock('@/api/s3Files.js')

function getNewTemplateSlides(store) {
  const response = store.getters['templates/getNewTemplateSlides']
  return response
}

const saveTemplateFormElement = (wrapper) =>
  wrapper.find('[data-test="save-template-form"]')

async function toggleSlideListAccordion(wrapper) {
  const expandSlidesButtons = wrapper.findAll(
    '[data-test="expand-slides-button"]',
  )
  for (const expandSlidesButton of expandSlidesButtons) {
    await expandSlidesButton.trigger('click')
  }
}

let newTemplateIndex = 1
for (const department of ['ASC', 'TRAUMA']) {
  describe(`create template page for dep: ${department}`, () => {
    /**
     * @type {import('@vue/test-utils').VueWrapper}
     * */
    let wrapper
    /**
     * @type {import('@/store/index.js').default}
     * */
    let store

    const newTempalteUrl = `/${department}/templates/new`

    beforeAll(async () => {
      const setup = await setupPage(newTempalteUrl)
      wrapper = setup.wrapper
      store = setup.store
    })

    describe(`Create Template page display for dep: ${department}`, () => {
      it('should show correct title', async () => {
        const pageWrapperHeader = wrapper.find(
          '[data-test="page-wrapper-header"]',
        )
        expect(pageWrapperHeader.exists()).toBe(true)
        expect(pageWrapperHeader.text()).toBe('Create Templates')
      })

      it('should display correct headerBreadCrumps', () => {
        const breadCrumpsPageName = wrapper.find(
          '[data-test="header-bread-crumps-page-name"]',
        )
        expect(breadCrumpsPageName.exists()).toBe(true)
        expect(breadCrumpsPageName.text()).toBe('Create Templates')
      })
      it('should display correct presentation tile', () => {
        const presentationTitle = wrapper.find(
          '[data-test="presentation-title"]',
        )
        expect(presentationTitle.exists()).toBe(true)
        expect(presentationTitle.text()).toBe('Select your presentation slides')
      })

      it('displays slides and groups', async () => {
        const { wrapper, store } = await setupPage(newTempalteUrl, true)

        const defaultTemplateSlides = getNewTemplateSlides(store)
        const slidesByCategory = groupSlides(defaultTemplateSlides)
        const mockGroupTitles = Object.keys(slidesByCategory).map(
          (category) => {
            return allSlideCategories[department][category].groupTitle
          },
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
            defaultTemplateSlides[index].slideTitle,
          ),
        )

        expect(groupTitles.length).toBe(mockGroupTitles.length)
        groupTitles.forEach((groupTitle, index) =>
          expect(groupTitle.text()).toMatch(mockGroupTitles[index]),
        )
      })
    })

    describe(`Create Template page functionality for dep: ${department}`, () => {
      describe('Slide item functionality', () => {
        let defaultTemplateSlide0

        beforeAll(() => {
          defaultTemplateSlide0 = getNewTemplateSlides(store)[0]
        })

        it('should enable slide when enable button is clicked', async () => {
          const { wrapper, store } = await setupPage(newTempalteUrl, true)

          const slide0 = wrapper.find(
            `[data-test="selection-item-${defaultTemplateSlide0.slideNumber}"]`,
          )
          const toggleSlideButton = slide0.find('[data-test="toggleSlide"]')
          const isEnabled = () => getNewTemplateSlides(store)[0].isEnabled

          expect(isEnabled()).toBe(false)
          await toggleSlideButton.trigger('click')
          expect(isEnabled()).toBe(true)
        })

        it('should toggle popup', async () => {
          const { wrapper } = await setupPage(newTempalteUrl, true)

          expect(wrapper.find('[data-test="slideModal"]').exists()).toBe(false)
          const togglePopupButton = wrapper.find('[data-test="togglePopup"]')
          expect(togglePopupButton.exists()).toBe(true)
          await togglePopupButton.trigger('click')
          expect(wrapper.find('[data-test="slideModal"]').exists()).toBe(true)

          const slideItemHeader = wrapper.find(
            `[data-test="slide-item-header-${defaultTemplateSlide0.slideNumber}"]`,
          )
          expect(slideItemHeader.text()).toContain(
            String(defaultTemplateSlide0.slideNumber),
          )
          expect(slideItemHeader.text()).toContain(
            defaultTemplateSlide0.slideTitle,
          )
        })

        it('should toggle full view', async () => {
          const { wrapper } = await setupPage(newTempalteUrl, true)
          const togglePopupButton = wrapper.find('[data-test="togglePopup"]')
          await togglePopupButton.trigger('click')

          const slide0 = wrapper.find(
            `[data-test="selection-item-${defaultTemplateSlide0.slideNumber}"]`,
          )

          expect(wrapper.find('[data-test="fullVeiwModal"]').exists()).toBe(
            false,
          )
          const toggleFullViewButton = slide0.find(
            '[data-test="toggleFullView"]',
          )
          expect(toggleFullViewButton.text()).toBe('See in Full View')
          await toggleFullViewButton.trigger('click')
          expect(wrapper.find('[data-test="fullVeiwModal"]').exists()).toBe(
            true,
          )
        })
      })

      it('save button opens dialog', async () => {
        const { wrapper } = await setupPage(newTempalteUrl, true)

        expect(saveTemplateFormElement(wrapper).exists()).toBe(false)
        const saveTemplateModalButton = wrapper.find(
          '[data-test="save-template-button"]',
        )
        expect(saveTemplateModalButton.text()).toBe('Save As Template')
        await saveTemplateModalButton.trigger('click')
        expect(saveTemplateFormElement(wrapper).exists()).toBe(true)

        const saveModalTitle = wrapper.find('[data-test="save-modal-title"]')
        expect(saveModalTitle.exists()).toBe(true)
        expect(saveModalTitle.text()).toBe('Save Template')
        const saveModalDescription = wrapper.find(
          '[data-test="save-modal-description"]',
        )
        expect(saveModalDescription.exists()).toBe(true)
        expect(saveModalDescription.text()).toBe(
          'Please provide a name and description for your template:',
        )
        const saveTemplateName = wrapper.find(
          '[data-test="save-template-name"]',
        )
        expect(saveTemplateName.exists()).toBe(true)
        expect(saveTemplateName.text()).toBe('Template Name')
        const saveTemplateDescription = wrapper.find(
          '[data-test="save-template-description"]',
        )
        expect(saveTemplateDescription.exists()).toBe(true)
        expect(saveTemplateDescription.text()).toBe('Template Description')

        wrapper.unmount()
      })

      it('template is saved', async () => {
        const { wrapper, store } = await setupPage(newTempalteUrl, true)

        const expandSlidesButtons = wrapper.findAll(
          '[data-test="expand-slides-button"]',
        )
        await expandSlidesButtons[2].trigger('click')

        const toggleButtons = wrapper.findAll('[data-test="toggleSlide"]')
        await toggleButtons[1].trigger('click')

        const saveTemplateModalButton = wrapper.find(
          '[data-test="save-template-button"]',
        )
        await saveTemplateModalButton.trigger('click')

        const slideData = getNewTemplateSlides(store)
        const slideInfos = slideData.map((slideItem) => ({
          isEnabled: slideItem.isEnabled,
          pageNumber: slideItem.slideNumber || slideItem.pageNumber,
          slideCategory: slideItem.slideCategory,
          slideCode: slideItem.slideCode || slideItem.slide?.prePopulatedSlide,
        }))

        const templateName = 'exampleName'
        const templateDescription = 'exampleNameDescription'

        const templateNameValue = wrapper.find('[data-test="template-name"]')
        await templateNameValue.setValue(templateName)
        const templateDescriptionValue = wrapper.find(
          '[data-test="template-description"]',
        )
        await templateDescriptionValue.setValue(templateDescription)

        const initialTemplatesCount =
          store.getters['templates/myTemplates'].length

        const saveForm = saveTemplateFormElement(wrapper)
        await saveForm.trigger('submit.prevent')
        const submitButton = wrapper.find('[data-test="submit-button"]')
        await submitButton.trigger('click')

        const finalTemplatesCount =
          store.getters['templates/myTemplates'].length
        expect(finalTemplatesCount).toBe(initialTemplatesCount + 1)

        expect(createTemplate).toHaveBeenCalledWith(
          expect.objectContaining({
            templateName,
            slideInfos,
            templateDescription,
          }),
          department,
        )

        const createdTemplate = store.getters['templates/getTemplateByID'](
          createdTemplateIDs(newTemplateIndex++),
        )
        const enabledSlides = createdTemplate.slideInfos.filter(
          (slide) => slide.isEnabled,
        )
        expect(enabledSlides.length).toBe(1)

        wrapper.unmount()
      })
    })
  })
}
