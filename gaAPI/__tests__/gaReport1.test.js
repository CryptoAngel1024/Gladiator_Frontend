/**
 * @jest-environment node
 */
/*eslint-env node, jest */
jest.mock('@google-analytics/data')
const { BetaAnalyticsDataClient } = require('@google-analytics/data')
const runReport = jest.fn()
BetaAnalyticsDataClient.mockImplementation(() => ({ runReport }))
const report1Resp = require('./__data__/report1Resp.json')
const report1FinalResp = require('./__data__/report1FinalApiResp.json')

const metrics = [
  {
    name: 'activeUsers',
  },
  {
    name: 'newUsers',
  },
  {
    name: 'userEngagementDuration',
  },
]

process.env.GA_PRIVATE_KEY = 'test'

const { handler } = require('../gaApi.js')
const {
  expectLambdaHandlerResponse,
} = require('../../tests/testUtils/lambda.js')

describe('Report1 Specs', () => {
  beforeEach(() => {
    runReport.mockClear()
  })

  test('Handles data', async () => {
    expect(process.env.GA_PROPERTY_ID).toBe('308253785')

    runReport.mockImplementationOnce(() => Promise.resolve([report1Resp]))
    const params = {
      startDate: '2020-01-01',
      endDate: 'today',
      reportType: 'Report1',
      department: '*',
    }
    await expectLambdaHandlerResponse({
      params: {
        eventParams: params,
      },
      expectedResponse: {
        expectedSuccessResponse: report1FinalResp,
      },
      handler,
    })
    const expectedApiPayload = expect.objectContaining({
      dateRanges: [
        {
          startDate: params.startDate,
          endDate: params.endDate,
        },
      ],
      dimensions: [{ name: 'month' }],
      dimensionFilter: {
        filter: {
          fieldName: 'pagePathPlusQueryString',
          stringFilter: {
            matchType: 'FULL_REGEXP',
            value: '^/' + params.department + '/.*',
          },
        },
      },
      metrics: metrics,
    })
    expect(runReport).toHaveBeenCalledWith(expectedApiPayload)
  })

  test('Handles invalid params', async () => {
    const invalidParams = {
      startDate: '2020-01-01',
      endDate: 'today',
      department: 'asc',
    }
    await expectLambdaHandlerResponse({
      params: {
        eventParams: invalidParams,
      },
      expectedResponse: {
        expectedError: {
          body: `Invalid Event Params: ${JSON.stringify({
            params: invalidParams,
          })}`,
          statusCode: 400,
        },
      },
      hideConsoleErrorsCount: 1,
      handler,
    })
  })
})
