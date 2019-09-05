/*eslint-env node, jest, amd*/
import { setupPage } from './setupViews.js'
import { DEFAULT_DEPARTMENT } from '@/utils/constants.js'
import { getMyRfp } from '@/api/rfps.api'
import getNotificationByUserData from '../../__data__/notification/getNotificationByUser.json'
import { markAsViewed } from '@/api/notification.api'
import { flushPromises } from '@vue/test-utils'
import { DEPARTMENTS_DATA } from './testUtils.js'

jest.mock('@/api/user.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/rfps.api')
jest.mock('@/api/link.api')
jest.mock('@/api/custom-slide.api.js')
jest.mock('@/api/templates.api')
jest.mock('@/utils/strings')
jest.mock('@/api/pingIdAuth.js')
jest.mock('@/api/s3Files.js')

const department = 'TRAUMA'
const presentationId = DEPARTMENTS_DATA[department].pid

const slideId = 'INTRO1'
const UPDATE_PRESENTATION_URL = `/${DEFAULT_DEPARTMENT}/update-presentation/${presentationId}/1/1`
const CREATE_LINK_URL = `/${DEFAULT_DEPARTMENT}/create-link/${presentationId}`
const SLIDE_BUILDER_URL = `/${DEFAULT_DEPARTMENT}/builder/${presentationId}/${slideId}`
const DASHBOARD_URL = `/${DEFAULT_DEPARTMENT}/dashboard`
const LOGIN_URL = `/${DEFAULT_DEPARTMENT}/login`

const SOULD_DISPLAY_API_ICON = 'should display api icon'
const SOULD_DISPLAY_SEARCH_INPUT_FIELD = 'should display search input field'
const SOULD_DISPLAY_NOTIFICATIONS = 'should display notifications'

const apiIconElement = (wrapper) =>
  wrapper.find('[data-test="topBar-api-icon"]')
const searchElement = (wrapper) =>
  wrapper.find('[data-test="topBar-search-input-field"]')
const notificationButtonElement = (wrapper) =>
  wrapper.find('[data-test="topBar-notification-button"]')

