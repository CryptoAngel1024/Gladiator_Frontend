/*eslint-env node, jest, amd*/
import Vuex from 'vuex'

const updateUserArgument = 'Dummy Email Body'

const settingActions = {
  fetchUser: jest.fn(),
  updateUser: jest.fn(),
}

const settingStoreModule = {
  namespaced: true,
  state: () => ({ emailBody: '', firstName: '', lastName: '', id: '' }),
  getters: {
    emailBody: jest.fn(() => updateUserArgument),
    populatedEmailBody: jest.fn(),
    getFirstName: jest.fn(),
    getLastName: jest.fn(),
    userId: jest.fn(),
    defaultEmailBody: jest.fn(),
  },
  mutations: {
    setEmailBody: jest.fn(),
    setFirstName: jest.fn(),
    setLastName: jest.fn(),
    setEmail: jest.fn(),
    setUser: jest.fn(),
  },
  actions: settingActions,
}

const authStoreModule = {
  namespaced: true,
  getters: {
    userDetail: jest.fn(),
    email: jest.fn(),
  },
  mutations: {
    setUser: jest.fn(),
  },
  actions: { fetchUserDetail: jest.fn() },
}

const store = new Vuex.Store({
  modules: {
    setting: settingStoreModule,
    auth: authStoreModule,
  },
})

module.exports = {
  store,
  updateUserArgument,
  settingActions,
  settingStoreModule,
}
