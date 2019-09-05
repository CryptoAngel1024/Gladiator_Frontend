import { contactSupport } from '@/api/support.api'
import { gaEvent } from '@/utils/GA_Event.js'

export default {
  state: () => ({
    status: '', // '', 'SUCCESS', 'FAIL'
    supportDetail: {
      reason: '',
      subject: '',
      body: '',
      picture: '',
    },
  }),
  getters: {
    getDetail(state) {
      return state.supportDetail
    },
    getStatus(state) {
      return state.status
    },
  },
  mutations: {
    setDetail(state, payload) {
      state.supportDetail.reason = payload.reason
      state.supportDetail.subject = payload.subject
      state.supportDetail.body = payload.body
      state.supportDetail.picture = payload.picture
    },
    setStatus(state, payload) {
      state.status = payload
    },
  },
  actions: {
    async contactSupport({ commit }, payload) {
      gaEvent({
        action: 'contact-support',
        event_category: 'support',
        event_label: 'User-contact-support',
      })
      contactSupport(payload).then(() => {})
      commit('setStatus', 'FAIL')
    },
  },
}
