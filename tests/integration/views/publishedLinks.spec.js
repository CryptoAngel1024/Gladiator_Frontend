/*eslint-env node, jest, amd*/
import { setupPage } from './setupViews.js'
import {
  getPublishedLinks,
  deletePublishLink,
  generatePdf,
} from '@/api/link.api'
import { getPublishedLinksJson } from '@tests/__data__/rfps/sampleLinks'
import { copyHtmlString } from '@/utils/strings.js'

jest.mock('@/utils/strings')
jest.mock('@/api/link.api')
jest.mock('@/api/rfps.api')
jest.mock('@/api/user.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/pingIdAuth.js')
jest.mock('@/api/s3Files.js')

const displayMenuButtonElement = (presentationRow) =>
  presentationRow.find('[data-test="display-menu-button"]')

const dataTestPublishedLinkMenu = '[data-test="published-link-menu"]'

for (const department of ['ASC', 'TRAUMA']) {
  const PUBLISHED_LINKS_URL = `/${department}/published`
  describe(`Published Links View Page for : ${department}`, () => {
    /**
     * @type {import('@vue/test-utils').VueWrapper}
     * */
    let wrapper

    beforeAll(async () => {
      const setup = await setupPage(PUBLISHED_LINKS_URL)
      wrapper = setup.wrapper
    })

    describe(`Published links page display ${department}`, () => {
      it('should display correct page title', async () => {
        const pageTitle = wrapper.find('[data-test="page-title"]')
        expect(pageTitle.exists()).toBe(true)
        expect(pageTitle.text()).toBe('Published Links')
      })
      it('should display correct breadcrumb title', () => {
        const breadcrumbTitle = wrapper.find(
          '[data-test="header-bread-crumps-page-name"]',
        )
        expect(breadcrumbTitle.exists()).toBe(true)
        expect(breadcrumbTitle.text()).toBe('Published Links')
      })
      it('should display correct table headers', () => {
        const tableHeaders = [
          '',
          'Link Name',
          'Client Name',
          'Views',
          'Created On',
          '',
          '',
        ]
        const publishedLinksTable = wrapper.find(
          '[data-test="published-links-table"]',
        )
        const publishedLinksTableHeaders = publishedLinksTable.findAll('th')
        expect(publishedLinksTableHeaders.length).toBe(tableHeaders.length)
        publishedLinksTableHeaders.forEach((tableHeader, index) => {
          expect(tableHeader.text()).toBe(tableHeaders[index])
        })
      })
    })

    describe(`Published links page display list & search functionality ${department}`, () => {
      const getPublishedLinkRows = (wrapper) =>
        wrapper
          .find('[data-test="published-links-table"]')
          .findAll('[data-test*="published-link-row-"]')

      it('should display empty list of published links', async () => {
        getPublishedLinks.mockImplementationOnce(() => Promise.resolve([]))
        const { wrapper } = await setupPage(PUBLISHED_LINKS_URL)

        expect(getPublishedLinks).toHaveBeenCalled()
        const publishedLinksTableRows = getPublishedLinkRows(wrapper)
        expect(publishedLinksTableRows.length).toBe(0)
      })
      it('should display list of published links', async () => {
        const { wrapper } = await setupPage(PUBLISHED_LINKS_URL)
        expect(getPublishedLinks).toHaveBeenCalled()
        const publishedLinksTableRows = getPublishedLinkRows(wrapper)
        expect(publishedLinksTableRows.length).toBe(
          getPublishedLinksJson().length,
        )
      })
      it('should search published links with user input', async () => {
        const { wrapper } = await setupPage(PUBLISHED_LINKS_URL)
        const searchPublishedLinksInput = wrapper.find(
          '[data-test="search-published-link-input"]',
        )
        const mockSearchInput = ''
        await searchPublishedLinksInput.setValue(mockSearchInput)

        const searchPresentations = (publishedLink) => {
          const searchTerm = mockSearchInput.toLowerCase()
          return (
            publishedLink?.linkName?.toLowerCase().includes(searchTerm) ||
            publishedLink?.clientName?.toLowerCase().includes(searchTerm)
          )
        }
        const searchResults =
          getPublishedLinksJson().filter(searchPresentations)
        const publishedLinkRows = getPublishedLinkRows(wrapper)
        expect(publishedLinkRows.length).toBe(searchResults.length)
        expect(publishedLinkRows.length).toBeGreaterThan(0)

        publishedLinkRows.forEach((publishedLinkRow) => {
          expect(publishedLinkRow.text().toLowerCase()).toContain(
            mockSearchInput.toLowerCase(),
          )
        })
      })
      it('should open new  preview published link tab on preview-button click', async () => {
        for (const publishedLink of getPublishedLinksJson()) {
          const { wrapper } = await setupPage(PUBLISHED_LINKS_URL)
          const sharedPresentationRow = wrapper.find(
            `[data-test*="published-link-row-${publishedLink.id}"]`,
          )
          const presentationPreviewButton = sharedPresentationRow.find(
            '[data-test="preview-published-link-button"]',
          )
          expect(presentationPreviewButton.exists()).toBe(true)
          expect(presentationPreviewButton.text()).toBe('Preview')

          const targetUrl = `/${department}/present/${publishedLink.clientName}/${publishedLink.hyperLink}`
          expect(presentationPreviewButton.attributes().href).toBe(targetUrl)
        }
      })
      it('should display published link menus on display-menu-button-click', async () => {
        const { wrapper } = await setupPage(PUBLISHED_LINKS_URL)
        const publishedLinksTableRows = getPublishedLinkRows(wrapper)
        for (const publishedLinkRow of publishedLinksTableRows) {
          const displayMenuButton = displayMenuButtonElement(publishedLinkRow)

          expect(displayMenuButton.exists()).toBe(true)
          const publishedLinkMenu = () =>
            publishedLinkRow.find(dataTestPublishedLinkMenu)
          expect(publishedLinkMenu().exists()).toBe(false)
          await displayMenuButton.trigger('click')
          expect(publishedLinkMenu().exists()).toBe(true)
        }
      })
    })

    describe(`Published links page functionality ${department}`, () => {
      const getPublishedLinkRowByIndex = (wrapper, publishedLink) =>
        wrapper.find(`[data-test*="published-link-row-${publishedLink.id}"]`)

      it('should generate pdf on generate-pdf-button click', async () => {
        for (const publishedLink of getPublishedLinksJson(department).slice(
          0,
          2,
        )) {
          const { wrapper } = await setupPage(PUBLISHED_LINKS_URL)
          const linkRow = getPublishedLinkRowByIndex(wrapper, publishedLink)

          const generatePdfButton = linkRow.find(
            '[data-test="generate-pdf-button"]',
          )
          expect(generatePdfButton.exists()).toBe(true)
          expect(generatePdfButton.text()).toBe('Export PDF' || 'Exporting ...')
          await generatePdfButton.trigger('click')

          expect(generatePdf).toHaveBeenCalledWith(
            expect.objectContaining({
              presentationId: publishedLink.presentationId,
              hyperLink: publishedLink.hyperLink,
              pdfType: 'LINK',
            }),
          )
        }
      })

      it('should copy email to clipboard on copy-email-button click', async () => {
        for (const sharedPresentation of getPublishedLinksJson()) {
          const { wrapper } = await setupPage(PUBLISHED_LINKS_URL)
          const sharedPresentationRow = getPublishedLinkRowByIndex(
            wrapper,
            sharedPresentation,
          )
          const displayMenuButton = displayMenuButtonElement(
            sharedPresentationRow,
          )
          expect(displayMenuButton.exists()).toBe(true)
          const publishedLinkMenu = () =>
            sharedPresentationRow.find(dataTestPublishedLinkMenu)

          expect(publishedLinkMenu().exists()).toBe(false)
          await displayMenuButton.trigger('click')
          expect(publishedLinkMenu().exists()).toBe(true)

          const copyEmailButton = publishedLinkMenu().find(
            '[data-test="copy-email-button"]',
          )
          expect(copyEmailButton.exists()).toBe(true)
          expect(copyEmailButton.text()).toBe('Copy Email')
          await copyEmailButton.trigger('click')

          expect(copyHtmlString).toHaveBeenCalled()
        }
      })
      it('should open new update or view link tab on update-link-button-click', async () => {
        for (const publishedLink of getPublishedLinksJson()) {
          const { wrapper } = await setupPage(PUBLISHED_LINKS_URL)
          const sharedPresentationRow = getPublishedLinkRowByIndex(
            wrapper,
            publishedLink,
          )
          const displayMenuButton = displayMenuButtonElement(
            sharedPresentationRow,
          )
          expect(displayMenuButton.exists()).toBe(true)
          const publishedLinkMenu = () =>
            sharedPresentationRow.find(dataTestPublishedLinkMenu)

          expect(publishedLinkMenu().exists()).toBe(false)
          await displayMenuButton.trigger('click')
          expect(publishedLinkMenu().exists()).toBe(true)

          const updateLinkButton = publishedLinkMenu().find(
            '[data-test="update-published-link-button"]',
          )
          expect(updateLinkButton.exists()).toBe(true)
          expect(updateLinkButton.text()).toBe('Edit' || 'View')

          const targetUrl = `/${department}/update-link/${publishedLink.presentationId}/${publishedLink.id}`
          expect(updateLinkButton.attributes().href).toBe(targetUrl)
        }
      })
      it('should remove published link on delete-published-link-button', async () => {
        const { wrapper, store } = await setupPage(PUBLISHED_LINKS_URL)
        for (const samplePublishedLink of getPublishedLinksJson()) {
          const sharedPresentationRow = getPublishedLinkRowByIndex(
            wrapper,
            samplePublishedLink,
          )
          const displayMenuButton = displayMenuButtonElement(
            sharedPresentationRow,
          )
          expect(displayMenuButton.exists()).toBe(true)
          const publishedLinkMenu = () =>
            sharedPresentationRow.find(dataTestPublishedLinkMenu)
          expect(publishedLinkMenu().exists()).toBe(false)
          await displayMenuButton.trigger('click')
          expect(publishedLinkMenu().exists()).toBe(true)
          const deleteLinkButton = publishedLinkMenu().find(
            '[data-test="delete-published-link-button"]',
          )
          expect(deleteLinkButton.exists()).toBe(true)
          expect(deleteLinkButton.text()).toBe('Delete')

          let publishedLinksListFromStore =
            store.getters['rfps/getPublishedLinks']

          expect(
            publishedLinksListFromStore.some(
              (link) => link.id == samplePublishedLink.id,
            ),
          ).toBe(true)
          await deleteLinkButton.trigger('click')
          expect(deletePublishLink).toHaveBeenLastCalledWith(
            samplePublishedLink.id,
          )
          publishedLinksListFromStore = store.getters['rfps/getPublishedLinks']
          expect(
            publishedLinksListFromStore.some(
              (link) => link.id == samplePublishedLink.id,
            ),
          ).toBe(false)
        }
      })
    })
  })
}
