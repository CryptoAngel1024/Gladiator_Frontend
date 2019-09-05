/*eslint-env node, jest, amd*/
import * as gTag from 'vue-gtag-next'

/* eslint-disable no-import-assign */
gTag.useGtag = jest.fn(() => ({ event: jest.fn() }))
gTag.trackRouter = jest.fn(() => {})

module.exports = gTag
