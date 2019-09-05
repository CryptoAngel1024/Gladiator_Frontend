const { origin } = window.location
const isLocalHost = origin.includes('localhost')

const dev = {
  issuer_uri: 'https://fedlogin.jnj.com',
  authorization_endpoint: 'https://fedlogin.jnj.com/as/authorization.oauth2',
  token_endpoint: 'https://fedlogin.jnj.com/as/token.oauth2',
  revocation_endpoint: 'https://fedlogin.jnj.com/as/revoke_token.oauth2',
  userinfo_endpoint: 'https://fedlogin.jnj.com/idp/userinfo.openid',
  userinfo_endpoint_name: 'USERINFO',
  client_id: 'GladiatorWeb_DEV',
  client_secret:
    'GGdhOzktRn3eWkotc55DVnyP7n7AmHnhCRqPF68fcmh5yjKIKZqtHKxABVWodAsQ',
  redirect_uri: isLocalHost ? 'https://localhost' : `${origin}/callback`,
  signed_url_endpoint: '/signedURL',
  signed_url_endpoint_name: 'SIGNEDURLENDPOINT',
  scope: null,
}

const config = dev //process.env.VUE_APP_STAGE === 'production' ? prod : dev

export default {
  // Add common config values here
  ...config,
}
