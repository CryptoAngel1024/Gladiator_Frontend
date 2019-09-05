/*eslint-env node, jest, amd*/
import { getAuthenticationResult } from '@tests/__data__/auth/authData'

const user = {
  attributes: '',
  Username: 'Demo User',
}

const userInfo = {
  id: 'userID1',
  username: 'Demo User',
}

const Auth = {
  signIn: jest.fn(() => Promise.resolve(getAuthenticationResult())),
  signOut: jest.fn(() => Promise.resolve()),
  currentAuthenticatedUser: jest.fn(() => Promise.resolve(user)),
  currentUserInfo: jest.fn(() => Promise.resolve(userInfo)),
}

export { Auth }
