import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CategoryQuery, StoreApi } from '@/api/v1/shop/store/store'
@Injectable()
export class ClassManageService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  constructor(private stockApi: StoreApi) {}
  @Effect()
  getList(query: CategoryQuery) {
    return this.stockApi.categoryList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  @Effect()
  addClass(params: { category_name: string }) {
    return this.stockApi.addCategory(params).pipe(tap(() => {}))
  }
  @Effect()
  editClass(id: number, params: { category_name: string }) {
    return this.stockApi.editCategory(id, params).pipe(tap(() => {}))
  }
  @Effect()
  delClass(id: number) {
    return this.stockApi.delCategory(id).pipe(tap(() => {}))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    // return this.getList(to.meta.query)
  }
}
