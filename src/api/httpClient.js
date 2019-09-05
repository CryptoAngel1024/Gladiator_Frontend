import { API } from '@aws-amplify/api'
import { Storage } from '@aws-amplify/storage'
import { Amplify } from '@aws-amplify/core'
import { getOrRefreshAccessToken, performWithFreshTokens } from './pingIdAuth'
import apiConstantsGetter from './apiConstants'
import environment from '../environments/environment'

const API_NAME = 'MyAPIGatewayAPI'
const GA_API_NAME = 'GaAPI'
const AWS_REGION = import.meta.env.VITE_COGNITO_REGION || 'us-east-1'

const apiConstants = apiConstantsGetter(import.meta.env.VITE_STAGE)

const AWS_EXPORTS = {
  // OPTIONAL - if your API requires authentication

  API: {
    endpoints: [
      {
        name: API_NAME,
        endpoint: '/api',
        custom_header: async () => {
          return await getAuthorizationToken()
        },
      },
      {
        name: environment.signed_url_endpoint_name,
        endpoint: environment.signed_url_endpoint,
        custom_header: async () => {
          return await getAuthorizationToken()
        },
      },
      {
        name: environment.userinfo_endpoint_name,
        endpoint: environment.userinfo_endpoint,
        custom_header: async () => {
          return await getAuthorizationToken()
        },
      },
    ],
  },
  Storage: {
    AWSS3: {
      bucket: import.meta.env.VITE_S3_BUCKET || apiConstants.VITE_S3_BUCKET,
      region: AWS_REGION,
      customPrefix: {
        public: '',
        private: '',
      },
    },
  },
}

Amplify.configure(AWS_EXPORTS)

async function getAuthorizationToken() {
  const accessToken = await getOrRefreshAccessToken()
  return {
    Authorization: `Bearer ${accessToken}`,
  }
}
// REST
async function get(path, params = {}, apiName = API_NAME, retries = 3) {
  try {
    return await API.get(apiName, path, {
      // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: params,
    })
  } catch (err) {
    if (retries > 1 && err.response?.status === 504) {
      return get(path, params, apiName, retries - 1)
    } else if (retries > 1 && err.response?.status === 401) {
      const userInfo = await performWithFreshTokens()
      if (userInfo) return get(path, params, apiName, retries - 1)
    }
    throw {
      status: err.response?.status,
      message: err.response?.data?.message || err.message || err,
    }
  }
}

async function getByToken({
  path,
  token,
  params = {},
  apiName = API_NAME,
  retries = 3,
  headers = {},
}) {
  try {
    return await API.get(apiName, path, {
      // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: params,
      headers: {
        PDF_CLIENT_KEY: token,
        ...headers,
      },
    })
  } catch (err) {
    if (retries > 1 && err.response?.status === 504) {
      return await getByToken({
        path,
        token,
        params,
        apiName,
        retries: retries - 1,
        headers,
      })
    } else if (retries > 1 && err.response?.status === 401) {
      const userInfo = await performWithFreshTokens()
      if (userInfo) {
        return await getByToken({
          path,
          token,
          params,
          apiName,
          retries: retries - 1,
          headers,
        })
      }
    }
    throw {
      status: err.response?.status,
      message: err.response?.data?.message || err.message || err,
    }
  }
}

async function del(
  path,
  payload = {},
  headers = {},
  apiName = API_NAME,
  retries = 3,
) {
  try {
    return await API.del(apiName, path, {
      queryStringParameters: payload,
      headers: {
        presentationId: payload.presentationId || headers.presentationId,
        templateId: payload.templateId || headers.templateId,
      },
    })
  } catch (err) {
    if (retries > 1 && err.response?.status === 504) {
      return await del(path, payload, headers, apiName, retries - 1)
    } else if (retries > 1 && err.response?.status === 401) {
      const userInfo = await performWithFreshTokens()
      if (userInfo) {
        return await del(path, payload, headers, apiName, retries - 1)
      }
    }
    throw {
      status: err.response?.status,
      message: err.response?.data?.message || err.message || err,
    }
  }
}

async function post(path, payload, apiName = API_NAME, retries = 3) {
  try {
    return await API.post(apiName, path, {
      body: payload,
      headers: {
        presentationId: payload.presentationId,
        templateId: payload.templateId,
      },
    })
  } catch (err) {
    if (retries > 1 && err.response?.status === 504) {
      return await post(path, payload, apiName, retries - 1)
    } else if (retries > 1 && err.response?.status === 401) {
      const userInfo = await performWithFreshTokens()
      if (userInfo) {
        return await post(path, payload, apiName, retries - 1)
      }
    }
    throw {
      status: err.response?.status,
      message: err.response?.data?.message || err.message || err,
    }
  }
}

async function put(path, payload, apiName = API_NAME, retries = 3) {
  try {
    return await API.put(apiName, path, {
      body: payload,
      headers: {
        presentationId: payload?.presentationId,
        templateId: payload?.templateId,
      },
    })
  } catch (err) {
    if (retries > 1 && err.response?.status === 504) {
      return await put(path, payload, apiName, retries - 1)
    } else if (retries > 1 && err.response?.status === 401) {
      const userInfo = await performWithFreshTokens()
      if (userInfo) {
        return await put(path, payload, apiName, retries - 1)
      }
    }
    throw {
      status: err.response?.status,
      message: err.response?.data?.message || err.message || err,
    }
  }
}

async function getFile(fileName, directory = '', download = false) {
  return await Storage.get(`${directory}${fileName}`, {
    level: 'public',
    download,
  })
}

async function saveFile(file, fileName, directory = '', contentType) {
  return await Storage.put(`${directory}${fileName}`, file, {
    level: 'public',
    contentType,
  })
}

async function deleteFile(fileName, directory = '') {
  return await Storage.remove(`${directory}${fileName}`, {
    level: 'public',
  })
}

export {
  // REST
  get,
  getByToken,
  post,
  put,
  del,
  getFile,
  saveFile,
  deleteFile,
  GA_API_NAME,
}
