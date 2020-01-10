import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { WarehouseParams, StockApi } from '@/api/v1/shop/store/stock'
@Injectable()
export class PutInService {
  loading$ = new State({})
  constructor(private stockApi: StockApi) {}
  @Effect()
  stockWarehouse(params: WarehouseParams) {
    return this.stockApi.stockWarehouse(params)
  }
  @Effect()
  stockOutbound(params: WarehouseParams) {
    return this.stockApi.stockOutbound(params)
  }
}
