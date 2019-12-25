import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { IconUrlApi } from '@/api/v1/brand/getIconList'

@Injectable()
export class FastEntryService {
  iconList$ = new State([])
  loading$ = new State({})
  constructor(private iconUrlApi: IconUrlApi) {}
  @Effect()
  getList() {
    return this.iconUrlApi.getIconList().pipe(
      tap(res => {
        this.iconList$.commit(() => res.list)
      })
    )
  }
}
