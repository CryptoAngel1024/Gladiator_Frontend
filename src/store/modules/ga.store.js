import { getReport } from '@/api/gaReport.api'
import { gaEvent } from '@/utils/GA_Event.js'
import { getCurrentDepartment } from '@/utils/departments.js'

export default {
  state: () => ({
    asc: {},
    trauma: {},
    isLoading: null,
    error: null,
  }),
  getters: {
    reportData: (state, getters) => {
      return state[getters.getLowerCaseDepartment]
    },
    report1: (state, getters) => {
      return state[getters.getLowerCaseDepartment].data != null
        ? state[getters.getLowerCaseDepartment].data.r1
        : null
    },
    report2: (state, getters) => {
      return state[getters.getLowerCaseDepartment].data != null
        ? state[getters.getLowerCaseDepartment].data.r2
        : null
    },
    getLowerCaseDepartment: (state, getters, rootState, rootGetters) => {
      const dept = getCurrentDepartment(rootGetters)
      return dept.toLowerCase()
    },
    // getIsLoading: (state) => {
    //   return state.isLoading
    // },
    // getError: (state) => {
    //   return state.error
    // },
  },
  mutations: {
    setReportData(state, { department, reportData }) {
      state[department] = reportData
    },
    setIsLoading(state, { isLoading }) {
      state.isLoading = isLoading
    },
    setError(state, { error }) {
      state.error = error
    },
  },
  actions: {
    async fetchReportData({ commit, getters }, { reportType = 'ALL' } = {}) {
      gaEvent({
        action: 'GA-Report-Data',
        event_category: 'Report',
        event_label: 'GA-report-data',
      })
      commit('setIsLoading', { isLoading: true })
      try {
        const department = getters.getLowerCaseDepartment
        const reportData = await getReport({ reportType, department })
        commit('setReportData', { department, reportData })
        commit('setIsLoading', { isLoading: false })
        return { reportData }
      } catch (err) {
        console.error('Failed to fetch GA Report', err)
        commit('setIsLoading', { isLoading: false })
        commit('setError', {
          error: `Error fetching GA report: ${err.message || err}`,
        })
        return { err }
      }
    },
  },
}
