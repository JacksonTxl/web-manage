import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { ShopStatusApi, UpdateInput } from '@/api/v1/shop/status'
import { UserService } from '@/services/user.service'

interface SetState {}
@Injectable()
export class ShopStatusService extends Store<SetState> {
  /**
   * 获取枚举值
   */
  shopStatusList$ = this.userService.getOptions$('shop.shop_status_switch')
  isValidList$ = this.userService.getOptions$('shop.is_valid')
  constructor(
    private shopStatusApi: ShopStatusApi,
    private userService: UserService
  ) {
    super()
  }
  @Effect()
  update(params: UpdateInput) {
    return this.shopStatusApi.update(params)
  }
}
