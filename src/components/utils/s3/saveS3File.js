import { getFile } from '@/api/httpClient.js'
import { saveAs } from 'file-saver'

export default async function saveS3File({
  s3Directory,
  s3FileName,
  fileName,
}) {
  try {
    let s3File = await getFile(s3FileName, s3Directory)

    if (typeof s3File === 'string') {
      const s3Response = await fetch(s3File)
      if (s3Response.status !== 200)
        throw { status: s3Response.status, link: s3File }
      s3File = await s3Response.blob()
    }

    saveAs(s3File, fileName)
  } catch (err) {
    if (err.status === 404) {
      throw 404
    } else {
      throw err
    }
  }
}

export async function retrySaveS3File({
  s3Directory,
  s3FileName,
  fileName,
  retryCount = 20,
}) {
  return new Promise((resolve, reject) => {
    async function retrySaveS3File() {
      setTimeout(async () => {
        try {
          await saveS3File({
            s3Directory,
            s3FileName,
            fileName,
          })
          resolve()
        } catch (error) {
          if ((error == 404 || error == 504) && retryCount > 0) {
            retryCount--
            await retrySaveS3File()
          } else {
            reject(error)
          }
        }
      }, 10000)
    }
    retrySaveS3File()
  })
}
