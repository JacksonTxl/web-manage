import { http } from '@/services/http.service'
import { ajaxRetry } from '@/operators/ajax-retry'
import { timeout } from 'rxjs/operators'

export interface SendSmsCaptchaInput {
  mobile: string
}

export const sendSmsCaptcha = (data: SendSmsCaptchaInput) =>
  http.post('/user/send-sms-captcha', { params: data }).pipe(ajaxRetry(3, 200))

export interface SignInInput {
  mobile: string
  password: string
}

export const signIn = (data: SignInInput) =>
  http.post('/user/signin', { params: data })

export const getCurrentUserInfo = () =>
  http
    .post('/user/current')
    .pipe(timeout(2000))
    .pipe(ajaxRetry(3, 200))
