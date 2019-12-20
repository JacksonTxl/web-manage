import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { AddParams, EditParams, StoreApi } from '@/api/v1/shop/store/store'
@Injectable()
export class AddService {
  loading$ = new State({})
  constructor(private StoreApi: StoreApi) {}
  @Effect()
  addGoods(params: AddParams) {
    return this.StoreApi.addGoods(params).pipe(tap((res: any) => {}))
  }
  @Effect()
  editGoods(id: number, params: EditParams) {
    return this.StoreApi.editGoods(id, params).pipe(tap((res: any) => {}))
  }
}
