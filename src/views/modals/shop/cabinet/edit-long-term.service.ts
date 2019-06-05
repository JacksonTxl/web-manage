import { Injectable } from 'vue-service-app'
import { Store } from '@/services/store'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import {
  LongTermCabinetApi,
  UpdateInput
} from '@/api/v1/setting/cabinet/long-term'

interface EditState {
  resData: Object
}
@Injectable()
export class EditLongTermService extends Store<EditState> {
  state$: State<EditState>
  resData$: Computed<Object>
  constructor(private cabinetAPi: LongTermCabinetApi) {
    super()
    this.state$ = new State({
      resData: {}
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
  }
  getUpdateInfo(id: number) {
    return this.cabinetAPi.getUpdateInfo(id).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.resData = res
        })
      })
    )
  }
  @Effect()
  update(params: UpdateInput) {
    return this.cabinetAPi.update(params)
  }
}