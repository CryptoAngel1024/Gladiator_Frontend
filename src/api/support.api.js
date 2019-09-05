import { post } from './httpClient.js'

const path = '/support'

const contactSupport = (payload) => post(path, payload)

export { contactSupport }
