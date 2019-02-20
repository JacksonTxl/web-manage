import { Route } from 'vue-router'
import {
  sendSmsCaptcha,
  signIn,
  SendSmsCaptchaInput,
  SignInInput
} from '@/api/user'
import { tap } from 'rxjs/operators'
import { authService } from '@/services/auth.service'
export class LoginService {
  namespace = 'LoginService'
  beforeRouteEnter(to: Route, from: Route, next: any) {
    next()
  }
  sendSmsCaptcha(data: SendSmsCaptchaInput) {
    return sendSmsCaptcha(data)
  }
  signIn(data: SignInInput) {
    return signIn(data).pipe(
      tap(({ token }) => {
        authService.setAuthToken(token)
        location.href = '/'
      })
    )
  }
}

export const loginService = new LoginService()
