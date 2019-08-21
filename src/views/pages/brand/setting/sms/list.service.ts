import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { SmsApi, SmsListQuery } from '@/api/v1/setting/sms/sms'
import { UserService } from '@/services/user.service'
interface SetState {}
@Injectable()
export class ListService {
  state$: State<SetState>
  list$ = new State([])
  page$ = new State([])
  loading$ = new State({})
  notifyType$ = this.userService.getOptions$('setting.notify_type').pipe()
  sendStatus$ = this.userService.getOptions$('setting.send_status')

  constructor(private SmsApi: SmsApi, private userService: UserService) {
    this.state$ = new State({})
  }
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
