/*eslint-env node, jest, amd*/
import { DEFAULT_DEPARTMENT } from '@/utils/constants.js'
import { flushPromises } from '@vue/test-utils'
import { setupPage } from './../setupViews.js'
import { getPublishedLinks, generatePdf } from '@/api/link.api'
import samplePublishedLinks from '../../../__data__/rfps/samplePublishedLinks.json'
import { formatDate } from '@/utils/formatDate'
import { copyHtmlString } from '@/utils/strings.js'
jest.mock('@/utils/strings')
jest.mock('@/api/user.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/rfps.api')
jest.mock('@/api/templates.api')
jest.mock('@/api/link.api')
jest.mock('@/api/pingIdAuth.js')
jest.mock('@/api/s3Files.js')

const DASHBOARD_URL = `/${DEFAULT_DEPARTMENT}/dashboard`
const groupedSampleLinks = samplePublishedLinks.reduce((groupedLinks, link) => {
  groupedLinks[link.presentationId] = [
    ...(groupedLinks[link.presentationId] || []),
    link,
  ]
  return groupedLinks
}, {})

describe('Dashboard page - published links', () => {
  /**
   * @type {import('@vue/test-utils').VueWrapper}
   * */
  let wrapper

  beforeAll(async () => {
    const setup = await setupPage(DASHBOARD_URL)
    wrapper = setup.wrapper
  })

  describe('Published links component display', () => {
    it('should display correct component title', () => {
      const publishedLinksTitle = wrapper.find(
        '[data-test="published-links-title"]',
      )
      expect(publishedLinksTitle.text()).toBe('Published Links')
    })
  })

  describe('Published link component functionality', () => {
    it('should display empty list of published links', async () => {
      getPublishedLinks.mockImplementationOnce(() => Promise.resolve([]))
      const { wrapper } = await setupPage(DASHBOARD_URL)
      expect(getPublishedLinks).toHaveBeenCalled()
      const publishedLinks = wrapper.findAll(
        '[data-test*="show-link-detail-button-"]',
      )
      expect(publishedLinks.length).toBe(0)
    })

    it('should display list of published links', async () => {
      const { wrapper } = await setupPage(DASHBOARD_URL)
      expect(getPublishedLinks).toHaveBeenCalled()
      const publishedLinks = wrapper.findAll(
        '[data-test*="show-link-detail-button-"]',
      )
      expect(publishedLinks.length).toBe(samplePublishedLinks.length)
    })

    it('should display link details on show-link-detail-button click', async () => {
      const { wrapper } = await setupPage(DASHBOARD_URL)
      for (const sampleLink of samplePublishedLinks) {
        const showLinkDetailButton = wrapper.find(
          `[data-test="show-link-detail-button-${sampleLink.presentationId}"]`,
        )
        expect(showLinkDetailButton.exists()).toBe(true)
        const publishedLinkDetail = () =>
          wrapper.find(
            `[data-test="published-link-detail-${sampleLink.presentationId}"]`,
          )
        expect(publishedLinkDetail().exists()).toBe(false)
        await showLinkDetailButton.trigger('click')
        expect(publishedLinkDetail().exists()).toBe(true)
      }
    })

    it('should display correct clientName, linkDate, linkCount, linkViewCount', async () => {
      expect.hasAssertions()
      for (const presentationId in groupedSampleLinks) {
        const sampleLinks = groupedSampleLinks[presentationId]
        const presentationLinksViewCount = sampleLinks.reduce(
          (linkViewCount, link) => linkViewCount + link.viewCount,
          0,
        )
        const publishedLinkItem = wrapper.find(
          `[data-test="show-link-detail-button-${presentationId}"]`,
        )

        for (const sampleLink of sampleLinks) {
          const linkClientName = publishedLinkItem.find(
            '[data-test="link-client-name"]',
          )

          expect(linkClientName.exists()).toBe(true)
          expect(linkClientName.text()).toBe(sampleLink.clientName)

          const linkDate = publishedLinkItem.find('[data-test="link-date"]')
          expect(linkDate.exists()).toBe(true)
          expect(linkDate.text()).toBe(formatDate(sampleLink.updatedDate))

          const linkCount = publishedLinkItem.find('[data-test="link-count"]')
          expect(linkCount.exists()).toBe(true)

          // test presentation publication count
          expect(linkCount.text()).toBe(String(sampleLinks.length))
          const linkViewCount = publishedLinkItem.find(
            '[data-test="link-view-count"]',
          )
          expect(linkViewCount.exists()).toBe(true)
          expect(linkViewCount.text()).toBe(String(presentationLinksViewCount))
        }
      }
    })

    it('should display correct number of published link detail', async () => {
      const { wrapper } = await setupPage(DASHBOARD_URL)
      for (const presentationId in groupedSampleLinks) {
        const showLinkDetailButton = wrapper.find(
          `[data-test="show-link-detail-button-${presentationId}"]`,
        )
        await showLinkDetailButton.trigger('click')
        const publishedLinkDetailList = () =>
          wrapper.findAll(
            `[data-test="published-link-detail-${presentationId}"]`,
          )

        expect(publishedLinkDetailList().length).toBe(
          groupedSampleLinks[presentationId].length,
        )
      }
    })
  })

  describe('Link detail item functionality', () => {
    it('should navigate to update link page on update-link-button click', async () => {
      for (const presentationId in groupedSampleLinks) {
        const { wrapper, router } = await setupPage(DASHBOARD_URL)
        const showLinkDetailButton = wrapper.find(
          `[data-test="show-link-detail-button-${presentationId}"]`,
        )
        await showLinkDetailButton.trigger('click')
        const publishedLinkItem = wrapper.find(
          `[data-test="published-link-detail-${presentationId}"]`,
        )
        for (const sampleLink of groupedSampleLinks[presentationId]) {
          const linkDetailItem = publishedLinkItem.find(
            `[data-test="link-detail-item-${sampleLink.id}"]`,
          )
          expect(linkDetailItem.exists()).toBe(true)
          const updateLinkButton = linkDetailItem.find(
            '[data-test="update-link-button"]',
          )
          expect(updateLinkButton.exists()).toBe(true)
          await updateLinkButton.trigger('click')
          await flushPromises()
          const updateLinkPageRoute = `/${DEFAULT_DEPARTMENT}/update-link/${sampleLink.presentationId}/${sampleLink.id}`
          expect(router.currentRoute.value.path).toBe(updateLinkPageRoute)
        }
      }
    })

    it('should copy email body on copy-email-button click', async () => {
      for (const presentationId in groupedSampleLinks) {
        const { wrapper } = await setupPage(DASHBOARD_URL)
        const showLinkDetailButton = wrapper.find(
          `[data-test="show-link-detail-button-${presentationId}"]`,
        )
        await showLinkDetailButton.trigger('click')
        const publishedLinkItem = wrapper.find(
          `[data-test="published-link-detail-${presentationId}"]`,
        )
        for (const sampleLink of groupedSampleLinks[presentationId]) {
          const linkDetailItem = publishedLinkItem.find(
            `[data-test="link-detail-item-${sampleLink.id}"]`,
          )
          expect(linkDetailItem.exists()).toBe(true)
          const copyEmailButton = linkDetailItem.find(
            '[data-test="copy-email-button"]',
          )
          expect(copyEmailButton.text()).toBe('Copy Email')
          await copyEmailButton.trigger('click')
          expect(copyHtmlString).toHaveBeenCalled()
        }
      }
    })

    it('should open new present-pdf tab on present-pdf-button click', async () => {
      for (const presentationId in groupedSampleLinks) {
        const { wrapper } = await setupPage(DASHBOARD_URL)
        const showLinkDetailButton = wrapper.find(
          `[data-test="show-link-detail-button-${presentationId}"]`,
        )
        await showLinkDetailButton.trigger('click')
        const publishedLinkItem = wrapper.find(
          `[data-test="published-link-detail-${presentationId}"]`,
        )
        for (const sampleLink of groupedSampleLinks[presentationId]) {
          const linkDetailItem = publishedLinkItem.find(
            `[data-test="link-detail-item-${sampleLink.id}"]`,
          )
          expect(linkDetailItem.exists()).toBe(true)
          const presentPdfButton = linkDetailItem.find(
            '[data-test="present-pdf-button"]',
          )
          await presentPdfButton.trigger('click')
          expect(generatePdf).toHaveBeenCalledWith(
            expect.objectContaining({
              presentationId: sampleLink.presentationId,
              hyperLink: sampleLink.hyperLink,
              pdfType: 'LINK',
            }),
          )
        }
      }
    })
  })
})
