/*eslint-env node, jest, amd*/
import { setupPage } from './setupViews.js'
import { flushPromises } from '@vue/test-utils'
import { getLinkResponsePerDepartment } from '@tests/__data__/link/linkData.js'
jest.mock('@/api/user.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/rfps.api')
jest.mock('@/api/link.api')
jest.mock('@/api/custom-slide.api.js')
jest.mock('@/api/templates.api')
jest.mock('@/utils/strings')
jest.mock('@/api/pingIdAuth.js')

for (const department of ['TRAUMA']) {
  const { hyperLink, clientName } = getLinkResponsePerDepartment(department)

  const PRESENT_PRESENT_URL = `/${department}/present/${clientName}/${hyperLink}`

  describe(`Link present page: ${department}`, () => {
    /**
     * @type {import('@vue/test-utils').VueWrapper}
     * */
    let wrapper
    /**
     * @type {import('@/store/index.js').default}
     * */
    let store

    beforeAll(async () => {
      jest.setTimeout(15000)
      const setup = await setupPage(PRESENT_PRESENT_URL)
      wrapper = setup.wrapper
      store = setup.store
    })

    describe('Slide Presentation page display', () => {
      it('should display client name', async () => {
        const customer = wrapper.find('[data-test="customer-name"]')
        expect(customer.text()).toBe(clientName)
      })

      it('should check the number of enabled slides', async () => {
        const stepperButtons = wrapper.findAll(
          `[data-test*="slide-component-"]`,
        )

        const enabledSlides = store.getters[
          'rfps/getDisplayedSlidesByPresentationId'
        ]({
          hyperLink,
          clientName,
        })
        expect(stepperButtons.length).toBe(enabledSlides.length)
      })

      it('should check correct home button', async () => {
        const { wrapper } = await setupPage(PRESENT_PRESENT_URL)
        const linkToSlide1 = wrapper.find('[data-test="link-to-slide1"]')
        const targetUrl = `/${department}/present/${clientName}/${hyperLink}#/1`
        await linkToSlide1.trigger('click')
        expect(linkToSlide1.attributes().href).toBe(targetUrl)
      })

      it.skip('should check correct next button and previous button', async () => {
        const { wrapper, router } = await setupPage(PRESENT_PRESENT_URL)
        const DpPresentation = wrapper.find('[data-test="dp-presentation"]')
        const nextLink = DpPresentation.find('[data-test="next-button"]')
        await nextLink.trigger('click')
        await flushPromises()
        const nextUrl = `/${department}/present/${clientName}/${hyperLink}#/2`
        expect(router.currentRoute.value.path).toMatch(nextUrl)
        const previousLink = DpPresentation.find(
          '[data-test="previous-button"]',
        )
        await previousLink.trigger('click')
        await flushPromises()
        const previousUrl = `/${department}/present/${clientName}/${hyperLink}#/1`
        expect(router.currentRoute.value.path).toMatch(previousUrl)
      })

      it('should check correct overview button', async () => {
        const { wrapper, router } = await setupPage(PRESENT_PRESENT_URL)
        const overView = wrapper.find('[data-test="show-overview-button"]')
        await overView.trigger('click')
        await flushPromises()
        const overviewUrl = `/${department}/linkOverview/${clientName}/${hyperLink}/1`
        expect(router.currentRoute.value.path).toMatch(overviewUrl)
      })

      it.skip('should check correct fullScreen button', async () => {
        const { wrapper } = await setupPage(PRESENT_PRESENT_URL)
        const fullScreenButton = wrapper.find(
          '[data-test="show-full-screen-button"]',
        )
        await fullScreenButton.trigger('click')
        await flushPromises()
        expect(wrapper.find('.reveal').style.width).toMatch('90vw')
      })
    })
  })
}
