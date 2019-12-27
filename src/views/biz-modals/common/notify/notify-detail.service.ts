import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { NotifyApi } from '@/api/v1/notify'
import { tap } from 'rxjs/operators'
import { MessageService } from '@/services/message.service'

@Injectable()
export class NotifyDetailService {
  notifyTypes$ = new State({})
  loading$ = new State({})
  constructor(private api: NotifyApi, private msg: MessageService) {}
  updateNoticeSetting(params: any) {
    const form = { setting: params }
    return this.api.updateNoticeSetting(form).pipe(
      tap(() => {
        this.msg.success({ content: '设置成功' })
      })
    )
  }
  getNoticeSettingInfo() {
    return this.api.getNoticeSettingInfo().pipe(
      tap((res: any) => {
        this.notifyTypes$.commit(() => res.list)
      })
    )
  }
}
