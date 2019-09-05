/*eslint-env node, jest, amd*/
import {
  fetchCustomSlidesByOwnerId,
  deleteCustomSlide,
} from '@/api/custom-slide.api.js'
import { mockCustomSlides } from '@/api/__mocks__/custom-slide.api.js'
import { flushPromises } from '@vue/test-utils'
import { setupPage } from '../setupViews.js'

jest.mock('@/api/custom-slide.api.js')
jest.mock('@/api/notification.api.js')
jest.mock('@/api/user.api.js')
jest.mock('@/api/pingIdAuth.js')
jest.mock('@/api/s3Files.js')

const slideTableRows = (wrapper) => wrapper.findAll('[data-test*="slide-row-"]')

for (const department of ['ASC', 'TRAUMA']) {
  const CUSTOM_SLIDES_URL = `/${department}/settings/custom-slides`

  describe(`Custom Slides page ${department}`, () => {
    /**
     * @type {import('@vue/test-utils').VueWrapper}
     * */
    let wrapper
    const mockSlideInfoId_0 = mockCustomSlides[0].slideInfoId

    beforeAll(async () => {
      const setup = await setupPage(CUSTOM_SLIDES_URL)
      wrapper = setup.wrapper
    })

    describe(`Custom Slides page display`, () => {
      it('should display correct title', () => {
        const pageWrapperHeader = wrapper.find(
          '[data-test="page-wrapper-header"]',
        )
        expect(pageWrapperHeader.exists()).toBe(true)
        expect(pageWrapperHeader.text()).toBe('Settings')
      })

      it('should display correct headerBreadCrumps', () => {
        const breadCrumpsPageName = wrapper.find(
          '[data-test="header-bread-crumps-page-name"]',
        )
        expect(breadCrumpsPageName.exists()).toBe(true)
        expect(breadCrumpsPageName.text()).toBe('Settings')
      })

      it('should display correct card title', () => {
        const tabAccountSettings = wrapper.find(
          '[data-test="tab-panel-account-settings"]',
        )
        expect(tabAccountSettings.exists()).toBe(true)
        expect(tabAccountSettings.text()).toBe('Account Settings')
      })

      it('should display correct active tab title', () => {
        const tabActiveItem = wrapper.find(
          '[data-test="tab-panel-active-item"]',
        )
        expect(tabActiveItem.exists()).toBe(true)
        expect(tabActiveItem.text()).toBe('Custom Slides')
      })

      it('should display custom slides create new button', () => {
        const createNewBtn = wrapper.find(
          '[data-test="tab-panel-create-new-custom-slide"]',
        )
        expect(createNewBtn.exists()).toBe(true)
        expect(createNewBtn.text()).toBe('Create New')
      })

      it('should display table headers', () => {
        const customSlidesTable = wrapper.find(
          '[data-test="custom-slides-table"]',
        )
        const customSlidesTableHeaders = customSlidesTable.findAll('th')
        expect(customSlidesTableHeaders.length).toBe(3)
      })

      it('should render table onMount', async () => {
        expect(fetchCustomSlidesByOwnerId).toHaveBeenCalled()

        const tableRows = slideTableRows(wrapper)
        expect(tableRows.length).toBe(mockCustomSlides.length)
      })

      it('should render empty slide list', async () => {
        fetchCustomSlidesByOwnerId.mockImplementationOnce(() =>
          Promise.resolve([]),
        )
        const { wrapper } = await setupPage(CUSTOM_SLIDES_URL)
        const customSlidesTable = wrapper.find(
          '[data-test="custom-slides-table"]',
        )
        expect(customSlidesTable.text()).toContain('No Items Available')
        const tableRows = slideTableRows(wrapper)
        expect(tableRows.length).toBe(0)
      })
    })

    describe(`Custom Slides page functionality`, () => {
      it('should display preview button', async () => {
        const { wrapper, router } = await setupPage(CUSTOM_SLIDES_URL)

        const previewBtn = wrapper.find(
          `[data-test*="custom-slides-preview-${mockSlideInfoId_0}"]`,
        )
        expect(previewBtn.exists()).toBe(true)
        expect(previewBtn.text()).toBe('Preview')

        await previewBtn.trigger('click')
        await flushPromises()

        expect(router.currentRoute.value.path).toMatch(
          `/settings/custom-slides/edit/${mockSlideInfoId_0}/1`,
        )
      })

      it('should display s3 image', () => {
        const s3Image = wrapper.findAll(
          '[data-test*="custom-slides-s3-image-"]',
        )
        expect(s3Image.length).toBe(mockCustomSlides.length)
      })

      it('dropdown button should work', async () => {
        const menuButtons = wrapper.findAll(
          '[data-test*="custom-slide-menu-btn-"]',
        )
        expect(menuButtons.length).toBe(mockCustomSlides.length)

        const menuButton = wrapper.find(
          `[data-test="custom-slide-menu-btn-${mockSlideInfoId_0}"]`,
        )
        await menuButton.trigger('click')

        expect(
          wrapper
            .find(`[data-test="custom-slide-menu-btn-${mockSlideInfoId_0}"]`)
            .isVisible(),
        ).toBe(true)
        expect(
          wrapper
            .find(`[data-test="custom-slide-delete-btn-${mockSlideInfoId_0}"]`)
            .exists(),
        ).toBe(true)
        expect(
          wrapper
            .find(`[data-test="custom-slide-edit-btn-${mockSlideInfoId_0}"]`)
            .exists(),
        ).toBe(true)
      })

      it('edit button should work', async () => {
        const { wrapper, router } = await setupPage(CUSTOM_SLIDES_URL)

        const menuButton = wrapper.find(
          `[data-test="custom-slide-menu-btn-${mockSlideInfoId_0}"]`,
        )
        await menuButton.trigger('click')

        const editButton = wrapper.find(
          `[data-test="custom-slide-edit-btn-${mockSlideInfoId_0}"]`,
        )
        await editButton.trigger('click')
        await flushPromises()

        expect(router.currentRoute.value.path).toMatch(
          `/settings/custom-slides/edit/${mockSlideInfoId_0}/1`,
        )
      })

      it('delete button should work', async () => {
        const { wrapper } = await setupPage(CUSTOM_SLIDES_URL)

        const menuButton = wrapper.find(
          `[data-test="custom-slide-menu-btn-${mockSlideInfoId_0}"]`,
        )
        await menuButton.trigger('click')

        let tableRowToDelete = wrapper.find(
          `[data-test="slide-row-${mockSlideInfoId_0}"]`,
        )
        expect(tableRowToDelete.exists()).toBe(true)

        let tableRows = slideTableRows(wrapper)
        expect(tableRows.length).toBe(mockCustomSlides.length)

        const deleteButton = wrapper.find(
          `[data-test="custom-slide-delete-btn-${mockSlideInfoId_0}"]`,
        )
        await deleteButton.trigger('click')
        await flushPromises()

        expect(deleteCustomSlide).toHaveBeenCalledWith(mockSlideInfoId_0)

        tableRows = slideTableRows(wrapper)
        expect(tableRows.length).toBe(mockCustomSlides.length - 1) // one row is deleted

        tableRowToDelete = wrapper.find(
          `[data-test="slide-row-${mockSlideInfoId_0}"]`,
        )
        expect(tableRowToDelete.exists()).toBe(false)
      })
    })
  })
}
