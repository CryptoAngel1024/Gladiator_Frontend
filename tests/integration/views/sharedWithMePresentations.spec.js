/*eslint-env node, jest, amd*/
import { setupPage } from './setupViews.js'
import { getMyrfps } from '@/api/rfps.api'
import { flushPromises } from '@vue/test-utils'
import { mockUserDetail } from '../../__data__/auth/authData.js'
import { getMyRfps } from '../../__data__/rfps/sampleRfps'

jest.mock('@/api/user.api')
jest.mock('@/api/rfps.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/pingIdAuth.js')
jest.mock('@/api/s3Files.js')

for (const department of ['ASC', 'TRAUMA']) {
  const SHARED_WITH_ME_PRESENTATIONS_URL = `/${department}/shared-with-me`

  const sharedPresentations = getMyRfps(department).filter(
    (rfp) => rfp.owner !== mockUserDetail.email,
  )

  describe(`Shared With Me Presentations View Page ${department}`, () => {
    /**
     * @type {import('@vue/test-utils').VueWrapper}
     * */
    let wrapper

    beforeAll(async () => {
      const setup = await setupPage(SHARED_WITH_ME_PRESENTATIONS_URL)
      wrapper = setup.wrapper
    })

    describe(`Shared With Me Presentations page display ${department}`, () => {
      it('should display correct page title', async () => {
        const pageTitle = wrapper.find('[data-test="page-title"]')
        expect(pageTitle.exists()).toBe(true)
        expect(pageTitle.text()).toBe('Shared with Me')
      })
      it('should display correct breadcrumb title', () => {
        const breadcrumbTitle = wrapper.find(
          '[data-test="header-bread-crumps-page-name"]',
        )
        expect(breadcrumbTitle.exists()).toBe(true)
        expect(breadcrumbTitle.text()).toBe('Shared with Me')
      })
      it('should display correct table headers', () => {
        const tableHeaders = ['', 'Customer Name', 'My Access', 'Shared by', '']
        const publishedLinksTable = wrapper.find(
          '[data-test="shared-with-me-table"]',
        )
        const publishedLinksTableHeaders = publishedLinksTable.findAll('th')
        expect(publishedLinksTableHeaders.length).toBe(tableHeaders.length)
        publishedLinksTableHeaders.forEach((tableHeader, index) => {
          expect(tableHeader.text()).toBe(tableHeaders[index])
        })
      })
    })
    describe(`Shared With Me Presentations page functionality ${department}`, () => {
      const getSharedPresentationRows = (wrapper) =>
        wrapper
          .find('[data-test="shared-with-me-table"]')
          .find('tbody')
          .findAll('[data-test*="shared-with-me-presentation-row-"]')

      it('should display empty shared-with-me-presentations table', async () => {
        getMyrfps.mockImplementationOnce(() => Promise.resolve([]))

        const { wrapper } = await setupPage(SHARED_WITH_ME_PRESENTATIONS_URL)

        expect(getMyrfps).toHaveBeenCalled()
        const sharedWithMePresentationsTableRows =
          getSharedPresentationRows(wrapper)
        expect(sharedWithMePresentationsTableRows.length).toBe(0)
      })

      it('should display shared-with-me-presentations list', async () => {
        const { wrapper } = await setupPage(SHARED_WITH_ME_PRESENTATIONS_URL)
        expect(getMyrfps).toHaveBeenCalled()
        const myPresentationsRows = getSharedPresentationRows(wrapper)
        expect(myPresentationsRows.length).toBe(sharedPresentations.length)
        expect(myPresentationsRows.length).toBeGreaterThan(0)
      })

      it(`should navigate to update presentation page on edit-button click ${department}`, async () => {
        for (const myPresentation of sharedPresentations.slice(0, 1)) {
          const { wrapper, router } = await setupPage(
            SHARED_WITH_ME_PRESENTATIONS_URL,
          )
          const sharedWithMePresentationsTableRow = wrapper.find(
            `[data-test="shared-with-me-presentation-row-${myPresentation.presentationId}"]`,
          )
          const editPresentationButton = sharedWithMePresentationsTableRow.find(
            '[data-test="edit-presentation-button"]',
          )
          await editPresentationButton.trigger('click')
          await flushPromises()

          expect(router.currentRoute.value.path).toContain(
            `${department}/update-presentation/${myPresentation.presentationId}`,
          )
        }
      })
      it(`should open new preview presentation tab on preview-button click ${department}`, async () => {
        const { wrapper } = await setupPage(SHARED_WITH_ME_PRESENTATIONS_URL)

        for (const myPresentation of sharedPresentations) {
          const sharedWithMePresentationsTableRow = wrapper.find(
            `[data-test="shared-with-me-presentation-row-${myPresentation.presentationId}"]`,
          )
          const previewPresentationButton =
            sharedWithMePresentationsTableRow.find(
              '[data-test="preview-presentation-button"]',
            )

          const targetUrl = `/${department}/slide/${myPresentation.presentationId}`
          expect(previewPresentationButton.attributes().href).toBe(targetUrl)
        }
      })
    })
  })
}
