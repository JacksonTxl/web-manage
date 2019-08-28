import Login from '@/_modules/account/views/pages/account/login.vue'
import { LoginService } from '@/_modules/account/views/pages/account/login.service'
import Agreement from '@/_modules/account/views/pages/account/agreement.vue'

import { NProgressService } from '@/services/nprogress.service'
import { HotReleaseService } from '@/services/hot-release.service'
import { TrackService } from '@/services/track.service'
import { TitleService } from '@/services/title.service'
import { RouteService } from '@/services/route.service'

const accountGuards = [
  NProgressService,
  HotReleaseService,
  TrackService,
  TitleService,
  RouteService
]

export default [
  {
    name: 'account-login',
    path: '/account/login',
    component: Login,
    guards: [...accountGuards, LoginService],
    meta: {
      title: '登录'
    }
  },
  {
    name: 'account-agreement',
    path: '/account/agreement',
    guards: [...accountGuards],
    component: Agreement,
    meta: {
      title: '三体云服务协议'
    }
  }
]
