import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { FrontApi, GetEntranceListInput } from '@/api/v1/front'
import { tap } from 'rxjs/operators'
import { UserService } from '@/services/user.service'

@Injectable()
export class LogService implements Controller {
  loading$ = new State({})
  list$ = new State([])
  page$ = new State({})
  entryTypeList$ = this.userService.getOptions$('front.entry_stat_type', {
    addAll: true
  })

  constructor(private userService: UserService, private frontApi: FrontApi) {}
  @Effect()
  getList(query: GetEntranceListInput) {
    return this.frontApi.getEntranceLogList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
