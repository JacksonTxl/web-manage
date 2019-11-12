import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { NoticeApi, PutNoticeParams } from '@/api/v1/setting/sms/notice'
@Injectable()
export class NoticeService {
  list$ = new State([])
  authTabs$ = this.authService.getAuthTabs$('brand-setting-sms-notice')
  constructor(private NoticeApi: NoticeApi, private authService: AuthService) {}
  getNoticeList() {
    return this.NoticeApi.getNoticeList().pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
      })
    )
  }
  putNotice(params: PutNoticeParams) {
    return this.NoticeApi.putNotice(params).pipe(tap((res: any) => {}))
  }
}
