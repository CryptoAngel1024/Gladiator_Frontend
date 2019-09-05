/*eslint-env node, jest, amd*/
/*eslint-disable no-unused-vars*/
import { mount } from '@vue/test-utils'
const { createRouterMock, injectRouterMock } = require('vue-router-mock')

// don't delete this it's used to mock dependencies
import * as gTag from '../../__mocks__/vue-gtag-next.mock.js'
import * as mockStore from '../../__mocks__/store.mock.js'

export default function mountComponent(component) {
  const router = createRouterMock()
  injectRouterMock(router)

  const { store } = mockStore

  const wrapper = mount(component, {
    global: {
      plugins: [store],
    },
  })

  return wrapper
}
