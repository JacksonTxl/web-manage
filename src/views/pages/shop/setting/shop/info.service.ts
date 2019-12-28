import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state/src'
import { ShopApi } from '@/api/v1/shop'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class InfoService implements Controller {
  info$ = new State({})
  serviceList$ = new State([])
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    edit: 'shop:shop:shop|edit'
  })
  constructor(private shopApi: ShopApi, private authService: AuthService) {}
  getInfo() {
    return this.shopApi.getShopSettingInfo().pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  getServiceList() {
    return this.shopApi.getServiceList().pipe(
      tap((res: any) => {
        this.serviceList$.commit(() => res.services)
      })
    )
  }
  init() {
    return forkJoin(this.getInfo(), this.getServiceList())
  }
  beforeEach() {
    return this.init()
  }
}
