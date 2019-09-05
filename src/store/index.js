import { createStore } from 'vuex'
import modules from './modules'

/**
 * returns @type {import('vuex').Store}
 * */
export const createAppStore = () =>
  createStore({
    strict: import.meta.env.DEV,
    modules,
  })

const store = createAppStore()

export default store
