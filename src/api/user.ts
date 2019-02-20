import { http } from '@/services/http.service'
import { ajaxRetry } from '@/operators/ajax-retry'

export interface SendSmsCaptchaInput {
  mobile: string
}
export const sendSmsCaptcha = (data: SendSmsCaptchaInput) =>
  http.post('/user/send-sms-captcha', data).pipe(ajaxRetry(3, 200))

export interface SignInInput {
  mobile: string
  password: string
}

export const signIn = (data: SignInInput) => http.post('/user/signin', data)

export const getCurrentUserInfo = () => http.get('/user/current')
