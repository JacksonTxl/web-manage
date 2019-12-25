import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import {
  CabinetAreaApi,
  AddInput,
  UpdateInput,
  SortInput
} from '@/api/v1/setting/cabinet/area'

@Injectable()
export class CabinetAreaService {
  loading$ = new State({})
  list$ = new State([])
  constructor(private areaApi: CabinetAreaApi) {}
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
        this.list$.commit(() => res.list)
      })
    )
  }
}
