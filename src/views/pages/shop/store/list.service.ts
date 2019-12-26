import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { StoreApi, StoreList, ShelvesStatus } from '@/api/v1/shop/store/store'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { forkJoin } from 'rxjs'
import { UserService } from '@/services/user.service'

@Injectable()
export class ListService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  info$ = new State({})
  goodsList$ = new State({})
  // useStatus$ = this.userService.getOptions$('cloud_store.use_status', {
  //   addAll: true
  // })
  // auth$ = this.authService.authMap$({
  //   // 记得设置鉴权
  //   add: 'brand:activity:group_buy|add'
  // })
  // brand$ = this.userService.brand$  需要

  constructor(private storeApi: StoreApi, private userService: UserService) {}
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
  @Effect()
  getGoodsCategory() {
    return this.storeApi.getCategory().pipe(
      tap((res: any) => {
        console.log(res)
        this.goodsList$.commit(() => res.list)
      })
    )
  }
  delproduct(id: number) {
    return this.storeApi.delProduct(id).pipe(tap((res: any) => {}))
  }
  onShelf(id: number, params: ShelvesStatus) {
    console.log(id, params)
    return this.storeApi.onShelf(id, params).pipe(tap((res: any) => {}))
  }
  // getSharePosterInfo(params: { id: number }) {
  //   return this.storeApi.getPosterInfo(params).pipe(
  //     tap((res: any) => {
  //       this.info$.commit(() => res.info)
  //     })
  //   )
  // }
  init(params: any) {
    console.log(this.userService)
    return forkJoin(this.getList(params), this.getGoodsCategory())
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
