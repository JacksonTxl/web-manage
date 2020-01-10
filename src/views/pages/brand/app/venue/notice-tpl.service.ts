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
  auth$ = this.authService.authMap$({
    edit: 'brand:application:venues_reserve|template_edit',
    sms: 'brand:application:venues_reserve|sms_send',
    mina: 'brand:application:venues_reserve|mina_send',
    app: 'brand:application:venues_reserve|app_send'
  })
  constructor(private NoticeApi: NoticeApi, private authService: AuthService) {}
  getNoticeList(query: NoticeQuery) {
    return this.NoticeApi.getNoticeList('venues', query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
      })
    )
  }
  putNotice(params: PutNoticeParams) {
    return this.NoticeApi.putNotice('venues', params).pipe(
      tap((res: any) => {})
    )
  }
}
