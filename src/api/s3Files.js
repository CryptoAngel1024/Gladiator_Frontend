import { post } from './httpClient.js'

import environment from '../environments/environment'

const signUrlEndpoint = environment.signed_url_endpoint_name

const getSignedFileUrl = async (filePath) => {
  const payload = {
    fileName: filePath,
    operation: 'getObject',
  }
  return post('', payload, signUrlEndpoint)
}

const saveFileSigned = async (file, filePath, fileType) => {
  const payload = {
    fileName: filePath,
    fileType: fileType,
    operation: 'putObject',
  }

  const { signedUrl } = await post('', payload, signUrlEndpoint)

  await uploadFile(file, signedUrl)

  return signedUrl
}

const uploadFile = async (file, signedUrl) => {
  await fetch(signedUrl, {
    method: 'PUT',
    body: file,
  })
}

const deleteFileSigned = async (filePath) => {
  const payload = {
    fileName: filePath,
    operation: 'deleteObject',
  }

  const { signedUrl } = await post('', payload, signUrlEndpoint)

  await fetch(signedUrl, {
    method: 'DELETE',
  })
}

export { getSignedFileUrl, saveFileSigned, deleteFileSigned }
