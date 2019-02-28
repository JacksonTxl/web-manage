import { sendSmsCaptcha, SendSmsCaptchaInput } from '@/api/user'

class LoginService {
  sendSmsCaptcha(data: SendSmsCaptchaInput) {
    return sendSmsCaptcha(data).pipe()
  }
}

export const loginService = new LoginService()
