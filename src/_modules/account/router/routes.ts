import Login from '@/_modules/account/views/pages/account/login.vue'
import { LoginService } from '@/_modules/account/views/pages/account/login.service'
import Find from '@/_modules/account/views/pages/account/find.vue'
import { FindService } from '@/_modules/account/views/pages/account/find.service'
import { ProgressGuard } from '@/guards/progress.guard'
import { SyncQueryGuard } from '@/guards/sync-query.guard'
import { TitleGuard } from '@/guards/title.guard'
import { TrackGuard } from '@/guards/track.guard'

const accountGuards: any[] = [
  ProgressGuard,
  TrackGuard,
  SyncQueryGuard,
  TitleGuard
]

export default [
  {
    name: 'account-login',
    path: '/account/login',
    component: Login,
    guards: accountGuards,
    controller: LoginService,
    meta: {
      title: '登录'
    }
  },
  {
    name: 'account-find',
    path: '/account/find',
    component: Find,
    guards: accountGuards,
    controller: FindService,
    meta: {
      title: '找回密码'
    }
  }
]
