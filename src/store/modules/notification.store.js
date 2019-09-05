import { getNotificationByUser, markAsViewed } from '@/api/notification.api'
import { gaEvent } from '@/utils/GA_Event.js'

export default {
  state: () => ({
    notifications: [],
  }),

  getters: {
    notifications(state) {
      return state.notifications
    },
    notificationLength(state) {
      return state.notifications.filter(({ isViewed }) => !isViewed).length
    },
  },

  mutations: {
    setNotifications(state, payload) {
      state.notifications = payload
    },
    markAsViewed(state, notfication_Id) {
      const notification = state.notifications.find(
        (notif) => notif.id === notfication_Id,
      )
      notification.isViewed = true
    },
  },

  actions: {
    async fetchNotifications({ commit }) {
      gaEvent({
        action: 'fetch-nofitications',
        event_category: 'notifications',
        event_label: 'User-fetch-notification',
      })
      try {
        const notifications = await getNotificationByUser()

        const respose_notifications = notifications
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
                      department: notification.department?.toLowerCase(),
                    },
                  }
                : ``,
            userId: notification.userAwsId,
          }))
          .sort((notif1, notif2) => notif2.time - notif1.time)

        commit('setNotifications', respose_notifications)
      } catch (err) {
        console.error('Failed to fetch Notifications', err)
      }
    },

    async clearAll({ dispatch, getters }) {
      gaEvent({
        action: 'clear-all',
        event_category: 'notification',
        event_label: 'User-clear-all-notification',
      })
      await dispatch(
        'markAsViewed',
        getters.notifications.map(({ id }) => id),
      )
    },

    async markAsViewed({ commit, dispatch }, notificationIds) {
      gaEvent({
        action: 'mark-as-viewed',
        event_category: 'notification',
        event_label: 'User-marked-notifications-as-viewed',
      })
      notificationIds.forEach((notificationId) =>
        commit('markAsViewed', notificationId),
      )

      try {
        await markAsViewed(notificationIds)
        dispatch('fetchNotifications')
      } catch (err) {
        console.error('Failed to mark Notifications', err)
      }
    },
  },
}
