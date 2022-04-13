/* eslint-disable no-console */
/*eslint-env node */
'use strict'

const fetch = require('node-fetch')
const AWS = require('aws-sdk')

// Set the Region
AWS.config.update({
  accessKeyId: process.env.keyID,
  secretAccessKey: process.env.AccessKey,
  region: process.env.region,
  signatureVersion: 'v4',
})

require('dotenv').config({
  path: `${__dirname}/.env.${process.env.env || 'dev'}`,
})

// Create the S3 service object
const s3 = new AWS.S3()

const PING_ID_AUTH_URL = ''
// itx-bvo-gladiator-cf-dev
const myBucket = process.env.bucketname

const operations = {
  read: ['getObject'],
  write: ['putObject', 'deleteObject'],
}

function verifyOperationIsPermitted(fileName, email, operation) {
  const allPremittedPaths = {
    read: [
      /^protected\/.*/,
      /^allAuth\/.*/,
      /^presentations\/.*\/.*/,
      new RegExp(`^private/${email}/.*`, 'i'),
      new RegExp(`^protected/${email}/.*`, 'i'),
    ],
    write: [
      /^presentations\/.*\/.*/,
      new RegExp(`^private/${email}/.*`, 'i'),
      new RegExp(`^protected/${email}/.*`, 'i'),
    ],
  }

  const neededPermission = operations.write.includes(operation)
    ? 'write'
    : operations.read.includes(operation)
    ? 'read'
    : ''

  if (neededPermission === '')
    throw new httpErrorResponse(`Unknown operation: ${operation}`, 400)

  const premittedPaths = allPremittedPaths[neededPermission]
  const isPermitted =
    premittedPaths.filter((pathRegEx) => pathRegEx.test(fileName)).length > 0

  if (!isPermitted)
    throw new httpErrorResponse(
      `${neededPermission} to ${fileName} not permitted to ${email}`,
      401,
    )
}

async function fetchUserEmail(authHeader) {
  try {
    const userResponse = await fetch(PING_ID_AUTH_URL, {
      headers: {
        Authorization: authHeader,
      },
    })

    if (userResponse.ok) {
      const user = await userResponse.json()
      const email = user.email
      if (!email)
        throw new httpErrorResponse(
          `Could not get email: ${JSON.stringify(user || {})}`,
          401,
        )
      console.log({ email })
      return email
    } else {
      throw new httpErrorResponse(
        `PingId HTTP Error Response: ${userResponse.status} ${
          userResponse.statusText
        } ${JSON.stringify(userResponse || {})}`,
        401,
      )
    }
  } catch (err) {
    console.error(err)
    throw new httpErrorResponse('Could Not Authorize', 401)
  }
}

async function getSignedUrl({ fileName, fileType, operation, authHeader }) {
  const email = await fetchUserEmail(authHeader)

  verifyOperationIsPermitted(fileName, email, operation)

  try {
    const s3ObjectParams = {
      Bucket: myBucket,
      Key: fileName,
    }
    if (operation !== 'getObject') s3ObjectParams.ContentType = fileType

    const signedUrl = await s3.getSignedUrlPromise(operation, s3ObjectParams)

    return signedUrl
  } catch (err) {
    throw `Cannot get signed s3 url: ${err}`
  }
}

function parseEvent(event) {
  try {
    console.dir({ body: event.body })
    const requestObject =
      typeof event.body === 'string' ? JSON.parse(event.body) : event.body
    const { fileName, fileType, operation } = requestObject
    const requestHeaders = event.headers
    const authHeader =
      requestHeaders.authorization || requestHeaders.Authorization

    console.log({ fileName, fileType, operation })

    if (!(fileName && operation && authHeader)) throw 'invalid params'

    return {
      fileName,
      fileType,
      operation,
      authHeader,
    }
  } catch (err) {
    event = event || {}
    throw new httpErrorResponse(
      `Invalid Event Params: ${JSON.stringify({
        body: event.body,
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
    const { fileName, fileType, operation, authHeader } = parseEvent(event)

    const signedUrl = await getSignedUrl({
      fileName,
      fileType,
      operation,
      authHeader,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ signedUrl }),
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
