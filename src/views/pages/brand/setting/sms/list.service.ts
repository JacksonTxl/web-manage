import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { SmsApi, SmsListQuery } from '@/api/v1/setting/sms/sms'
import { UserService } from '@/services/user.service'
@Injectable()
export class ListService implements Controller {
  list$ = new State([])
  page$ = new State([])
  loading$ = new State({})
  notifyType$ = this.userService.getOptions$('setting.notify_type')
  sendStatus$ = this.userService.getOptions$('setting.send_status')

  constructor(private SmsApi: SmsApi, private userService: UserService) {}
  @Effect()
  getSmsList(query: SmsListQuery) {
    return this.SmsApi.getSmsList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getSmsList(to.meta.query)
  }
}
