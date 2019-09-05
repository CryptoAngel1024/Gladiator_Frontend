/*eslint-env node, jest, amd*/
import { getNewStore } from './setupStore.js'

import { getNotificationByUser, markAsViewed } from '@/api/notification.api'
import { getNotificationByUserData } from '../../__data__/notification/getNotificationData'

jest.mock('@/api/notification.api')
jest.mock('@/api/user.api')
jest.mock('@/api/pingIdAuth')

function getNotifications(store) {
  const notifs = store.getters['notification/notifications']
  return notifs
}

function getNotificationLength(store) {
  const notificationLength = store.getters['notification/notificationLength']
  return notificationLength
}

async function dispatchFetchNotifications(store) {
  const notifs = await store.dispatch('notification/fetchNotifications')
  return notifs
}

for (const dep of ['ASC', 'TRAUMA']) {
  let store = getNewStore()
  describe(`notification store module tests ${dep}`, () => {
    beforeAll(() => {
      store.commit('setting/setCurrentDepartment', dep)
    })
    afterEach(() => {
      store.commit('notification/setNotifications', [])
    })

    it('should get initial notifications values', () => {
      const defaultStatus = getNotifications(store)
      expect(defaultStatus).toEqual([])
    })

    it('should get initial notificationLength values', () => {
      const defaultStatusLength = getNotificationLength(store)
      expect(defaultStatusLength).toEqual(0)
    })

    it('should fetchNotifications', async () => {
      await dispatchFetchNotifications(store)
      expect(getNotificationByUser).toBeCalledWith()
      const notifications = getNotifications(store)
      const expectedNotifications = getNotificationByUserData()
        .map((notification) => ({
          id: notification.notificationId,
          title: notification.subject,
          isViewed: notification.isViewed,
          time: new Date(notification.createdDate),
          detail: notification.body,
          type: notification.notificationType,
          url:
            notification.notificationType === 'RFP'
              ? {
                  name: 'update-presentation',
                  params: {
                    presentationId: notification.id,
                    step: 1,
                    subStep: 1,
                    department: notification.department.toLowerCase(),
                  },
                }
              : ``,
          userId: notification.userAwsId,
        }))
        .sort((notif1, notif2) => notif2.time - notif1.time)

      expect(notifications).toEqual(expectedNotifications)
    })
    it('should clearAll all notifications as viewed', async () => {
      await dispatchFetchNotifications(store)
      const notificationLength = getNotificationLength(store)

      const mockNotification = getNotificationByUserData()
      expect(notificationLength).toEqual(mockNotification.length)

      mockNotification.forEach((n) => {
        n.isViewed = true
      })
      getNotificationByUser.mockImplementationOnce(() =>
        Promise.resolve(mockNotification),
      )
      await store.dispatch('notification/clearAll')

      expect(getNotificationByUser).toBeCalledWith()
      const notificationLengthAfter = getNotificationLength(store)
      expect(notificationLengthAfter).toEqual(0)
    })
    it('should mark notifications As Viewed ', async () => {
      await dispatchFetchNotifications(store)
      const notificationId = '11f526b3-9491-4ef8-942b-2d9798b64ec2'
      const ids = [notificationId]

      const mockNotification = getNotificationByUserData()
      const noti = mockNotification.find(
        (f) => f.notificationId === notificationId,
      )
      noti.isViewed = true
      getNotificationByUser.mockImplementationOnce(() =>
        Promise.resolve(mockNotification),
      )

      const notifications = () => getNotifications(store)
      const notification = () =>
        notifications().find((f) => f.id === notificationId)

      expect(notification().isViewed).toEqual(false)
      await store.dispatch('notification/markAsViewed', ids)
      expect(notification().isViewed).toEqual(true)

      expect(markAsViewed).toBeCalledWith(ids)
      expect(getNotificationByUser).toBeCalledWith()
    })
  })
}
