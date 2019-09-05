/* eslint-disable no-import-assign, no-unused-vars*/
/*eslint-env node, jest, amd*/
import { createAppStore } from '@/store'
import * as GA_Event from '@/utils/GA_Event.js'

// mock dependencies
import * as gTag from '../../__mocks__/vue-gtag-next.mock.js'

GA_Event.gaEvent = jest.fn()

const store = createAppStore()
export default store
export const gaEvent = GA_Event.gaEvent
export const getNewStore = () => createAppStore()
