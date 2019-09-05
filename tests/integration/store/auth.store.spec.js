/*eslint-env node, jest, amd*/
import store from './setupStore.js'

import { signout } from '@/api/pingIdAuth'

import { mockUserDetail } from '../../__data__/auth/authData'

jest.mock('@/api/pingIdAuth')

function getUserDetails(store) {
  return store.getters['auth/userDetail']
}

for (const department of ['ASC', 'TRAUMA']) {
  describe('auth store module tests', () => {
    beforeAll(() => {
      store.commit('setting/setCurrentDepartment', department)
    })
    afterEach(() => {
      store.commit('auth/resetState')
    })

    it('should get default status', () => {
      const defaultStatus = store.getters['auth/status']
      expect(defaultStatus).toEqual('')
    })
    it('should get default authResponse', () => {
      const defaultAuthResponse = getUserDetails(store)
      expect(defaultAuthResponse).toEqual({})
    })
    it('should signin successfully', async () => {
      await store.dispatch('auth/fetchUserDetail')

      const authResp = getUserDetails(store)

      expect(authResp.email).toEqual(mockUserDetail.email)
    })
    it('should signout successfully', async () => {
      await store.dispatch('auth/fetchUserDetail')
      const authResp = getUserDetails(store)
      expect(authResp.email).toEqual(mockUserDetail.email)

      await store.dispatch('auth/signout')
      expect(signout).toBeCalled()
      const authRespAfterLogout = getUserDetails(store)
      expect(authRespAfterLogout).toEqual({})
    })
  })
}
