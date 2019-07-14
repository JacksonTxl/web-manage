import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { tap, pluck, map } from 'rxjs/operators'
import { forkJoin, of } from 'rxjs'
import { ConstApi } from '@/api/const'
import { MenuApi } from '@/api/v1/common/menu'
import { StaffApi } from '@/api/v1/staff'
import { TooltipApi } from '@/api/v1/admin/tooltip'
import { get } from 'lodash-es'
import { NProgressService } from './nprogress.service'
import { AuthService } from './auth.service'

interface User {
  id?: string
  name?: string
  avatar?: string
  mobile?: string
}
interface Brand {
  id?: string
  name?: string
  logo?: string
  /**
   * 私教课程定价模式 1、教练统一定价 2、教练分级定价
   */
  priceModel?: number
  /**
   * 私教课程售卖模式 1、教练谈单 2、统一标价
   */
  saleModel?: number
  /**
   * 品牌版本 studio 工作室 club 俱乐部
   */
  version?:string
}

interface Shop {
  id?: string
  name?: string
  logo?: string
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
export class UserService {
  user$ = new State<User>({})
  brand$ = new State<Brand>({})
  shop$ = new State<Shop>({})
  menuData$ = new State({
    favorite: [],
    menus: [],
    first_url: ''
  })
  menus$ = new Computed<any[]>(this.menuData$.pipe(pluck('menus')))
  firstMenuUrl$ = new Computed<string>(this.menuData$.pipe(pluck('first_url')))
  favoriteMenu$ = new Computed(this.menuData$.pipe(pluck('favorite')))
  appMode$ = new State<string>('brand')
  firstInited$ = new State(false)
  // 枚举对象
  enums$ = new State({})
  // 禁用的 tooltips
  invalidTooltips$ = new State([])

  // TODO 枚举 后面要删
  staffEnums$ = new Computed<ModuleEnums>(this.enums$.pipe(pluck('staff')))
  accountEnums$ = new Computed<ModuleEnums>(this.enums$.pipe(pluck('account')))
  depositCardEnums$ = new Computed<ModuleEnums>(
    this.enums$.pipe(pluck('deposit_card'))
  )
  memberEnums$ = new Computed<ModuleEnums>(this.enums$.pipe(pluck('member')))
  memberCardEnums$ = new Computed<ModuleEnums>(
    this.enums$.pipe(pluck('member_card'))
  )
  personalCourseEnums$ = new Computed<ModuleEnums>(
    this.enums$.pipe(pluck('personal_course'))
  )
  shopEnums$ = new Computed<ModuleEnums>(this.enums$.pipe(pluck('shop')))
  settingEnums$ = new Computed<ModuleEnums>(this.enums$.pipe(pluck('setting')))
  teamCourseEnums$ = new Computed<ModuleEnums>(
    this.enums$.pipe(pluck('team_course'))
  )
  packageCourseEnums$ = new Computed<ModuleEnums>(
    this.enums$.pipe(pluck('package_course'))
  )
  reserveEnums$ = new Computed<ModuleEnums>(this.enums$.pipe(pluck('reserve')))
  shopMemberEnums$ = new Computed<ModuleEnums>(
    this.enums$.pipe(pluck('shop_member'))
  )
  finance$ = new Computed<ModuleEnums>(this.enums$.pipe(pluck('finance')))
  crowdEnums$ = new Computed<ModuleEnums>(this.enums$.pipe(pluck('crowd')))
  soldEnums$ = new Computed<ModuleEnums>(this.enums$.pipe(pluck('sold')))
  couponEnums$ = new Computed<ModuleEnums>(this.enums$.pipe(pluck('coupon')))
  transactionEnums$ = new Computed<ModuleEnums>(
    this.enums$.pipe(pluck('transaction'))
  )

  constructor(
    private constApi: ConstApi,
    private menuApi: MenuApi,
    private staffApi: StaffApi,
    private tooltipApi: TooltipApi,
    private nprogress: NProgressService,
    private authService: AuthService
  ) {}
  SET_USER(user: User) {
    this.user$.commit(() => user)
  }
  SET_BRAND(brand: Brand = {}) {
    this.brand$.commit(() => brand)
  }
  SET_SHOP(shop: Shop = {}) {
    this.shop$.commit(() => shop)
  }
  SET_ENUMS(enums: any) {
    this.enums$.commit(() => enums)
  }
  SET_MENU_DATA(menuData: any) {
    this.menuData$.commit(() => menuData)
  }
  SET_INVALID_TOOLTIP(tooltip: any) {
    this.invalidTooltips$.commit(() => tooltip)
  }
  SET_FIRST_INITED(inited: boolean) {
    this.firstInited$.commit(() => inited)
  }
  getUser() {
    return this.staffApi.getGlobalStaffInfo().pipe(
      tap((res: any) => {
        const { info } = res
        this.SET_BRAND({
          id: info.brand_id,
          name: info.brand_name,
          logo: info.brand_logo,
          priceModel: info.price_model,
          saleModel: info.sale_model,
          version: info.brand_version
        })
        this.SET_USER({
          id: info.staff_id,
          name: info.staff_name,
          avatar: info.staff_avatar,
          mobile: info.mobile
        })
        this.SET_SHOP({
          id: info.shop_id,
          name: info.shop_name,
          logo: info.shop_logo
        })
      })
    )
  }
  getEnums() {
    return this.constApi.getEnum().pipe(
      tap(res => {
        this.SET_ENUMS(res)
      })
    )
  }
  getMenuData() {
    return this.menuApi.getList().pipe(
      tap(res => {
        this.SET_MENU_DATA(res)
      })
    )
  }
  getInvalidTooltips() {
    return this.tooltipApi.getInvalid().pipe(
      tap((res: any) => {
        this.SET_INVALID_TOOLTIP(res.list)
      })
    )
  }
  /**
   * 通过key名获取下拉选项
   */
  getOptions(key: string): Computed<{ label: string; value: number }[]> {
    return new Computed(
      this.enums$.pipe(
        map(enums => {
          const enumObj = get(enums, key)
          const initArr: { label: string; value: number }[] = []
          if (!enumObj) {
            return []
          } else {
            return Object.keys(enumObj.value).reduce(
              (arr, k) => arr.concat({ label: enumObj.value[k], value: +k }),
              initArr
            )
          }
        })
      )
    )
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
  init() {
    if (!this.firstInited$.snapshot()) {
      return forkJoin(
        this.getUser(),
        this.getMenuData(),
        this.getEnums(),
        this.getInvalidTooltips()
      ).pipe(
        tap(() => {
          this.SET_FIRST_INITED(true)
        })
      )
    } else {
      return of({})
    }
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    this.nprogress.SET_TEXT('用户数据加载中...')
    return this.init().pipe(
      tap(() => {
        this.nprogress.SET_TEXT('用户信息数据获取完毕')
      })
    )
  }
}
