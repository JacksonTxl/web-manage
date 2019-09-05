import { Injectable, ServiceRoute, Inject } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { tap, pluck, map, switchMap } from 'rxjs/operators'
import { ConstApi } from '@/api/const'
import { MenuApi } from '@/api/v1/common/menu'
import { StaffApi } from '@/api/v1/staff'
import { TooltipApi } from '@/api/v1/admin/tooltip'
import { get, reduce, isPlainObject } from 'lodash-es'
import { NProgressService } from './nprogress.service'
import { ShopApi } from '@/api/v1/shop'
import { of } from 'rxjs'
import { then, anyAll } from '@/operators'

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
  version?: string
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
  firstInited$ = new State(false)

  user$ = new State<User>({})
  brand$ = new State<Brand>({})
  shop$ = new State<Shop>({})
  shopList$ = new State<any[]>([])
  menuData$ = new State<any>({
    favorite: [],
    menus: [],
    first_url: ''
  })
  isShop$ = new Computed(this.shop$.pipe(map(shop => !!shop.id)))
  menus$ = new Computed<any[]>(this.menuData$.pipe(pluck('menus')))
  firstMenuUrl$ = new Computed<string>(this.menuData$.pipe(pluck('first_url')))
  favoriteMenu$ = new Computed(this.menuData$.pipe(pluck('favorite')))
  theme$ = new Computed(
    this.brand$.pipe(
      map(brand => {
        return `theme-${brand.version}`
      })
    )
  )
  // 枚举对象
  enums$ = new State({})
  // 禁用的 tooltips
  invalidTooltips$ = new State([])

  // TODO: 枚举 后面要删
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
  pluginEnums$ = new Computed<ModuleEnums>(this.enums$.pipe(pluck('plugin')))
  transactionEnums$ = new Computed<ModuleEnums>(
    this.enums$.pipe(pluck('transaction'))
  )

  constructor(
    private constApi: ConstApi,
    private menuApi: MenuApi,
    private staffApi: StaffApi,
    private tooltipApi: TooltipApi,
    private nprogress: NProgressService,
    private shopApi: ShopApi
  ) {}
  SET_USER(staff: any) {
    const info = staff.info
    this.user$.commit(user => {
      user.id = info.staff_id
      user.name = info.staff_name
      user.avatar = info.staff_avatar
      user.mobile = info.mobile
    })
  }
  SET_BRAND(staff: any) {
    const info = staff.info
    this.brand$.commit(brand => {
      brand.id = info.brand_id
      brand.name = info.brand_name
      brand.logo = info.brand_logo
      brand.priceModel = info.price_model
      brand.saleModel = info.sale_model
      brand.version = info.brand_version
    })
  }
  SET_SHOP(staff: any) {
    const info = staff.info
    this.shop$.commit(shop => {
      shop.id = info.shop_id
      shop.name = info.shop_name
      shop.logo = info.shop_logo
    })
  }
  SET_ENUMS(enums: any) {
    this.enums$.commit(() => enums)
  }
  SET_MENU_DATA(menuData: any) {
    this.menuData$.commit(() => menuData)
  }
  SET_INVALID_TOOLTIP(res: any) {
    this.invalidTooltips$.commit(() => res.list)
  }
  SET_SHOP_LIST(res: any) {
    this.shopList$.commit(() => res.list)
  }
  private getUser() {
    return this.staffApi.getGlobalStaffInfo().pipe(
      tap((res: any) => {
        this.SET_BRAND(res)
        this.SET_USER(res)
        this.SET_SHOP(res)
      })
    )
  }
  private getEnums() {
    return this.constApi.getEnum().pipe(
      tap(res => {
        this.SET_ENUMS(res)
      })
    )
  }
  private getMenuData() {
    return this.menuApi.getList().pipe(
      tap(res => {
        this.SET_MENU_DATA(res)
      })
    )
  }
  private getInvalidTooltips() {
    return this.tooltipApi.getInvalid().pipe(
      tap((res: any) => {
        this.SET_INVALID_TOOLTIP(res)
      })
    )
  }
  private getShopList() {
    return this.shopApi.getShopList().pipe(
      tap(res => {
        this.SET_SHOP_LIST(res)
      })
    )
  }

  /**
   * 通过key名获取下拉选项
   * @example
   * getOptions$('member.card_consume_type') => Observable([{label:'次卡',value:1},{label:'期限卡',2}])
   */
  public getOptions$(
    key: string
  ): Computed<{ label: string; value: number }[]> {
    return new Computed(
      this.enums$.pipe(
        map(enums => {
          const enumObj = get(enums, key)
          const initArr: { label: string; value: number }[] = []
          if (!enumObj) {
            return []
          } else {
            return reduce(
              enumObj.value,
              (res: any[], item: any, index: string | number) => {
                if (isPlainObject(item)) {
                  return res.concat([item])
                }
                return res.concat([
                  {
                    label: item,
                    value: +index
                  }
                ])
              },
              []
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
  public addFavorite(id: number) {
    return this.menuApi.addFavorite(id)
  }
  /**
   * 删除常用菜单
   * @param id
   */
  public delFavorite(id: number) {
    return this.menuApi.delFavorite(id)
  }
  private init() {
    if (!this.firstInited$.snapshot()) {
      return anyAll(
        this.getUser(),
        this.getMenuData(),
        this.getEnums(),
        this.getInvalidTooltips(),
        this.getShopList()
      ).pipe(
        then(() => {
          this.firstInited$.commit(() => true)
        })
      )
    } else {
      return of({})
    }
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    this.nprogress.SET_TEXT('用户数据加载中...')
    return this.init().pipe(
      then(() => {
        this.nprogress.SET_TEXT('用户信息数据获取完毕')
      })
    )
  }
}
