import { useState } from '@/utils/rx-hooks'
import { getCurrentUserInfo, SignInInput, signIn } from '@/api/user'
import { tap } from 'rxjs/operators'
import { BeforeRouteEnter, StRoute } from '@/types'
import { authService } from './auth.service'
interface User {
  id: string
  name: string
}

export class UserServie implements BeforeRouteEnter {
  namespace = 'UserService'
  user$ = useState<User>({}, `${this.namespace}/user`)
  menu$ = useState([], `${this.namespace}/menu`)
  role$ = useState({}, `${this.namespace}/role`)
  beforeRouteEnter(to: StRoute, from: StRoute, next: any) {
    if (!this.user$.snapshot.id) {
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
