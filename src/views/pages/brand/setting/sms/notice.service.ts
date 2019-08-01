import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { RedirectService } from '@/services/redirect.service'
import { NoticeApi, PutNoticeParams } from '@/api/v1/setting/sms/notice'
interface SetState {}
@Injectable()
export class NoticeService extends Store<SetState> {
  list$ = new State([])
  authTabs$ = this.redirectService.getAuthTabs$('brand-setting-sms-notice')
  constructor(
    private NoticeApi: NoticeApi,
    private redirectService: RedirectService
  ) {
    super()
  }
  getNoticeList() {
    return this.NoticeApi.getNoticeList().pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
      })
    )
  }
  putNotice(params:PutNoticeParams) {
    return this.NoticeApi.putNotice(params).pipe(tap((res: any) => {}))
  }
}
