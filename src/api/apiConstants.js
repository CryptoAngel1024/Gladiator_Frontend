const CONSTANTS = {
  dev: {
    VITE_API_ENDPOINT: '',
    VITE_S3_BUCKET: '',
    VITE_GA_ENDPOINT: '',
  },
  staging: {
    VITE_API_ENDPOINT: '',
    VITE_S3_BUCKET: '',
    VITE_GA_ENDPOINT: '',
  },
}

export default function apiConstants(stage = 'staging') {
  return CONSTANTS[stage] || CONSTANTS.staging
}
