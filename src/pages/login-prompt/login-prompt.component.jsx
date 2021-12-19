import { handleLogin } from '../../authorization/authorization.utils'

import './login-prompt.styles.scss'

const LoginPrompt = () => {

  return (
    <div className='login-prompt'>
      <div className='text'>
        <p className='line-one'>
          <span onClick={handleLogin}>Login</span>
          <span>with</span>
        </p>
        <p className='line-two'>Spotify</p>
      </div>
    </div>
  )
}



export default LoginPrompt