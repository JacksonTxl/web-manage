import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, log } from 'rx-state'
import { tap, pluck, map } from 'rxjs/operators'
import { Store } from './store'
import { forkJoin, of } from 'rxjs'
import { ConstApi } from '@/api/const'
import { MenuApi } from '@/api/v1/common/menu'

interface UserState {
  user: User
  brand: {}
  shop: {}
  menuData: {}
  enums: {}
}
interface User {
  id: string
  name: string
}
interface Shop {
  id?: string
  name?: string
}
interface ModuleEnums {
  [enumName: string]: {
    description: string
    value: {
      [key: string]: string
    }
  }
}
/**
 * 用户的全局初始信息
 */

@Injectable()
export class UserService extends Store<UserState> {
  state$: State<UserState>
  user$: Computed<User>
  brand$: Computed<object>
  shop$: Computed<object>
  menuData$: Computed<object>
  enums$: Computed<any>
  staffEnums$: Computed<ModuleEnums>
  accountEnums$: Computed<ModuleEnums>
  depositeCardEnums$: Computed<ModuleEnums>
  memberEnums$: Computed<ModuleEnums>
  memberCardEnums$: Computed<ModuleEnums>
  personalCourseEnums$: Computed<ModuleEnums>
  shopEnums$: Computed<ModuleEnums>
  settingEnums$: Computed<ModuleEnums>
  teamCourseEnums$: Computed<ModuleEnums>
  packageCourseEnums$: Computed<ModuleEnums>
  reserveEnums$: Computed<ModuleEnums>
  shopMemberEnums$: Computed<ModuleEnums>
  finance$: Computed<ModuleEnums>
  crowdEnums$: Computed<ModuleEnums>
  soldEnums$: Computed<ModuleEnums>
  transactionEnums$: Computed<ModuleEnums>
  constructor(
    private constApi: ConstApi,
    private menuApi: MenuApi
  ) {
    super()
    const initialState = {
      user: {},
      menuData: {},
      enums: {},
      brand: {},
      shop: {
        name: '这里是全局数据提供的当前门店的名称'
      }
    }
    this.state$ = new State(initialState)
    this.user$ = new Computed(this.state$.pipe(pluck('user')))
    this.menuData$ = new Computed(this.state$.pipe(pluck('menuData')))
    this.enums$ = new Computed(this.state$.pipe(pluck('enums')))
    this.brand$ = new Computed(this.state$.pipe(pluck('brand')))
    this.shop$ = new Computed(this.state$.pipe(pluck('shop')))

    this.staffEnums$ = new Computed(this.enums$.pipe(pluck('staff')))
    this.accountEnums$ = new Computed(this.enums$.pipe(pluck('account')))
    this.depositeCardEnums$ = new Computed(
      this.enums$.pipe(pluck('deposit_card'))
    )
    this.memberEnums$ = new Computed(this.enums$.pipe(pluck('member')))
    this.memberCardEnums$ = new Computed(this.enums$.pipe(pluck('member_card')))
    this.transactionEnums$ = new Computed(this.enums$.pipe(pluck('transaction')))
    this.personalCourseEnums$ = new Computed(
      this.enums$.pipe(pluck('personal_course'))
    )
    this.shopEnums$ = new Computed(this.enums$.pipe(pluck('shop')))
    this.settingEnums$ = new Computed(this.enums$.pipe(pluck('setting')))
    this.teamCourseEnums$ = new Computed(this.enums$.pipe(pluck('team_course')))
    this.packageCourseEnums$ = new Computed(
      this.enums$.pipe(pluck('package_course'))
    )
    this.reserveEnums$ = new Computed(this.enums$.pipe(pluck('reserve')))
    this.shopMemberEnums$ = new Computed(this.enums$.pipe(pluck('shop_member')))
    this.finance$ = new Computed(this.enums$.pipe(pluck('finance')))
    this.crowdEnums$ = new Computed(this.enums$.pipe(pluck('crowd')))
    this.soldEnums$ = new Computed(this.enums$.pipe(pluck('sold')))
  }
  SET_USER(user: User) {
    this.state$.commit(state => {
      state.user = user
    })
  }
  SET_SHOP(shop: Shop = {}) {
    this.state$.commit(state => {
      state.shop = Object.assign(state.shop, shop)
    })
  }
  getEnums() {
    if (!Object.keys(this.enums$.snapshot()).length) {
      return this.constApi.getEnum().pipe(
        tap(res => {
          this.state$.commit(state => {
            state.enums = res
          })
        })
      )
    } else {
      return of({})
    }
  }
  getMenus(force: boolean = false) {
    if (force || !Object.keys(this.menuData$.snapshot()).length) {
      return this.menuApi.getList().pipe(
        tap(res => {
          this.state$.commit(state => {
            state.menuData = res
          })
        })
      )
    } else {
      return of({})
    }
  }
  init(force: boolean = false) {
    return forkJoin(
      this.getEnums(),
      this.getMenus()
    )
  }
  /**
   * 刷新菜单
   */
  reloadMenus() {
    this.getMenus(true).subscribe()
  }
  reload() {
    this.reloadMenus()
  }
  /**
   * 添加到常用菜单
   * @param id
   */
  addFavorite(id: number) {
    return this.menuApi.addFavorite(id)
  }
  /**
   * 删除常用菜单
   * @param id
   */
  delFavorite(id: number) {
    return this.menuApi.delFavorite(id)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
