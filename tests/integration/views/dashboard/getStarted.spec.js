/*eslint-env node, jest, amd*/
import { DEFAULT_DEPARTMENT } from '@/utils/constants.js'
import { flushPromises } from '@vue/test-utils'
import { setupPage } from './../setupViews.js'
jest.mock('@/api/user.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/rfps.api')
jest.mock('@/api/templates.api')
jest.mock('@/api/link.api')
jest.mock('@/api/pingIdAuth.js')

const DASHBOARD_URL = `/${DEFAULT_DEPARTMENT}/dashboard`

describe('Dashboard page - Get Started', () => {
  /**
   * @type {import('@vue/test-utils').VueWrapper}
   * */
  let wrapper

  beforeAll(async () => {
    const setup = await setupPage(DASHBOARD_URL)
    wrapper = setup.wrapper
  })

  describe('Get Started component display', () => {
    it('should display correct get-started title', () => {
      const getStartedPageTitle = wrapper.find(
        '[data-test="get-started-title"]',
      )
      expect(getStartedPageTitle.text()).toBe(
        'Start planning your next perfect presentation',
      )
    })

    it('should display correct application description', () => {
      const getStartedPageDescription = wrapper.find(
        '[data-test="get-started-description"]',
      )
      expect(getStartedPageDescription.text()).toBe(
        'This Gladiator Journey is designed to guide you through pricing and contracting for a well executed proposal.',
      )
    })
  })

  describe('Get Started component functionality', () => {
    it('should navigate to new presentation page on get-started-button click', async () => {
      const { wrapper, router } = await setupPage(DASHBOARD_URL)
      const getStartedButton = wrapper.find('[data-test="get-started-button"]')
      expect(getStartedButton.exists()).toBe(true)
      expect(getStartedButton.text()).toBe('Get Started')
      await getStartedButton.trigger('click')
      await flushPromises()
      const getStartedPageRoute = `/${DEFAULT_DEPARTMENT}/new-presentation`
      expect(router.currentRoute.value.path).toContain(getStartedPageRoute)
    })

    it('should navigate to support page on need-help-button click', async () => {
      const { wrapper, router } = await setupPage(DASHBOARD_URL)
      const needHelpButton = wrapper.find('[data-test="need-help-button"]')
      expect(needHelpButton.exists()).toBe(true)
      expect(needHelpButton.text()).toBe('Need Help')
      await needHelpButton.trigger('click')
      await flushPromises()
      const supportPageRoute = `/support`
      expect(router.currentRoute.value.path).toContain(supportPageRoute)
    })
  })
})
