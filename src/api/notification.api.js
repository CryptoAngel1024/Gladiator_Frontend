import { get, put } from './httpClient.js'

const path = '/notification'

const getNotificationByUser = () => get(`${path}/user`)

const markAsViewed = (notificationIds) =>
  put(`${path}/mark-viewed`, { notificationIds })

export { getNotificationByUser, markAsViewed }
