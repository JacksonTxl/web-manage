import { ShopApi } from '@/api/v1/shop'
import { Injectable } from 'vue-service-app'
import { then } from '@/operators'
import { Observable } from 'rxjs'
import { Effect, State } from 'rx-state'

@Injectable()
export class LlfService {
  loading$ = new State({})
  constructor(private shopApi: ShopApi) {}
  @Effect()
  init() {
    return this.shopApi.getShopList().pipe(
      then(() => {
        throw new Error('haha')
      }),
      then(() => {
        console.log('here')
      })
    )
  }
  beforeEach(to: any, from: any) {
    return this.init()
  }
}
