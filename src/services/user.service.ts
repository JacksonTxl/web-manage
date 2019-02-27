import { withNamespace, getState, State } from '@/utils/rx-state'
import { getCurrentUserInfo, SignInInput, signIn } from '@/api/user'
import { tap } from 'rxjs/operators'
import { authService } from './auth.service'
import { ServiceRoute, Service } from 'vue-service-app'
const ns = withNamespace('user')

interface User {
  id: string
  name: string
}

export class UserServie extends Service {
  user$ = new State<User>({}, ns('user'))
  menu$ = new State<string[]>([], ns('menu'))
  role$ = new State<object>({}, ns('role'))

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('user service here')
    if (!getState(this.user$).id) {
      this.getCurrentUserInfo().subscribe(() => {
        next()
      })
    } else {
      next()
    }
  }
  signIn(input: SignInInput) {
    return signIn(input).pipe(
      tap(res => {
        const token: string = res.token
        authService.setAuthToken(token)
        location.href = '/'
      })
    )
  }
  getCurrentUserInfo() {
    return getCurrentUserInfo().pipe(
      tap(res => {
        this.user$.commit(() => res.user_info)
        this.role$.commit(() => res.role_list[0])
        this.menu$.commit(() => res.menu_list)
      })
    )
  }
}

export const userService = new UserServie()
