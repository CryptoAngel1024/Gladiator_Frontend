/*eslint-env node, jest, amd*/
import { setupPage } from './setupViews.js'
import resourcesData from '@/data/resources.json'
jest.mock('@/api/user.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/pingIdAuth.js')

function getAllResources(store) {
  const response = store.getters['resources/allResources']
  return response
}

for (const department of ['ASC', 'TRAUMA']) {
  describe(`Resources page for: ${department}`, () => {
    /**
     * @type {import('@vue/test-utils').VueWrapper}
     * */
    let wrapper
    /**
     * @type {import('@/store/index.js').default}
     * */
    let store

    beforeAll(async () => {
      const setup = await setupPage(`/${department}/resources`)
      wrapper = setup.wrapper
      store = setup.store
    })

    describe(`Resources page display ${department}`, () => {
      it('should show correct title', async () => {
        const pageWrapperHeader = wrapper.find(
          '[data-test="page-wrapper-header"]',
        )
        expect(pageWrapperHeader.exists()).toBe(true)
        expect(pageWrapperHeader.text()).toBe('Resources')
      })

      it('should display correct headerBreadCrumps', () => {
        const breadCrumpsPageName = wrapper.find(
          '[data-test="header-bread-crumps-page-name"]',
        )
        expect(breadCrumpsPageName.exists()).toBe(true)
        expect(breadCrumpsPageName.text()).toBe('Resources')
      })

      it('displays table headers', () => {
        const expectedTableHeaders = ['', 'RESOURCE NAME', 'TAGS', '']

        const resources = wrapper.find('[data-test="resources-header"]')
        const tableHeaders = resources.findAll('th')

        expect(tableHeaders.length).toBe(expectedTableHeaders.length)

        tableHeaders.forEach((tableHeader, index) =>
          expect(tableHeader.text()).toMatch(expectedTableHeaders[index]),
        )
      })

      it('displays table rows', () => {
        const expectedTableRows = [].concat(
          ...resourcesData.map((folder) =>
            folder.data.map((resource) => ({
              ...resource,
              folderID: folder.folderID,
            })),
          ),
        )

        const resources = wrapper.find('[data-test="resources-body"]')
        const tableRows = resources.findAll('tr')

        expect(tableRows.length).toBe(expectedTableRows.length)
        expect(tableRows.length).toBeGreaterThan(2) // we expect at least 2 resources

        tableRows.forEach((tableRow, index) => {
          expect(tableRow.text()).toContain(
            expectedTableRows[index].filename || '',
          )
          expect(tableRow.text()).toContain(
            expectedTableRows[index].snippet || '',
          )
          expectedTableRows[index].tags?.forEach((tag) =>
            expect(tableRow.text()).toContain(tag),
          )
          expect(tableRow.text()).toContain(
            expectedTableRows[index].url ? 'Download' : 'View',
          )
        })
      })
    })

    describe(`Resources page functionality ${department}`, () => {
      it('should search keyword', async () => {
        const SEARCH_TERM = 'trauma'
        const resourcesHeader = wrapper.find('[data-test="resources-header"]')
        const searchInput = resourcesHeader.find('input')
        await searchInput.setValue(SEARCH_TERM)

        const searchResources = (resource) => {
          const lowerSearchTerm = SEARCH_TERM.toLowerCase()
          return (
            resource.filename?.toLowerCase().includes(lowerSearchTerm) ||
            resource.snippet?.toLowerCase().includes(lowerSearchTerm) ||
            resource.tags?.filter((tag) =>
              tag.toLowerCase().includes(lowerSearchTerm),
            ).length ||
            resource.externalUrl?.toLowerCase().includes(lowerSearchTerm)
          )
        }

        const searchResult = resourcesData[0].data.filter(searchResources)

        const resources = wrapper.find('[data-test="resources-body"]')
        const tableRows = resources.findAll('tr')

        expect(tableRows.length).toBe(searchResult.length)
        expect(tableRows.length).toBeGreaterThan(2) // we expect at least 2 resources

        tableRows.forEach((tableRow) => {
          expect(tableRow.text().toLowerCase()).toContain(
            SEARCH_TERM.toLowerCase(),
          )
        })
      })

      it('should update state when favorite button clicked', async () => {
        const resourceId = getAllResources(store)[2].id

        const resourceRow = wrapper.find(
          `[data-test="resource-row-${resourceId}"]`,
        )
        const starButton = resourceRow.find('[data-test="favorite-button"]')

        const isFavorite = () => getAllResources(store)[2].favorite

        expect(isFavorite()).toBe(false)
        await starButton.trigger('click')
        expect(isFavorite()).toBe(true)
      })

      it('view button has correct url', async () => {
        const resourceState = getAllResources(store)[2]
        const resourceId = resourceState.id

        const resourceRow = wrapper.find(
          `[data-test="resource-row-${resourceId}"]`,
        )
        const anchore = resourceRow.find('a')

        expect(anchore.attributes().href).toBe(
          resourceState.url || resourceState.externalUrl,
        )
      })
    })
  })
}
