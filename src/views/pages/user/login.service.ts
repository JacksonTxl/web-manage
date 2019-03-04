import { sendSmsCaptcha, SendSmsCaptchaInput } from '@/api/user'
import { getCaptchaPhone, CaptchaPhoneInput } from '@/api/captcha'
import { State } from 'rx-state'
import { signIn, SignInAccountInput } from '@/api/login/account'
class LoginService {
  captcha$ = new State<string>('')
  sendSmsCaptcha(data: SendSmsCaptchaInput) {
    return sendSmsCaptcha(data).pipe()
  }

  getCaptchaPhone(query: CaptchaPhoneInput) {
    return getCaptchaPhone(query)
  }
  signIn(data: SignInAccountInput) {
    return signIn(data)
  }
}

export const loginService = new LoginService()
