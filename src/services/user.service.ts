import { useState } from '@/utils/rx-hooks'
import { Route } from 'vue-router'
import { getCurrentUserInfo } from '@/api/user'
import { forkJoin } from 'rxjs'
import { tap } from 'rxjs/operators'
import { BeforeRouteEnter } from '@/types'

export class UserServie implements BeforeRouteEnter {
  namespace = 'UserService'
  user = useState({}, `${this.namespace}/user`)
  menu = useState([], `${this.namespace}/menu`)
  role = useState({}, `${this.namespace}/role`)
  beforeRouteEnter(to: Route, from: Route, next: any) {
    this.initData().subscribe(() => {
      next()
    })
  }
  initData() {
    return forkJoin(this.getCurrentUserInfo())
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
