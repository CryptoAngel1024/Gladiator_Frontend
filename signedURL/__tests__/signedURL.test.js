/**
 * @jest-environment node
 */
/*eslint-env node, jest */
'use strict'
jest.mock('aws-sdk')
jest.mock('node-fetch')

const fetch = require('node-fetch')
const AWS = require('aws-sdk')

const getSignedUrlPromise = jest.fn()
AWS.S3.mockImplementation(() => ({ getSignedUrlPromise }))

const signedURL = require('../index.js')
const {
  expectLambdaHandlerResponse,
} = require('../../tests/testUtils/lambda.js')

const testFileName = 'private/a@test.com/a'
const testEmail = 'a@test.com'

const fetchResponse = jest.requireActual('node-fetch').Response

async function expectSignedUrlResponse({
  eventBody,
  expectedError,
  expectedSignedURL,
  hideConsoleErrorsCount = 0,
  mockPingIdResponse,
  mockPingIdErrorResponse,
}) {
  if (mockPingIdResponse) {
    const successfulUserResponse = new fetchResponse(
      JSON.stringify(mockPingIdResponse),
    )
    fetch.mockReturnValueOnce(Promise.resolve(successfulUserResponse))
  }
  if (mockPingIdErrorResponse) {
    const errorUserResponse = new fetchResponse(
      JSON.stringify(mockPingIdErrorResponse),
    )
    fetch.mockReturnValueOnce(Promise.reject(errorUserResponse))
  }

  if (expectedSignedURL)
    getSignedUrlPromise.mockImplementationOnce(() =>
      Promise.resolve(expectedSignedURL),
    )

  await expectLambdaHandlerResponse({
    params: { eventBody, AuthorizationHeader: 'Bearer samplea' },
    expectedResponse: {
      expectedSuccessResponse: { signedUrl: expectedSignedURL },
      expectedError,
    },
    hideConsoleErrorsCount,
    handler: signedURL.handler,
  })
}

test('Handles Invalid Event Params', async () => {
  await expectSignedUrlResponse({
    expectedError: {
      statusCode: 400,
      body: expect.stringContaining('Invalid Event Params: '),
    },
    hideConsoleErrorsCount: 1,
  })
})

test('Handles PingId endpoint error', async () => {
  await expectSignedUrlResponse({
    expectedError: {
      statusCode: 401,
      body: 'Could Not Authorize',
    },
    eventBody: {
      fileName: testFileName,
      fileType: '',
      operation: 'putObject',
    },
    hideConsoleErrorsCount: 2,
    mockPingIdErrorResponse: {},
  })
})

test('Handles NonPermitted Users', async () => {
  const notPermittedOperations = [
    {
      email: testEmail,
      fileName: 'private/b@test.com/a',
      operation: 'putObject',
    },
    {
      email: 'b@test.com',
      fileName: testFileName,
      operation: 'deleteObject',
    },
    {
      email: testEmail,
      fileName: 'protected/b@test.com/a',
      operation: 'putObject',
    },
    {
      email: testEmail,
      fileName: 'private/b@test.com/a',
      operation: 'getObject',
    },
    {
      email: testEmail,
      fileName: 'presentations/',
      operation: 'getObject',
    },
    {
      email: testEmail,
      fileName: 'presentations/a',
      operation: 'getObject',
    },
  ]
  for (const { email, fileName, operation } of notPermittedOperations) {
    await expectSignedUrlResponse({
      expectedError: {
        statusCode: 401,
        body: expect.stringContaining(
          `to ${fileName} not permitted to ${email}`,
        ),
      },
      eventBody: {
        fileName,
        fileType: '',
        operation,
      },
      hideConsoleErrorsCount: 1,
      mockPingIdResponse: { email },
    })
  }
})

test('Handles Permitted Users', async () => {
  expect(process.env.bucketname).toBe('itx-bvo-gladiator-cf-dev')

  const permittedOperations = [
    {
      email: testEmail,
      fileName: testFileName,
      operation: 'putObject',
    },
    {
      email: testEmail,
      fileName: 'protected/a@test.com/b',
      operation: 'putObject',
    },
    {
      email: 'b@test.com',
      fileName: 'protected/b@test.com/b',
      operation: 'deleteObject',
    },
    {
      email: testEmail,
      fileName: 'private/a@test.com/b',
      operation: 'getObject',
    },
    {
      email: testEmail,
      fileName: 'presentations/a/b',
      operation: 'getObject',
    },
  ]
  for (const { email, fileName, operation } of permittedOperations) {
    await expectSignedUrlResponse({
      eventBody: {
        fileName,
        fileType: '',
        operation,
      },
      hideConsoleErrorsCount: 0,
      mockPingIdResponse: { email },
      expectedSignedURL: 'url1',
    })
  }
})
