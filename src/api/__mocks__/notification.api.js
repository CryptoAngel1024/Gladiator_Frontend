/*eslint-env node, jest, amd*/
import { getNotificationByUserData } from '../../../tests/__data__/notification/getNotificationData'

const getNotificationByUser = jest.fn(() =>
  Promise.resolve(getNotificationByUserData()),
)

const markAsViewed = jest.fn(() => Promise.resolve())

export { getNotificationByUser, markAsViewed }
