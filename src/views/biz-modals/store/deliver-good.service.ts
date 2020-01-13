import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { SendParams, OrderApi } from '@/api/v1/shop/store/order'
import { tap } from 'rxjs/operators'

@Injectable()
export class DeliverGoodService {
  list$ = new State([])
  constructor(private orderApi: OrderApi) {}
  sendOption(params: SendParams) {
    return this.orderApi.sendAction(params)
  }
  getCompanyList(params: { name: string }) {
    return this.orderApi.getLogisticsCompany(params).pipe(
      tap(res => {
        this.list$.commit(() => res.list)
      })
    )
  }
}
