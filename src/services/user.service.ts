import { State, withNamespace } from '@/utils/rx-state'
import { getCurrentUserInfo, SignInInput, signIn } from '@/api/user'
import { tap } from 'rxjs/operators'
import { StRoute, StRouteGuard } from '@/types'
import { authService } from './auth.service'
const t = withNamespace('user')

interface User {
  id: string
  name: string
}

export class UserServie implements StRouteGuard {
  user$ = new State<User>({}, t('user'))
  menu$ = new State<any[]>([], t('menu'))
  role$ = new State<object>({}, t('role'))

  beforeRouteEnter(to: StRoute, from: StRoute, next: any) {
    if (!this.user$.state.id) {
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
