/*eslint-env node, jest, amd*/
import { DEFAULT_DEPARTMENT } from '@/utils/constants.js'
import { flushPromises } from '@vue/test-utils'
import { setupPage } from './../setupViews.js'
import sampleTemplates from '../../../__data__/templates/sampleTemplates.json'
import {
  getAllTemplates,
  updateTemplate,
  deleteTemplate,
} from '@/api/templates.api'
jest.mock('@/api/user.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/rfps.api')
jest.mock('@/api/templates.api')
jest.mock('@/api/link.api')
jest.mock('@/api/pingIdAuth.js')
jest.mock('@/api/s3Files.js')

const DASHBOARD_URL = `/${DEFAULT_DEPARTMENT}/dashboard`

const recentTemplatesElements = (wrapper) =>
  wrapper.findAll('[data-test*="recent-template-"]')

const templateDropdownOptions = (wrapper) =>
  wrapper.find('[data-test="template-dropdown-options"]')

describe('Dashboard page - templates', () => {
  /**
   * @type {import('@vue/test-utils').VueWrapper}
   * */
  let wrapper

  beforeAll(async () => {
    const setup = await setupPage(DASHBOARD_URL)
    wrapper = setup.wrapper
  })

  describe('Templates component display', () => {
    it('should display correct component title', () => {
      const templatesTitle = wrapper.find('[data-test="templates-title"]')
      expect(templatesTitle.text()).toBe('Templates')
    })
  })

  describe('Templates component functionality ', () => {
    const sampleRecentTemplates = sampleTemplates.filter(
      (template) => !template.bookmarked,
    )

    it('should display empty list of recent templates', async () => {
      getAllTemplates.mockImplementationOnce(() => Promise.resolve([]))
      const { wrapper } = await setupPage(DASHBOARD_URL)
      expect(getAllTemplates).toHaveBeenCalled()
      const recentTemplates = recentTemplatesElements(wrapper)
      expect(recentTemplates.length).toBe(0)
    })

    it('should display list of recent templates', async () => {
      const { wrapper } = await setupPage(DASHBOARD_URL)
      expect(getAllTemplates).toHaveBeenCalled()
      const recentTemplates = recentTemplatesElements(wrapper)
      const recentlyUsedTemplates = sampleTemplates.filter(
        (template) => !template.bookmarked,
      )
      expect(recentTemplates.length).toBe(recentlyUsedTemplates.length)
    })

    it('should display empty list of favorite templates', async () => {
      getAllTemplates.mockImplementationOnce(() => Promise.resolve([]))
      const { wrapper } = await setupPage(DASHBOARD_URL)
      expect(getAllTemplates).toHaveBeenCalled()
      const favoriteTemplates = wrapper.findAll(
        '[data-test*="favorite-template-"]',
      )
      expect(favoriteTemplates.length).toBe(0)
    })

    it('should display list of favorite templates', async () => {
      const { wrapper } = await setupPage(DASHBOARD_URL)
      expect(getAllTemplates).toHaveBeenCalled()
      const recentTemplates = recentTemplatesElements(wrapper)
      const favoriteTemplates = sampleTemplates.filter(
        (template) => template.bookmarked,
      )
      expect(recentTemplates.length).toBe(favoriteTemplates.length)
    })

    it('should display correct template title and number of slides', async () => {
      // tested with recently used templates

      for (const sampleRecentTemplate of sampleRecentTemplates) {
        const numberOfSlides = sampleRecentTemplate.slides.filter(
          (slide) => slide.isEnabled,
        ).length
        const sampleTemplate = wrapper.find(
          `[data-test="recent-template-${sampleRecentTemplates.indexOf(
            sampleRecentTemplate,
          )}"]`,
        )
        expect(sampleTemplate.exists()).toBe(true)
        const sampleTemplateTitle = sampleTemplate.find(
          '[data-test="template-name"]',
        )
        expect(sampleTemplateTitle.exists()).toBe(true)
        expect(sampleTemplateTitle.text()).toBe(
          sampleRecentTemplate.templateName,
        )
        const sampleTemplateNumberOfSlides = sampleTemplate.find(
          '[data-test="number-of-slides"]',
        )
        expect(sampleTemplateNumberOfSlides.exists()).toBe(true)
        expect(sampleTemplateNumberOfSlides.text()).toBe(String(numberOfSlides))
      }
    })

    it('should change template bookmark state on change-bookmark-state-button click', async () => {
      const { wrapper } = await setupPage(DASHBOARD_URL)
      for (const sampleTemplate of sampleTemplates) {
        const changeBookmarkStateButton = wrapper.find(
          `[data-test="change-bookmark-state-button-${sampleTemplate.templateId}"]`,
        )
        expect(changeBookmarkStateButton.exists()).toBe(true)
        await changeBookmarkStateButton.trigger('click')
        const updatedTemplate = {
          bookmarked: !sampleTemplate.bookmarked,
          slideInfos: sampleTemplate.slides,
          templateDescription: sampleTemplate.templateDescription,
          templateId: sampleTemplate.templateId,
          templateName: sampleTemplate.templateName,
        }
        expect(updateTemplate).toHaveBeenCalledWith(updatedTemplate)
      }
    })

    it('should navigate to new presentation template page on new-presentation-template-button click', async () => {
      jest.setTimeout(10000)
      for (const sampleTemplate of sampleTemplates) {
        const { wrapper, router } = await setupPage(DASHBOARD_URL)
        const startPresentationButton = wrapper.find(
          `[data-test="new-presentation-template-button-${sampleTemplate.templateId}"]`,
        )
        expect(startPresentationButton.exists()).toBe(true)
        expect(startPresentationButton.text()).toBe('Start Presentation')
        await startPresentationButton.trigger('click')
        await flushPromises()
        const statPresentationRoute = `/${DEFAULT_DEPARTMENT}/new-presentation/${sampleTemplate.templateId}`
        expect(router.currentRoute.value.path).toBe(statPresentationRoute)
      }
    })

    it('should display template dropdown options on template-dropdown-button click', async () => {
      for (const sampleTemplate of sampleTemplates) {
        const { wrapper } = await setupPage(DASHBOARD_URL)
        const templateDropdownButton = wrapper.find(
          `[data-test="template-dropdown-button-${sampleTemplate.templateId}"]`,
        )
        expect(templateDropdownButton.exists()).toBe(true)

        expect(templateDropdownOptions(wrapper).exists()).toBe(false)
        await templateDropdownButton.trigger('click')
        expect(templateDropdownOptions(wrapper).exists()).toBe(true)
      }
    })

    it('should display share-with-modal on share-template-button-click', async () => {
      for (const sampleTemplate of sampleTemplates) {
        const { wrapper } = await setupPage(DASHBOARD_URL)
        const templateDropdownButton = wrapper.find(
          `[data-test="template-dropdown-button-${sampleTemplate.templateId}"]`,
        )

        await templateDropdownButton.trigger('click')

        const templateShareButton = templateDropdownOptions(wrapper).find(
          '[data-test="template-share-button"]',
        )
        expect(templateShareButton.exists()).toBe(true)
        expect(templateShareButton.text()).toBe('Share')

        const templateShareWithModal = () =>
          wrapper.find('[data-test="template-share-with-modal"]')
        expect(templateShareWithModal().exists()).toBe(false)
        await templateShareButton.trigger('click')
        expect(templateShareWithModal().exists()).toBe(true)
      }
    })

    it('should display shared-with-modal on template-shared-with-button', async () => {
      expect.hasAssertions()
      for (const sampleTemplate of sampleTemplates.slice(0, 1)) {
        const { wrapper } = await setupPage(DASHBOARD_URL)
        const templateDropdownButton = wrapper.find(
          `[data-test="template-dropdown-button-${sampleTemplate.templateId}"]`,
        )

        await templateDropdownButton.trigger('click')

        const templateSharedWithButton = templateDropdownOptions(wrapper).find(
          '[data-test="template-shared-with-button"]',
        )
        expect(templateSharedWithButton.exists()).toBe(true)
        expect(templateSharedWithButton.text()).toBe('Shared with')

        const templateSharedWithModal = () =>
          wrapper.find('[data-test="template-shared-with-modal"]')
        expect(templateSharedWithModal().exists()).toBe(false)
        await templateSharedWithButton.trigger('click')
        expect(templateSharedWithModal().exists()).toBe(true)
      }
    })

    it('should remove template on remove-template-button click', async () => {
      let deletedTemplatesCount = 0
      const { wrapper } = await setupPage(DASHBOARD_URL)
      for (const sampleTemplate of sampleTemplates) {
        const templateDropdownButton = wrapper.find(
          `[data-test="template-dropdown-button-${sampleTemplate.templateId}"]`,
        )

        await templateDropdownButton.trigger('click')

        const removeTemplateButton = templateDropdownOptions(wrapper).find(
          '[data-test="remove-template-button"]',
        )
        expect(removeTemplateButton.exists()).toBe(true)
        expect(removeTemplateButton.text()).toBe('Delete')

        const templateRows = () =>
          recentTemplatesElements(wrapper).length +
          wrapper.findAll('[data-test*="favorite-template-"]').length

        expect(templateRows()).toBe(
          sampleTemplates.length - deletedTemplatesCount,
        )
        await removeTemplateButton.trigger('click')
        expect(templateRows()).toBe(
          sampleTemplates.length - deletedTemplatesCount - 1,
        )
        deletedTemplatesCount++
        expect(deleteTemplate).toHaveBeenCalledWith(sampleTemplate.templateId)
      }
    })
  })
})
