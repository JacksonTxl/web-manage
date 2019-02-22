import { useState } from '@/utils/rx-hooks'
import { Route } from 'vue-router'
import { getCurrentUserInfo, SignInInput, signIn } from '@/api/user'
import { tap } from 'rxjs/operators'
import { BeforeRouteEnter } from '@/types'
import { authService } from './auth.service'

export class UserServie implements BeforeRouteEnter {
  namespace = 'UserService'
  user = useState({}, `${this.namespace}/user`)
  menu = useState([], `${this.namespace}/menu`)
  role = useState({}, `${this.namespace}/role`)
  beforeRouteEnter(to: Route, from: Route, next: any) {
    console.log('userGuard')
    this.user.subscribe((user: any) => {
      if (!user.id) {
        this.getCurrentUserInfo().subscribe(() => {
          return next()
        })
      } else {
        return next()
      }
    })
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
        this.user.commit(() => res.user_info)
        this.role.commit(() => res.role_list[0])
        this.menu.commit(() => res.menu_list)
      })
    )
  }
}

export const userService = new UserServie()
