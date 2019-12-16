import { Injectable } from 'vue-service-app'
import { SendParams, OrderApi } from '@/api/v1/shop/store/order'
import { tap } from 'rxjs/operators'

@Injectable()
export class DeliverGoodService {
  constructor(private OrderApi: OrderApi) {}
  sendOption(params: SendParams) {
    return this.OrderApi.sendAction(params).pipe(tap((res: any) => {}))
  }
}
