import { handleLogin } from '../../authorization/authorization.utils'

import './login-prompt.styles.scss'

const LoginPrompt = () => {

  return (
    <div>
      <h1>Log in</h1>
      <div
        className='login'
        onClick={handleLogin}
      >
        Click Here
      </div>
    </div>
  )
}



export default LoginPrompt