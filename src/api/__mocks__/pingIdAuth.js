/*eslint-env node, jest, amd*/
import {
  getAuthenticationResult,
  getPingIdUserDetail,
} from '../../../tests/__data__/auth/authData.js'

const getUserInfo = jest.fn(() =>
  Promise.resolve({
    userInfo: getPingIdUserDetail(),
    userDetail: getPingIdUserDetail(),
  }),
)

const authenticatedUserLocalStorage = jest.fn(() => getPingIdUserDetail())
const currentAuthenticatedUser = jest.fn(() =>
  Promise.resolve(getPingIdUserDetail()),
)

const signin = jest.fn(() => Promise.resolve(getAuthenticationResult()))

const signout = jest.fn(() => Promise.resolve())
const recieveCallback = jest.fn(() => Promise.resolve())
const getOrRefreshAccessToken = jest.fn(() => Promise.resolve(''))
const redirect = jest.fn(() => Promise.resolve())

const setAuthorizationNotifier = jest.fn()
const FakeAuthorizationNotifier = jest.fn(() => ({
  setAuthorizationNotifier: setAuthorizationNotifier,
}))

const authorizationNotifier = FakeAuthorizationNotifier

const completeAuthorizationRequestIfPossible = jest.fn()
const RedirectRequestHandler = jest.fn(() => ({
  completeAuthorizationRequestIfPossible:
    completeAuthorizationRequestIfPossible,
}))

const authorizationHandler = RedirectRequestHandler

export {
  getUserInfo,
  currentAuthenticatedUser,
  authenticatedUserLocalStorage,
  signin,
  signout,
  recieveCallback,
  getOrRefreshAccessToken,
  redirect,
  authorizationNotifier,
  authorizationHandler,
}
