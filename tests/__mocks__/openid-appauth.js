/*eslint-env node, jest, amd*/
import { getPingidFetchFromIssuerResponse } from '@tests/__data__/auth/authData'

const AuthorizationServiceConfiguration = {}
const AuthorizationRequest = {}
const RedirectRequestHandler = {}
const FetchRequestor = {}
const LocalStorageBackend = {}
const TokenRequest = {}
const BaseTokenRequestHandler = {}
const GRANT_TYPE_REFRESH_TOKEN = {}
const DefaultCrypto = {}

AuthorizationServiceConfiguration.fetchFromIssuer = jest.fn(() =>
  Promise.resolve(getPingidFetchFromIssuerResponse()),
)

RedirectRequestHandler.performAuthorizationRequest = jest.fn(() =>
  Promise.resolve(getPingidFetchFromIssuerResponse()),
)

export {
  AuthorizationServiceConfiguration,
  AuthorizationRequest,
  RedirectRequestHandler,
  FetchRequestor,
  LocalStorageBackend,
  TokenRequest,
  BaseTokenRequestHandler,
  GRANT_TYPE_REFRESH_TOKEN,
  DefaultCrypto,
}
