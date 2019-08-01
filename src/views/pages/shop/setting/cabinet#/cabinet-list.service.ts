import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { tap, pluck } from 'rxjs/operators'
import { State, Computed, Effect } from 'rx-state'
import { Store } from '@/services/store'
import { TemporaryCabinetApi } from '@/api/v1/setting/cabinet/temporary'
import { LongTermCabinetApi } from '@/api/v1/setting/cabinet/long-term'
import { AuthService } from '@/services/auth.service'

interface SetState {
  resData: {}
}
@Injectable()
export class CabinetListService extends Store<SetState> {
  state$: State<SetState>
  resData$: Computed<object>
  auth$ = this.authService.authMap$({
    edit: 'shop:cabinet:cabinet|edit'
  })
  constructor(
    private temporaryCabinetApi: TemporaryCabinetApi,
    private longTermCabinetApi: LongTermCabinetApi,
    private authService: AuthService
  ) {
    super()
    this.state$ = new State({
      resData: {}
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
  }
  getList(type: string, id: number) {
    const cabinetApi = type === 'long-term' ? this.longTermCabinetApi : this.temporaryCabinetApi
    return cabinetApi.getList(id).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.resData = res
        })
      })
    )
  }
}
