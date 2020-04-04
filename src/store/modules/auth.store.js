import {
  signout,
  currentAuthenticatedUser,
  authenticatedUserLocalStorage,
} from '@/api/pingIdAuth.js'
import { gaEvent } from '@/utils/GA_Event.js'

const getDefaultState = () => {
  return {
    status: '', // posibble values: LOGGED_OUT, LOGGED_IN, LOADING, ERROR
    userDetail: {}, // current
    authResponse: {},
  }
}
export default {
  state: () => ({
    status: '', // posibble values: LOGGED_OUT, LOGGED_IN, LOADING, ERROR
    userDetail: {}, // current user
    authResponse: {
      challengeName: '',
    },
    s3LastUploadedPath: '',
  }),

  getters: {
    userDetail(state) {
      return state.userDetail || authenticatedUserLocalStorage()
    },

    userID(state) {
      return state.userDetail.userID
    },

    email(state) {
      return state.userDetail?.email || authenticatedUserLocalStorage()?.email
    },

    // status(state) {
    //   return state.status
    // },

    // authResponse(state) {
    //   return state.authResponse
    // },

    // s3LastUploadedPath(state) {
    //   return state.s3LastUploadedPath
    // },
  },

  mutations: {
    setUserDetail(state, payload) {
      state.userDetail = JSON.parse(JSON.stringify(payload))
    },
    setUser(state, payload) {
      state.setUser = payload
    },

    setStatus(state, payload) {
      state.status = payload
    },

    resetState(state) {
      Object.assign(state, getDefaultState())
    },

    setAuthResponse(state, payload) {
      state.authResponse = payload
    },

    setS3LastUploadedPath(state, url) {
      state.s3LastUploadedPath = url
    },
  },

  actions: {
    async fetchUserDetail({ commit, state }, updateIfExists = true) {
      gaEvent({
        action: 'fetch-user-detail',
        event_category: 'engagement',
        event_label: 'User-fetch-user-detail',
      })
      try {
        if (!updateIfExists) {
          const email = state.userDetail?.email
          if (email) return { userDetail: state.userDetail }
        }

        const userDetail = await currentAuthenticatedUser()

        commit('setUserDetail', userDetail)

        return { userDetail }
      } catch (err) {
        if (err?.status !== 404) console.error('fetchUserDetail: ', err)
        return { err }
      }
    },

    async signout({ commit }) {
      gaEvent({
        action: 'sign-out',
        event_category: 'engagement',
        event_label: 'User-signed-out',
      })
      await signout()

      commit('setUserDetail', {})
    },
  },
}