describe('TopBar page', () => {
  /**
   * @type {import('@vue/test-utils').VueWrapper}
   * */
  let wrapper

  beforeAll(async () => {
    const setup = await setupPage(UPDATE_PRESENTATION_URL)
    wrapper = setup.wrapper
  })

  describe('TopBar page on UPDATE_PRESENTATION_URL ', () => {
    it(SOULD_DISPLAY_API_ICON, () => {
      const apiIcon = apiIconElement(wrapper)
      expect(apiIcon.exists()).toBe(true)
      expect(getMyRfp).toHaveBeenCalled()
    })

    it(SOULD_DISPLAY_SEARCH_INPUT_FIELD, async () => {
      const search = searchElement(wrapper)
      expect(search.exists()).toBe(true)
    })

    it(SOULD_DISPLAY_NOTIFICATIONS, async () => {
      const { wrapper } = await setupPage(DASHBOARD_URL)
      const notificationBtn = notificationButtonElement(wrapper)
      expect(notificationBtn.exists()).toBe(true)
      await notificationBtn.trigger('click')
      const notificationText = wrapper.find(
        '[data-test="topBar-notification-text"]',
      )
      expect(notificationText.text()).toBe('Notifications')

      const notificationListTitle = wrapper.find(
        '[data-test="notification-list-title"]',
      )
      expect(notificationListTitle.text()).toBe(
        getNotificationByUserData[0].subject,
      )

      const notificationListDetail = wrapper.find(
        '[data-test="notification-list-detail"]',
      )
      expect(notificationListDetail.text()).toBe(
        getNotificationByUserData[0].body,
      )

      const notificationSubject = getNotificationByUserData[0].subject
      const notificatinListButton = wrapper.find(
        `[data-test*="notification-list-button-${notificationSubject}"]`,
      )
      expect(notificatinListButton.exists()).toBe(true)
    })

    it('should lead to link', async () => {
      const { wrapper, router } = await setupPage(DASHBOARD_URL)
      const notificationButton = notificationButtonElement(wrapper)
      await notificationButton.trigger('click')
      const notificationSubject = getNotificationByUserData[0].subject
      const notificatinListButton = wrapper.find(
        `[data-test*="notification-list-button-${notificationSubject}"]`,
      )
      expect(notificatinListButton.exists()).toBe(true)
      await notificatinListButton.trigger('click')
      const notificationListUrl = `/${DEFAULT_DEPARTMENT}/update-presentation/${getNotificationByUserData[0].id}/1`
      await flushPromises()
      expect(router.currentRoute.value.path).toMatch(notificationListUrl)
    })

    it('should clear all', async () => {
      const { wrapper } = await setupPage(DASHBOARD_URL)
      const notificationButton = notificationButtonElement(wrapper)
      await notificationButton.trigger('click')

      const clearAll = wrapper.find('[data-test="notification-clera-all"]')
      expect(clearAll.exists()).toBe(true)
      expect(clearAll.text()).toBe('Clear all')

      await clearAll.trigger('click')
      expect(markAsViewed).toBeCalled()
    })

    it('logout dropdown button should work', async () => {
      const { wrapper, router } = await setupPage(DASHBOARD_URL)
      const { location } = window
      delete window.location
      window.location = { reload: jest.fn() }

      const menu = wrapper.find('[data-test="logout-dropdown-button"]')
      expect(menu.exists()).toBe(true)
      await menu.trigger('click')

      const profile = wrapper.find('[data-test="topbar-profile"]')
      expect(profile.text()).toBe('Profile')
      expect(profile.isVisible()).toBe(true)

      const logout = wrapper.find('[data-test="topbar-logout"]')
      expect(logout.text()).toBe('Log out')
      expect(logout.isVisible()).toBe(true)
      await logout.trigger('click')

      await flushPromises()
      expect(router.currentRoute.value.path).toMatch(LOGIN_URL)
      window.location = location
    })
  })

  describe('TopBar page on SLIDE_BUILDER_URL ', () => {
    /**
     * @type {import('@vue/test-utils').VueWrapper}
     * */
    let builderPageWrapper

    beforeAll(async () => {
      const setup = await setupPage(SLIDE_BUILDER_URL)
      builderPageWrapper = setup.wrapper
    })

    it(SOULD_DISPLAY_API_ICON, async () => {
      const apiIcon = apiIconElement(builderPageWrapper)
      expect(apiIcon.exists()).toBe(true)
    })

    it(SOULD_DISPLAY_SEARCH_INPUT_FIELD, async () => {
      const search = searchElement(builderPageWrapper)
      expect(search.exists()).toBe(true)
    })

    it('topBar should display resource, export and present button on create link url', async () => {
      const resourceButton = builderPageWrapper.find(
        '[data-test="topBar-resource-button"]',
      )
      const exportButton = builderPageWrapper.find(
        '[data-test="topBar-export-button"]',
      )
      const presentButton = builderPageWrapper.find(
        '[data-test="topBar-present-button"]',
      )
      expect(resourceButton.isVisible()).toBe(true)
      expect(exportButton.isVisible()).toBe(true)
      expect(presentButton.isVisible()).toBe(true)
    })
  })

  describe('TopBar page on CREATE_LINK_URL ', () => {
    /**
     * @type {import('@vue/test-utils').VueWrapper}
     * */
    let createLinkPageWrapper

    beforeAll(async () => {
      const setup = await setupPage(CREATE_LINK_URL)
      createLinkPageWrapper = setup.wrapper
    })

    it(SOULD_DISPLAY_API_ICON, async () => {
      const apiIcon = apiIconElement(createLinkPageWrapper)
      expect(apiIcon.exists()).toBe(true)
    })

    it(SOULD_DISPLAY_SEARCH_INPUT_FIELD, async () => {
      const search = searchElement(createLinkPageWrapper)
      expect(search.exists()).toBe(true)
    })

    it('topBar should display resource, export and present button on create link url', async () => {
      const resourceButton = createLinkPageWrapper.find(
        '[data-test="topBar-resource-button"]',
      )
      const exportButton = createLinkPageWrapper.find(
        '[data-test="topBar-export-button"]',
      )
      const presentButton = createLinkPageWrapper.find(
        '[data-test="topBar-present-button"]',
      )
      expect(resourceButton.isVisible()).toBe(true)
      expect(exportButton.isVisible()).toBe(true)
      expect(presentButton.isVisible()).toBe(true)
    })
  })
})
