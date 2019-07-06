import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { LabelApi, ListParams } from '@/api/v1/label'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class ListService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  auth$ = new State({
    add: this.authService.can('shop:member:tag|add')
  })
  constructor(private labelApi: LabelApi, private authService: AuthService) {}

  getListInfo(params: ListParams) {
    return this.labelApi.getLabelList(params).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }

  deleteLabel(id: number) {
    return this.labelApi.deleteLabel(id)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getListInfo(to.meta.query)
  }
}
