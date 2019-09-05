import getNotificationByUserJson from './getNotificationByUser.json'
const getNotificationByUserData = () =>
  JSON.parse(JSON.stringify(getNotificationByUserJson))
export { getNotificationByUserData }
