import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import {
  StatApi,
  OrderShopListQuery,
  SellStaffListQuery
} from '@/api/v1/stat/shop'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class SummaryService {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  total$ = new State({})
  auth$ = this.authService.authMap$({
    export: 'shop:stat:saler_reports|export_summary'
  })
  constructor(private StatApi: StatApi, private authService: AuthService) {}
  @Effect()
  getSellList(query: OrderShopListQuery) {
    return this.StatApi.getSellList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
        this.total$.commit(() => res.total)
      })
    )
  }
  @Effect()
  init(query: any) {
    return forkJoin(this.getSellList(query))
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
