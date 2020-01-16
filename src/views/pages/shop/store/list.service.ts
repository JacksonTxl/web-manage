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
  shelvesStatus$ = this.userService.getOptions$('cloud_store.shelves_status', {
    addAll: true
  })
  auth$ = this.authService.authMap$({
    // 记得设置鉴权
    add: 'shop:cloud_store:goods|add'
  })
  constructor(
    private storeApi: StoreApi,
    private userService: UserService,
    private authService: AuthService
  ) {}
  @Effect()
  getList(params: StoreList) {
    return this.storeApi.getList(params).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  @Effect()
  getGoodsCategory() {
    return this.storeApi.getCategory().pipe(
      tap((res: any) => {
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
  init(params: any) {
    return forkJoin(this.getList(params), this.getGoodsCategory())
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
