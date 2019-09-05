import { defaultEmailBody } from '@/data/defaultSetting.js'
import authenticationResult from './authenticationResult.json'
import mockUserDetail from './userDetail.json'
import pingIdUserDetail from './pingIdUserDetail.json'
import pingidFetchFromIssuer from './pingidFetchFromIssuer.json'

function getAuthenticationResult() {
  JSON.parse(JSON.stringify(authenticationResult))
}

const defaultUser = {
  ...mockUserDetail,
  emailBody: defaultEmailBody(mockUserDetail),
}

const defaultPingIdUser = {
  ...pingIdUserDetail,
  emailBody: defaultEmailBody(pingIdUserDetail),
}

const getDefaultUser = (dep) => {
  return { ...defaultUser, department: dep }
}
const getDefaultPingIdUser = (dep) => {
  return { ...defaultPingIdUser, department: dep }
}

const getPingIdUserDetail = () => {
  return {
    firstName: pingIdUserDetail.given_name,
    lastName: pingIdUserDetail.family_name,
    email: pingIdUserDetail.email,
    emailBody: ' ',
    id: pingIdUserDetail.sub,
  }
}
const getPingidFetchFromIssuerResponse = () => {
  return { ...pingidFetchFromIssuer }
}
export {
  getAuthenticationResult,
  getPingIdUserDetail,
  getDefaultPingIdUser,
  getPingidFetchFromIssuerResponse,
  mockUserDetail,
  pingIdUserDetail,
  defaultUser,
  defaultEmailBody,
  getDefaultUser,
}
