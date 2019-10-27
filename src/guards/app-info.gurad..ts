import { UserService } from '@/services/user.service'
import { AuthService } from '@/services/auth.service'
import { RegionService } from '@/services/region.service'
import { NProgressService } from '@/services/nprogress.service'
import { UdeskService } from '@/services/udesk.service'
import { forkJoin } from 'rxjs'
import { Injectable } from 'vue-service-app'
import { anyAll, then } from '@/operators'

/**
 * 获取全局应用信息
 */
@Injectable()
export class AppInfoGuard {
  firstBootstrap = true
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private regionService: RegionService,
    private udeskService: UdeskService,
    private nprogressService: NProgressService
  ) {}
  /**
   *  单点故障接口
   */
  private fetchSinlePointReqs() {
    return forkJoin(
      // staff info 包含了 品牌信息 门店信息 用户信息
      this.userService.fetchStaffInfo(),
      // 获取全局权限列表数据
      this.authService.fetchList(),
      // 获取全局菜单数据
      this.userService.fetchMenuData(),
      // 获取全局枚举
      this.userService.fetchEnums(),
      // 获取全局城市数据
      this.regionService.fetchRegions(),
      // 获取全局切换门店列表数据
      this.userService.fetchShopList()
    ).pipe(
      then(() => {
        this.nprogressService.SET_TEXT('核心数据加载完毕')
      })
    )
  }
  /**
   * 可故障接口
   */
  private fetchOptionalReqs() {
    return anyAll(
      // 获取无效的tooltips列表
      this.userService.fetchInvalidTooltips(),
      // 获取九宫格的小程序码url
      this.userService.fetchCodeUrl(),
      // 获取udesk 校验参数
      this.udeskService.fetchUdeskCustomerInfo()
    ).pipe(
      then(() => {
        this.nprogressService.SET_TEXT('全部数据加载完毕')
      })
    )
  }
  private fetchAppReqs() {
    return forkJoin(this.fetchSinlePointReqs(), this.fetchOptionalReqs()).pipe(
      then(() => {
        this.firstBootstrap = false
      })
    )
  }
  beforeRouteEnter() {
    if (this.firstBootstrap) {
      return this.fetchAppReqs()
    }
  }
}
