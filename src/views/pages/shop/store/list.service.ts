import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { StoreApi, StoreList } from '@/api/v1/shop/store/store'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class ListService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  info$ = new State({})
  // auth$ = this.authService.authMap$({
  //   // 记得设置鉴权
  //   add: 'brand:activity:group_buy|add'
  // })
  // brand$ = this.userService.brand$  需要
  constructor(private storeApi: StoreApi) {}
  @Effect()
  getList(params: StoreList) {
    return this.storeApi.getList(params).pipe(
      tap((res: any) => {
        console.log(res)
        // res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  delproduct(id: number) {
    return this.storeApi.delProduct(id).pipe(tap((res: any) => {}))
  }
  onShelf(id: number) {
    return this.storeApi.onShelf(id).pipe(tap((res: any) => {}))
  }
  // getSharePosterInfo(params: { id: number }) {
  //   return this.storeApi.getPosterInfo(params).pipe(
  //     tap((res: any) => {
  //       this.info$.commit(() => res.info)
  //     })
  //   )
  // }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
