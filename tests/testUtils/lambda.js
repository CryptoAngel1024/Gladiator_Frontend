/**
 * @jest-environment node
 */
/*eslint-env node, jest */
'use strict'

module.exports.expectLambdaHandlerResponse =
  async function expectLambdaHandlerResponse({
    params: { eventBody, eventParams, AuthorizationHeader },
    expectedResponse: { expectedSuccessResponse, expectedError },
    hideConsoleErrorsCount = 0,
    handler,
  }) {
    const consoleError = console.error
    if (hideConsoleErrorsCount)
      console.error = () => {
        hideConsoleErrorsCount--
        if (hideConsoleErrorsCount === 0) console.error = consoleError
      }

    let lambdaResponse = null

    lambdaResponse = await handler({
      body: eventBody ? JSON.stringify(eventBody) : null,
      queryStringParameters: eventParams || null,
      headers: AuthorizationHeader
        ? { authorization: AuthorizationHeader }
        : null,
    })
    console.error = consoleError

    const expectedBody = expectedError?.body
      ? { message: expectedError.body }
      : expectedSuccessResponse

    expect(JSON.parse(lambdaResponse.body)).toMatchObject(expectedBody)
    expect(lambdaResponse.statusCode).toBe(expectedError?.statusCode || 200)
  }
