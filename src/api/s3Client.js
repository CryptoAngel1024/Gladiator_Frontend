import { AWSS3Provider } from '@aws-amplify/storage'
// import { getAmplifyUserAgent } from '@aws-amplify/core'
// import { S3Client, AxiosHttpHandler } from '@aws-sdk/client-s3'

export class s3CustomeEndpointProvider extends AWSS3Provider {
  // static PROVIDER_NAME = 's3CustomeEndpointProvider' // todo: enable if used
  // static providerName = 's3CustomeEndpoint'
  // static category = 'Storage'

  /**
   * @private creates an S3 client with new V3 aws sdk
   */
  _createNewS3Client(config, emitter) {
    const s3client = super._createNewS3Client(config, emitter)

    // s3client.config.endpoint = config.endpoint
    s3client.config.endpoint = {
      protocol: 'https',
      hostname: config.endpoint,
      // path: '',
    }

    s3client.config.tls = false
    s3client.config.bucketEndpoint = false
    s3client.config.forcePathStyle = true

    return s3client
  }
}

// const AWS_EXPORTS = {
//   Storage: {
//     s3CustomeEndpoint: {
//       bucket: '_',
//       region: AWS_REGION,
//       endpoint: import.meta.env.VITE_S3_URL || "/files",
//       customPrefix: {
//         public: '',
//       },
//     },
//   },
// };

// Storage.addPluggable(new s3CustomeEndpointProvider());
// Storage.configure({
//   s3CustomeEndpoint: {
//     bucket: '_',
//     region: AWS_REGION,
//     endpoint: import.meta.env.VITE_S3_URL || "/files",
//     customPrefix: {
//       public: ''
//     },
//     tls: false,
//     bucketEndpoint: false,
//     forcePathStyle: true,
//   },
// })

// async function getFile (fileName, directory = "", download = false) {
//   // return await API.get(S3_API_NAME, `/${directory}${fileName}`)
//   return await Storage.get(`${directory}${fileName}`, {
//     // provider: 's3CustomeEndpointProvider',
//     level: 'public',
//     download,
//   })
// }
