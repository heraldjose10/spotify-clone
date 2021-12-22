import { AUTH_ENDPOINT } from '../endpoints'
import CLIENT_ID from '../env/client'

export const handleLogin = () => {
  const URL = AUTH_ENDPOINT + 'authorize'
  const RESPONSE_TYPE = 'token'
  const REDIRECT_URI = 'http://localhost:3000/dash'
  const SCOPES = [
    'user-read-recently-played',
    'playlist-read-private',
    'user-library-read',
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-library-modify'
  ]

  const REDIRECT = `${URL}?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&scope=${SCOPES.join('+')}&redirect_uri=${REDIRECT_URI}`
  window.location = REDIRECT
}

/*
Access Token returned
---------------------
#access_token=BQC5xwLeb5rNwax7G97619_KgZEA1-wshgfs hjka-ajhfbakjhfakgbfHAHhlafhlAlHFlhafHLfail
&token_type=Bearer
&expires_in=3600
*/
export const getAccessTokenFromURL = (hash) => {
  const url_params = hash.substring(1).split('&') // list of access_token,token_type & expires_in
  const access_token = url_params[0].split('=')[1]
  return access_token
}

