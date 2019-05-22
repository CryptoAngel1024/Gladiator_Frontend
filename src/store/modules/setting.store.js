import { createUser, updateUser } from '@/api/user.api.js'
import { getUserInfo } from '@/api/pingIdAuth.js'
import { defaultEmailBody } from '@/data/defaultSetting.js'
import { gaEvent } from '@/utils/GA_Event.js'

const getDefaultState = () => {
  return {
    emailBody: '',
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    userType: '',
    department: '',
    currentDepartment: '',
    id: '',
  }
}

export default {
  state: () => ({
    emailBody: '',
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    userType: '',
    department: '',
    currentDepartment: '',
    id: '',
  }),
  getters: {
    emailBody(state, getters) {
      return state.emailBody || (getters.email ? getters.defaultEmailBody : '')
    },

    populatedEmailBody: (state, getters) => (link) => {
      let replacedEmailBody = getters.emailBody.replace(
        '{passcode}',
        link.passCode,
      )
      replacedEmailBody = replacedEmailBody.replace(
        '{link}',
        `${window.location.origin}/slide/${link.hyperLink}`,
      )
      return replacedEmailBody
    },

    getId(state) {
      return state.id
    },
    getFirstName(state) {
      return state.firstName
    },
    getLastName(state) {
      return state.lastName
    },
    getEmail(state) {
      return state.email
    },
    getUsername(state) {
      return state.userName
    },
    getUserType(state) {
      return state.userType
    },
    getDepartment(state) {
      return state.department
    },
    getCurrentDepartment(state) {
      return state.currentDepartment || state.department
    },
    defaultEmailBody(state, getters, rootState, rootGetters) {
      return defaultEmailBody({ ...state, email: rootGetters['auth/email'] })
    },
  },
  mutations: {
    setId(state, payload) {
      state.id = payload
    },
    setEmailBody(state, payload) {
      state.emailBody = payload
    },
    setFirstName(state, payload) {
      state.firstName = payload
    },
    setLastName(state, payload) {
      state.lastName = payload
    },
    setEmail(state, payload) {
      state.email = payload
    },
    setUserName(state, payload) {
      state.userName = payload
    },
    setUserType(state, payload) {
      state.userType = payload
    },
    setUser(state, payload) {
      state.firstName = payload.firstName
      state.lastName = payload.lastName
      state.email = payload.email
      state.userName = payload.userName
      state.emailBody = payload.emailBody
      state.userType = payload.userType
      state.id = payload.id
    },
    setCurrentDepartment(state, department) {
      state.currentDepartment = department
    },
  },
  actions: {
    async fetchUser(
      { state, commit, dispatch, rootGetters, getters },
      refetchIfExists = true,
    ) {
      gaEvent({
        action: 'fetch-user',
        event_category: 'settting',
        event_label: 'User-fetch-user',
      })

      try {
        if (!refetchIfExists && state.email) return state

        const { err } = await dispatch(
          'auth/fetchUserDetail',
          refetchIfExists,
          {
            root: true,
          },
        )
        if (err) throw err

        const { userDetail } = await getUserInfo()

        commit('setUser', userDetail || getDefaultState())

        return userDetail || getDefaultState()
      } catch (err) {
        const errStatus = err.response?.status || err.status

        if (err.message === 'User Is already Fetched') {
          return state
        } else if (errStatus === 404 || errStatus === 400) {
          const userDetail = rootGetters['auth/userDetail']

          const department = getters.getCurrentDepartment

          const createdUser = await createUser(
            {
              email: userDetail.email,
              firstName: state.firstName,
              lastName: state.lastName,
              emailBody: state.emailBody || getters.defaultEmailBody,
            },
            department,
          )

          commit('setUser', createdUser)

          return createdUser
        }

        throw err
      }
    },
    async updateUser(
      { state, commit, getters, rootGetters },
      { firstName, lastName, emailBody, department },
    ) {
      gaEvent({
        action: 'update-user',
        event_category: 'settting',
        event_label: 'User-update-user',
      })
      try {
        const userDetail = rootGetters['auth/userDetail']

        const currentDepartment = getters.getCurrentDepartment

        const updatedUser = await updateUser({
          email: state.email || userDetail.email,
          emailBody: emailBody || state.emailBody || getters.defaultEmailBody,
          firstName: firstName || state.firstName,
          id: state.id,
          lastName: lastName || state.lastName,
          department: department || state.department || currentDepartment,
        })
        commit('setUser', updatedUser)

        return updatedUser
      } catch (err) {
        console.error(err.response || err)
        throw err
      }
    },
  },
}
