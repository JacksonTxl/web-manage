import { Injectable } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { tap, pluck } from 'rxjs/operators'
import {
  CabinetAreaApi,
  AddInput,
  UpdateInput,
  SortInput
} from '@/api/v1/setting/cabinet/area'

@Injectable()
export class CabinetAreaService {
  loading$ = new State({})
  state$: State<any>
  list$: Computed<object[]>
  constructor(private areaApi: CabinetAreaApi) {
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
  sort(params: SortInput) {
    return this.areaApi.sort(params)
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
