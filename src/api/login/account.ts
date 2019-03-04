import { http } from '@/services/http.service'
import { ajaxRetry } from '@/operators/ajax-retry'
import { timeout } from 'rxjs/operators'

export interface SignInAccountInput {
  name: string
  password: string
}

export const signIn = (data: SignInAccountInput) => {
  return http.post('/login/account', { params: data, mock: {} })
}

export const getCurrentUserInfo = () =>
  http
    .post('/user/current')
    .pipe(timeout(2000))
    .pipe(ajaxRetry(3, 200))
