/* eslint-disable no-console */
/*eslint-env node */

/**
 * TODO(developer): Uncomment this variable and replace with your
 *   Google Analytics 4 property ID before running the sample.
 */
const propertyId = 

// Imports the Google Analytics Data API client library.
const { BetaAnalyticsDataClient } = require('@google-analytics/data')

// Set GOOGLE_APPLICATION_CREDENTIALS to the location of the credentials.json file
// export GOOGLE_APPLICATION_CREDENTIALS=.\credentails.json

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient()

// Runs a simple report.

async function runReport2() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: '2021-03-01',
        endDate: 'today',
      },
    ],
    dimensions: [
      // { name: 'pagePath' },
      { name: 'pageTitle' },
      // { name: 'pagePathPlusQueryString' },
      // { name: 'unifiedScreenClass' },
    ],
    dimensionFilter: {
      filter: {
        fieldName: 'pagePathPlusQueryString',
        stringFilter: {
          matchType: 'FULL_REGEXP',
          value: '^/trauma/.*',
        },
      },
    },
    metrics: [
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
        name: 'engagementRate',
      },
      {
        name: 'screenPageViews',
      },
    ],
  })

  console.log('Report result:')
  // console.log(response)
  console.log(JSON.stringify(response))
}

runReport2()
