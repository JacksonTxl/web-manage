import { sendSmsCaptcha, SendSmsCaptchaInput } from '@/api/user'
import { getCaptchaPhone, CaptchaPhoneInput } from '@/api/captcha'
import { State } from 'rx-state/src'
class LoginService {
  captcha$ = new State<string>('')
  sendSmsCaptcha(data: SendSmsCaptchaInput) {
    return sendSmsCaptcha(data).pipe()
  }
  getCaptchaPhone(query: CaptchaPhoneInput) {
    return getCaptchaPhone(query)
  }
}

export const loginService = new LoginService()
