/* eslint-disable no-console */
/*eslint-env node */
require('dotenv').config({
  path: `${__dirname}/.env.${process.env.env || 'dev'}`,
})
/**
 * TODO(developer): Uncomment this variable and replace with your
 *   Google Analytics 4 property ID before running the sample.
 */
const propertyId = process.env.GA_PROPERTY_ID

// Imports the Google Analytics Data API client library.
const { BetaAnalyticsDataClient } = require('@google-analytics/data')

const gaClientOptions = {
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY,
  },
}
// console.log(gaClientOptions)
const analyticsDataClient = new BetaAnalyticsDataClient(gaClientOptions)

// Runs a simple report.
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const modules = [
  { name: 'Dashboard', regex: new RegExp('dashboard', 'i') },
  { name: 'Overview', regex: new RegExp('overview', 'i') },
  { name: 'Slide Builder', regex: new RegExp('builder', 'i') },
  { name: 'My Presentation', regex: new RegExp('my presentation', 'i') },
  { name: 'Shared Presentation', regex: new RegExp('shared', 'i') },
  { name: 'Settings', regex: new RegExp('settings', 'i') },
  { name: 'Published', regex: new RegExp('published', 'i') },
  { name: 'Support', regex: new RegExp('support', 'i') },
  {
    name: 'Update Presentation',
    regex: new RegExp('update( |-)presentation', 'i'),
  },
]

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

function initalizeReport1(metrics, value) {
  const resp = {}
  months.forEach((month) => {
    const mn = {}
    metrics.forEach((metric) => {
      mn[metric.name] = value
    })
    resp[month] = mn
  })
  return resp
}

function initalizeReport2(metrics, value) {
  const resp = {}
  modules.forEach((module) => {
    const mn = {}
    metrics.forEach((metric) => {
      if (metric.name === 'bounceRate') mn[metric.name] = '-'
      else mn[metric.name] = value
    })

    /*
     * pageTitleCount will hold the number of pageTitles that fall to this module category
     * Its used to calculate the running avarage value for bounce rate
     */
    mn.pageTitleCount = 0
    resp[module.name] = mn
  })
  return resp
}

async function runReport1(
  startDate = '2020-01-01',
  endDate = 'today',
  department = '*',
) {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: startDate,
          endDate: endDate,
        },
      ],
      dimensions: [{ name: 'month' }],
      dimensionFilter: {
        filter: {
          fieldName: 'pagePathPlusQueryString',
          stringFilter: {
            matchType: 'FULL_REGEXP',
            value: '^/' + department + '/.*',
          },
        },
      },
      metrics: metrics,
    })
    if (response && response.rows && response.metricHeaders) {
      const data = initalizeReport1(metrics, 0)
      response.rows.forEach((row) => {
        const month = months[parseInt(row.dimensionValues[0].value) - 1]
        for (let i = 0; i < response.metricHeaders.length; i++) {
          data[month][response.metricHeaders[i].name] = parseInt(
            row.metricValues[i].value,
          )
        }
      })
      // console.log(data)
      return data
    } else {
      throw new httpErrorResponse('No Data', 500)
    }
  } catch (err) {
    throw `Cannot get analytics report : ${err}`
  }
}

async function runReport2(
  startDate = '2020-01-01',
  endDate = 'today',
  department = '*',
  offset = 0,
  limit = 10000,
) {
  try {
    const report2Metrics = [
      {
        name: 'activeUsers',
      },
      {
        name: 'sessions',
      },
      {
        name: 'userEngagementDuration',
      },
      {
        name: 'screenPageViews',
      },
      { name: 'bounceRate' },
      {
        name: 'eventCount',
      },
    ]
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: startDate,
          endDate: endDate,
        },
      ],
      dimensions: [{ name: 'pageTitle' }],
      dimensionFilter: {
        filter: {
          fieldName: 'pagePathPlusQueryString',
          stringFilter: {
            matchType: 'FULL_REGEXP',
            value: '^/' + department + '/.*',
          },
        },
      },
      metrics: report2Metrics,
      orderBys: [
        {
          desc: true,
          metric: {
            metricName: 'screenPageViews',
          },
        },
      ],
      offset: offset,
      limit: limit,
    })
    // console.log(JSON.stringify(response))
    if (response && response.rows && response.metricHeaders) {
      return getInitalizeReport2Data(report2Metrics, response)
    } else {
      throw new httpErrorResponse('No Data', 500)
    }
  } catch (err) {
    throw `Cannot get analytics report : ${err}`
  }
}

function getInitalizeReport2Data(report2Metrics, response) {
  const data = initalizeReport2(report2Metrics, 0)
  response.rows.forEach((row) => {
    // find module name from row.dimensionValues[0].value by going thru each modules and test for match
    const pageTitle = row.dimensionValues[0].value
    const foundModule = modules.find((m) => m.regex.test(pageTitle))
    if (foundModule) {
      for (let i = 0; i < response.metricHeaders.length; i++) {
        // use running average for bounceRate Metric
        if (response.metricHeaders[i].name === 'bounceRate') {
          // if previousValue value is '-' set the new incomming value
          // else add incomming and original value then divide by two
          const previousValue =
            data[foundModule.name][response.metricHeaders[i].name]
          if (previousValue === '-')
            data[foundModule.name][response.metricHeaders[i].name] = parseFloat(
              row.metricValues[i].value,
            )
          else
            data[foundModule.name][response.metricHeaders[i].name] =
              (previousValue * data[foundModule.name]['pageTitleCount'] +
                parseFloat(row.metricValues[i].value)) /
              (data[foundModule.name]['pageTitleCount'] + 1)
        } else {
          data[foundModule.name][response.metricHeaders[i].name] += parseFloat(
            row.metricValues[i].value,
          )
        }
      }
      data[foundModule.name]['pageTitleCount'] += 1
    }
  })
  // console.log(JSON.stringify(data))
  return data
}

function parseEvent(event) {
  try {
    console.dir({ params: event.queryStringParameters })
    const requestObject = event.queryStringParameters
    const { startDate, endDate, reportType, department, offset, limit } =
      requestObject

    console.log({ startDate, endDate, reportType, department, offset, limit })

    if (!(reportType && department)) throw 'invalid params'

    return {
      startDate,
      endDate,
      reportType,
      department,
      offset,
      limit,
    }
  } catch (err) {
    event = event || {}
    throw new httpErrorResponse(
      `Invalid Event Params: ${JSON.stringify({
        params: event.queryStringParameters,
      })}`,
      400,
    )
  }
}

class httpErrorResponse {
  constructor(message = 'Internal Error', statusCode = 500) {
    const body = JSON.stringify({ message })
    this.statusCode = statusCode
    this.body = body
    this.headers = {
      'Content-Type': 'application/json',
    }
  }
}

module.exports.handler = async function (event) {
  try {
    const { startDate, endDate, reportType, department, offset, limit } =
      parseEvent(event)
    let data = {}
    switch (reportType) {
      case 'Report1':
        data = await runReport1(startDate, endDate, department)
        break
      case 'Report2':
        data = await runReport2(startDate, endDate, department, offset, limit)
        break
      case 'ALL': {
        const [r1, r2] = await Promise.all([
          runReport1(startDate, endDate, department),
          runReport2(startDate, endDate, department, offset, limit),
        ])
        data = { r1, r2 }
        break
      }
      default:
        throw new httpErrorResponse('Unknown ReportType!', 400)
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    }
  } catch (_err) {
    console.error(_err)
    let err = _err
    // if error not thrown by us
    if (!(err instanceof httpErrorResponse)) {
      err = new httpErrorResponse()
    }
    return err
  }
}
