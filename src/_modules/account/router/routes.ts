import Account from '@/_modules/account/views/pages/account.vue'
import Login from '@/_modules/account/views/pages/account/login.vue'
import { LoginService } from '@/_modules/account/views/pages/account/login.service'
import Agreement from '@/_modules/account/views/pages/account/agreement.vue'

import { NProgressService } from '@/services/nprogress.service'
import { HotReleaseService } from '@/services/hot-release.service'
import { TrackService } from '@/services/track.service'
import { TitleService } from '@/services/title.service'
import { RouteService } from '@/services/route.service'

export default [
  {
    component: Account,
    path: '/account',
    guards: [
      NProgressService,
      HotReleaseService,
      TrackService,
      TitleService,
      RouteService
    ],
    children: [
      {
        name: 'account-login',
        path: 'login',
        component: Login,
        guards: [LoginService],
        meta: {
          title: '登录'
        }
      },
      {
        name: 'account-agreement',
        path: 'agreement',
        component: Agreement,
        meta: {
          title: '三体云服务协议'
        }
      }
    ]
  }
]
