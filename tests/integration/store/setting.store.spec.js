/*eslint-env node, jest, amd*/
import { gaEvent, getNewStore } from './setupStore.js'
import { updateUser, createUser } from '@/api/user.api'
import { currentAuthenticatedUser } from '@/api/pingIdAuth.js'
import {
  mockUserDetail,
  defaultEmailBody,
  getDefaultUser,
} from '../../__data__/auth/authData.js'

jest.mock('@/api/user.api')
jest.mock('@/api/pingIdAuth')

function getSettingsEmailBody(store) {
  const response = store.getters['setting/emailBody']
  return response
}
function getSettingsEmail(store) {
  const response = store.getters['setting/getEmail']
  return response
}

function getSettingsUserId(store) {
  const response = store.getters['setting/getId']
  return response
}

function getSettingsFirstName(store) {
  const response = store.getters['setting/getFirstName']
  return response
}

function getSettingsLastName(store) {
  const response = store.getters['setting/getLastName']
  return response
}

for (const dep of ['ASC', 'TRAUMA']) {
  let store = getNewStore()
  describe(`store setting module spec ${dep}`, () => {
    beforeAll(() => {
      store.commit('auth/setUserDetail', mockUserDetail)

      store.commit('setting/setUser', mockUserDetail)

      store.commit('setting/setCurrentDepartment', dep)
    })

    it('should get and set correct email body', () => {
      const emailBody = getSettingsEmailBody(store)
      expect(emailBody).toBe(' ')

      const updatedEmailBody = 'Updated Email Body'
      store.commit('setting/setEmailBody', updatedEmailBody)
      const currentEmailBody = getSettingsEmailBody(store)
      expect(currentEmailBody).toBe(updatedEmailBody)
    })

    it('should fetch user', async () => {
      const result = await store.dispatch('setting/fetchUser')

      expect({ ...result, department: dep }).toEqual(
        expect.objectContaining({ ...mockUserDetail, department: dep }),
      )

      expect(gaEvent).toBeCalledWith({
        action: 'fetch-user',
        event_category: 'settting',
        event_label: 'User-fetch-user',
      })

      const settingsGetterValues = {
        id: getSettingsUserId(store),
        firstName: getSettingsFirstName(store),
        lastName: getSettingsLastName(store),
        emailBody: getSettingsEmailBody(store),
        email: getSettingsEmail(store),
        department: dep,
      }

      expect(settingsGetterValues).toMatchObject({
        ...mockUserDetail,
        department: dep,
        emailBody:
          mockUserDetail.emailBody || defaultEmailBody(settingsGetterValues),
      })
    })

    it('should create user if fetch user fails', async () => {
      const _404Error = {
        status: 404,
      }

      currentAuthenticatedUser.mockImplementationOnce(() => {
        throw _404Error
      })

      await store.dispatch('setting/fetchUser')

      expect(createUser).toHaveBeenLastCalledWith(
        {
          firstName: mockUserDetail.firstName,
          lastName: mockUserDetail.lastName,
          email: mockUserDetail.email,
          emailBody:
            mockUserDetail.emailBody || defaultEmailBody(mockUserDetail),
        },
        dep,
      )

      const settingsGetterValues = {
        id: store.getters['setting/getId'],
        firstName: store.getters['setting/getFirstName'],
        lastName: store.getters['setting/getLastName'],
        emailBody: store.getters['setting/emailBody'],
        email: store.getters['setting/getEmail'],
        department: dep,
      }

      expect(settingsGetterValues).toMatchObject({
        ...mockUserDetail,
        department: dep,
        emailBody:
          mockUserDetail.emailBody || defaultEmailBody(settingsGetterValues),
      })
    })

    it('should update user', async () => {
      const emailBody = 'Dummy Email Body'
      const result = await store.dispatch('setting/updateUser', {
        emailBody: emailBody,
        firstName: mockUserDetail.firstName,
        lastName: mockUserDetail.lastName,
      })

      expect(result).toEqual(
        expect.objectContaining({
          ...getDefaultUser(dep),
          emailBody: emailBody,
        }),
      )
      expect(updateUser).toBeCalled()

      const settingsGetterValues = {
        id: getSettingsUserId(store),
        firstName: getSettingsFirstName(store),
        lastName: getSettingsLastName(store),
        emailBody: getSettingsEmailBody(store),
        email: getSettingsEmail(store),
        department: dep,
      }

      expect(settingsGetterValues).toMatchObject({
        ...mockUserDetail,
        department: dep,
        emailBody,
      })

      expect(gaEvent).toBeCalledWith({
        action: 'update-user',
        event_category: 'settting',
        event_label: 'User-update-user',
      })
    })
  })
}
