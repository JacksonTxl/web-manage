import { Injectable } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state/src'
import { Store } from '@/services/store'
import { tap, pluck } from 'rxjs/operators'
import {
  CabinetAreaApi,
  AddInput,
  UpdateInput
} from '@/api/v1/setting/cabinet/area'

interface SetState {
  list: object[]
}
@Injectable()
export class CabinetAreaService extends Store<SetState> {
  state$: State<SetState>
  list$: Computed<object[]>
  constructor(private areaApi: CabinetAreaApi) {
    super()
    this.state$ = new State({
      list: []
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
  }
  @Effect()
  add(params: AddInput) {
    return this.areaApi.add(params)
  }
  del(id: number) {
    return this.areaApi.del(id)
  }
  update(params: UpdateInput) {
    return this.areaApi.update(params)
  }
  getList() {
    return this.areaApi.getList().pipe(
      tap(res => {
        this.state$.commit(state => {
          state.list = res.list
        })
      })
    )
  }
}
