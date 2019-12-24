import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { AddParams, EditParams, StoreApi } from '@/api/v1/shop/store/store'
@Injectable()
export class AddService implements Controller {
  loading$ = new State({})
  list$ = new State({})
  constructor(private storeApi: StoreApi) {}
  @Effect()
  addGoods(params: AddParams) {
    return this.storeApi.addGoods(params).pipe(tap((res: any) => {}))
  }
  @Effect()
  editGoods(id: number, params: EditParams) {
    return this.storeApi.editGoods(id, params).pipe(tap((res: any) => {}))
  }
  @Effect()
  getList() {
    return this.storeApi.categoryList().pipe(
      tap((res: any) => {
        console.log('请求了分类', res)
        this.list$.commit(() => res.list)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute) {
    return this.getList()
  }
}
