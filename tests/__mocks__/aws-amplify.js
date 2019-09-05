/*eslint-env node, jest, amd*/
import { getAuthenticationResult } from '@tests/__data__/auth/authData'

const Auth = {}
const Storage = {}

Auth.signIn = jest.fn(() => Promise.resolve(getAuthenticationResult()))
Auth.signOut = jest.fn(() => Promise.resolve())

const user = {
  attributes: '',
  Username: 'Demo User',
}
Auth.currentAuthenticatedUser = jest.fn(() => Promise.resolve(user))

const userInfo = {
  id: 'userID1',
  username: 'Demo User',
}
Auth.currentUserInfo = jest.fn(() => Promise.resolve(userInfo))

Storage.get = jest.fn(() => {})
Storage.put = jest.fn(() => {})

export { Auth, Storage }
