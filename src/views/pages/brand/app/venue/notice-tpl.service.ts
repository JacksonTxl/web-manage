import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import {
  NoticeApi,
  PutNoticeParams,
  NoticeQuery
} from '@/api/v1/setting/sms/notice'
@Injectable()
export class NoticeTplService {
  list$ = new State([])
  authTabs$ = this.authService.getAuthTabs$('brand-setting-sms-notice')
  constructor(private NoticeApi: NoticeApi, private authService: AuthService) {}
  getNoticeList(query: NoticeQuery) {
    return this.NoticeApi.getNoticeList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
      })
    )
  }
  putNotice(params: PutNoticeParams) {
    return this.NoticeApi.putNotice(params).pipe(tap((res: any) => {}))
  }
}
