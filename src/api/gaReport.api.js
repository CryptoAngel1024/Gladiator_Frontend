import { get, GA_API_NAME } from './httpClient.js'

const path = '/report'

const getReport = (payload) => get(path, payload, GA_API_NAME)

export { getReport }
