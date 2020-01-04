import { WsNotifyService } from '../../layouts/default#/ws-notify.service'
import { State } from 'rx-state'
import { NotifyApi } from '@/api/v1/notify'
import { Injectable } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
import { tap } from 'rxjs/operators'
@Injectable()
export class NotifyService {
  authTabs$ = new State([]) // this.authService.getAuthTabs$('common-notify')
  info$ = new State({})
  constructor(
    private authService: AuthService,
    private api: NotifyApi,
    private wsNotifyService: WsNotifyService
  ) {}
  getNoticePcUnread() {
    return this.api.getNoticePcUnread().pipe(
      tap(res => {
        this.info$.commit(() => res.info)
        const authTabs = [
          {
            label: '通知列表',
            route: { name: 'common-notify-inform' },
            isBadge: !!res.info.notice
          },
          {
            label: '公告列表',
            route: { name: 'common-notify-notice' },
            isBadge: !!res.info.announcement
          }
        ]
        this.wsNotifyService.notReadNum$.commit(() => res.info.total)
        console.log(
          'this.wsNotifyService.notReadNum$',
          this.wsNotifyService.notReadNum$.value
        )
        console.log('res.total', res.total)
        this.authTabs$.commit(() => authTabs)
      })
    )
  }
}
