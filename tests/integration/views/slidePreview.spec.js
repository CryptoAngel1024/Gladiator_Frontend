/*eslint-env node, jest, amd*/
import { setupPage } from './setupViews.js'
import { DEPARTMENTS_DATA } from './testUtils.js'
import { flushPromises } from '@vue/test-utils'
import { getSampleUpdatePresentation } from '@tests/__data__/rfps/sampleRfps.js'
jest.mock('@/api/user.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/rfps.api')
jest.mock('@/api/link.api')
jest.mock('@/api/custom-slide.api.js')
jest.mock('@/api/templates.api')
jest.mock('@/utils/strings')
jest.mock('@/api/pingIdAuth.js')

for (const department of ['ASC', 'TRAUMA']) {
  const presentationId = DEPARTMENTS_DATA[department].pid
  const presentationToEdit = getSampleUpdatePresentation(
    department,
    presentationId,
  )

  const customerName = presentationToEdit.customerName

  const SLIDE_PRESENT_URL = `/${department}/slide/${presentationId}`

  describe(`Rfp present page: ${department}`, () => {
    /**
     * @type {import('@vue/test-utils').VueWrapper}
     * */
    let wrapper
    /**
     * @type {import('@/store/index.js').default}
     * */
    let store

    beforeAll(async () => {
      const setup = await setupPage(SLIDE_PRESENT_URL)
      wrapper = setup.wrapper
      store = setup.store
    })

    describe('Slide Presentation page display', () => {
      it('should display customer name', async () => {
        const custome = wrapper.find('[data-test="customer-name"]')
        expect(custome.text()).toBe(customerName)
      })

      it('should check the number of enabled slides', async () => {
        const stepperButtons = wrapper.findAll(
          `[data-test*="slide-component-"]`,
        )

        const enabledSlides = store.getters[
          'rfps/getDisplayedSlidesByPresentationId'
        ]({
          presentationId: presentationId,
        })
        expect(stepperButtons.length).toBe(enabledSlides.length)
      })

      it('should check correct home button', async () => {
        const { wrapper } = await setupPage(SLIDE_PRESENT_URL)
        const linkToSlide1 = wrapper.find('[data-test="link-to-slide1"]')
        const targetUrl = `/${department}/slide/${presentationId}#/1`
        await linkToSlide1.trigger('click')
        expect(linkToSlide1.attributes().href).toBe(targetUrl)
      })

      it.skip('should check correct next button and previous button', async () => {
        const { wrapper, router } = await setupPage(SLIDE_PRESENT_URL)
        const DpPresentation = wrapper.find('[data-test="dp-presentation"]')
        const nextLink = DpPresentation.find('[data-test="next-button"]')
        await nextLink.trigger('click')
        await flushPromises()
        const nextUrl = `/${department}/slide/${presentationId}#/2`
        expect(router.currentRoute.value.path).toMatch(nextUrl)
        const previousLink = DpPresentation.find(
          '[data-test="previous-button"]',
        )
        await previousLink.trigger('click')
        await flushPromises()
        const previousUrl = `/${department}/slide/${presentationId}#/1`
        expect(router.currentRoute.value.path).toMatch(previousUrl)
      })

      it('should check correct overview button', async () => {
        const { wrapper, router } = await setupPage(SLIDE_PRESENT_URL)
        const overView = wrapper.find('[data-test="show-overview-button"]')
        await overView.trigger('click')
        await flushPromises()
        const targetUrl = `/${department}/slideOverview/${presentationId}/1`
        expect(router.currentRoute.value.path).toMatch(targetUrl)
      })

      it.skip('should check correct fullScreen button', async () => {
        const { wrapper } = await setupPage(SLIDE_PRESENT_URL)
        const fullScreenButton = wrapper.find(
          '[data-test="show-full-screen-button"]',
        )
        await fullScreenButton.trigger('click')
        await flushPromises()
        expect(document.querySelector('.reveal').style.width).toMatch('90vw')
      })
    })
  })
}
