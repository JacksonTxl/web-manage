import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { SmsApi, SmsListQuery } from '@/api/v1/setting/sms/sms'
interface SetState {}
@Injectable()
export class ListService extends Store<SetState> {
  state$: State<SetState>
  list$ = new State([])
  page$ = new State([])
  constructor(private SmsApi: SmsApi) {
    super()
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
  beforeEach(to:ServiceRoute, from:ServiceRoute, next: any) {
    next()
  }
}
