import { withNamespace, getState, State } from 'rx-state'
import { tap, finalize } from 'rxjs/operators'
import { authService } from './auth.service'
import { ServiceRoute, RouteGuard } from 'vue-service-app'
import { LoginAccountInput, loginAccount } from '@/api/login'
import router from '@/router'
const ns = withNamespace('user')

interface User {
  id: string
  name: string
}

export class UserServie implements RouteGuard {
  user$ = new State<User>({}, ns('user'))
  menu$ = new State<string[]>([], ns('menu'))
  role$ = new State<object>({}, ns('role'))
  loginAccountLoading$ = new State<boolean>(false, ns('loginAccountLoading'))

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    // if (!getState(this.user$).id) {
    //   this.getCurrentUserInfo().subscribe(() => {
    //     next()
    //   })
    // } else {
    next()
    // }
  }
  loginAccount(input: LoginAccountInput) {
    this.loginAccountLoading$.commit(() => true)
    return loginAccount(input).pipe(
      tap(res => {
        this.loginAccountLoading$.commit(() => false)
        const token: string = res.token
        authService.setAuthToken(token)
        router.push('/')
      }),
      finalize(() => {
        this.loginAccountLoading$.commit(() => false)
      })
    )
  }
  // getCurrentUserInfo() {
  //   return getCurrentUserInfo().pipe(
  //     tap(res => {
  //       this.user$.commit(() => res.user_info)
  //       this.role$.commit(() => res.role_list[0])
  //       this.menu$.commit(() => res.menu_list)
  //     })
  //   )
  // }
}

export const userService = new UserServie()
