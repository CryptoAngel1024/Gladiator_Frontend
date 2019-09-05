const CONSTANTS = {
  dev: {
    VITE_API_ENDPOINT: 'https://dev-gladiator.jnj.com/',
    VITE_S3_BUCKET: 'dev-gladiator-assets',
    VITE_GA_ENDPOINT: 'https://dev-gladiator.jnj.com/',
  },
  staging: {
    VITE_API_ENDPOINT: 'https://staging-gladiator.jnj.com/',
    VITE_S3_BUCKET: 'staging-gladiator-assets',
    VITE_GA_ENDPOINT: 'https://staging-gladiator.jnj.com/',
  },
}

export default function apiConstants(stage = 'staging') {
  return CONSTANTS[stage] || CONSTANTS.staging
}
