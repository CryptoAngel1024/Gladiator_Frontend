import {
  AuthorizationServiceConfiguration,
  AuthorizationRequest,
  AuthorizationNotifier,
  RedirectRequestHandler,
  FetchRequestor,
  LocalStorageBackend,
  TokenRequest,
  BaseTokenRequestHandler,
  GRANT_TYPE_REFRESH_TOKEN,
  GRANT_TYPE_AUTHORIZATION_CODE,
  DefaultCrypto,
} from '@openid/appauth'

import { NoHashQueryStringUtils } from './noHashQueryStringUtils'
import environment from '../environments/environment'
import { get } from './httpClient'
import { createUser, getUserByEmail } from './user.api'
import { DEFAULT_DEPARTMENT } from '@/utils/constants.js'

const LS_ACCESS_TOKEN = 'access_token'
const LS_REFRESH_TOKEN = 'refresh_token'
const LS_USER_INFO = 'authorization.service.user_info'

const tokenHandler = new BaseTokenRequestHandler(new FetchRequestor())

const authorizationNotifier = new AuthorizationNotifier()

const authorizationHandler = new RedirectRequestHandler(
  new LocalStorageBackend(),
  new NoHashQueryStringUtils(),
  window.location,
  new DefaultCrypto(),
)

const configuration = new AuthorizationServiceConfiguration({
  authorization_endpoint: environment.authorization_endpoint,
  token_endpoint: environment.token_endpoint,
  revocation_endpoint: environment.revocation_endpoint,
  userinfo_endpoint: environment.userinfo_endpoint,
})

async function redirect() {
  const scope = environment.scope || 'openid'

  // create a request
  const request = new AuthorizationRequest({
    client_id: environment.client_id,
    redirect_uri: environment.redirect_uri,
    scope: scope,
    response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
    extras: environment.extras,
  })

  authorizationHandler.performAuthorizationRequest(configuration, request)
}

async function getOrRefreshAccessToken() {
  const accessToken = localStorage.getItem(LS_ACCESS_TOKEN)

  return accessToken
}

async function getUserInfo(department) {
  let userInfo = await JSON.parse(localStorage.getItem(LS_USER_INFO))

  if (!userInfo) {
    try {
      userInfo = await get('', {}, environment.userinfo_endpoint_name, 1)

      if (userInfo) {
        await localStorage.setItem(LS_USER_INFO, JSON.stringify(userInfo))
      }
    } catch (error) {
      if (error?.status !== 401) {
        console.error('getUserInfo: ', error)
        await performWithFreshTokens()
      }

      await signout()
      return { error }
    }
  }

  let userDetail = await getOrCreateUser(userInfo, department)

  return { userInfo, userDetail }
}

async function recieveCallback(request, response, router) {
  try {
    const additionalExtras = {}
    if (request?.internal) {
      additionalExtras.code_verifier = request.internal.code_verifier
    }

    const userInfo = await performTokenRequestAndGetUserInfo(
      GRANT_TYPE_AUTHORIZATION_CODE,
      response.code,
      additionalExtras,
    )

    // fetch user to redirect them to their department
    let department
    try {
      const userDetail = await getUserByEmail(userInfo?.email)
      department = userDetail.department
    } catch (err) {
      console.warn('get user: ', err)
    }

    const { returnUrl } = router.currentRoute.value.query

    await router.push(
      returnUrl || {
        name: !department ? 'selectDepartment' : 'dashboard',
        params: { department },
      },
    )

    return { success: true }
  } catch (err) {
    console.error(err)
    return { err }
  }
}

async function getOrCreateUser(userInfo, department) {
  try {
    const userDetail = await getUserByEmail(userInfo.email)

    return userDetail
  } catch (err) {
    if (err?.status === 400) {
      return await createUser(
        {
          firstName: userInfo.given_name,
          lastName: userInfo.family_name,
          email: userInfo.email,
          emailBody: ' ',
        },
        department?.toUpperCase() || DEFAULT_DEPARTMENT.toUpperCase(),
      )
    }
    return { err }
  }
}

async function performWithFreshTokens() {
  const refreshToken = localStorage.getItem(LS_REFRESH_TOKEN)

  if (refreshToken == null) {
    await signout()
  } else {
    try {
      return await performTokenRequestAndGetUserInfo(
        GRANT_TYPE_REFRESH_TOKEN,
        undefined,
        {},
      )
    } catch (error) {
      console.error('performWithFreshTokens: ', error)
      await signout()
    }
  }
}

async function performTokenRequestAndGetUserInfo(
  grantType,
  responseCode,
  additionalExtras,
) {
  let extras = { ...additionalExtras }
  extras['client_secret'] = environment.client_secret

  const tokenRequest = new TokenRequest({
    client_id: environment.client_id,
    redirect_uri: environment.redirect_uri,
    grant_type: grantType,
    code: responseCode,
    refresh_token: undefined,
    extras,
  })
  const oResponse = await tokenHandler.performTokenRequest(
    configuration,
    tokenRequest,
  )

  await localStorage.setItem(LS_ACCESS_TOKEN, oResponse.accessToken)
  await localStorage.setItem(LS_REFRESH_TOKEN, oResponse.refreshToken)

  const { userInfo } = await getUserInfo()

  return userInfo
}

async function signout() {
  localStorage.clear()
  const router = globalThis.vueRouter
  await router.push({
    name: 'login',
    params: {
      department:
        router.currentRoute.value?.params.department || DEFAULT_DEPARTMENT,
    },
  })
}

function authenticatedUserLocalStorage() {
  return JSON.parse(localStorage.getItem(LS_USER_INFO))
}

async function currentAuthenticatedUser(department, updateIfExists = true) {
  let userInfo = authenticatedUserLocalStorage()

  if (userInfo) {
    try {
      let currentUser = {
        firstName: userInfo.given_name,
        lastName: userInfo.family_name,
        email: userInfo.email,
        emailBody: ' ',
        userType: '',
        userName: userInfo.jnjMSUsername,
      }
      if (updateIfExists) {
        let userDetail = await getOrCreateUser(userInfo, department)

        return {
          ...currentUser,
          department: userDetail?.department || department,
        }
      }
    } catch (err) {
      if (err?.status !== 404) console.error('currentAuthenticatedUser: ', err)
      return { err }
    }
  }
  return null
}

export {
  // auth
  signout,
  currentAuthenticatedUser,
  authenticatedUserLocalStorage,
  recieveCallback,
  getUserInfo,
  getOrRefreshAccessToken,
  performWithFreshTokens,
  redirect,
  authorizationHandler,
  authorizationNotifier,
}
