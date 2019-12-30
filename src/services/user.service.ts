import { Injectable } from 'vue-service-app'
import { State, Computed, computed } from 'rx-state'
import { tap, pluck, map } from 'rxjs/operators'
import { ConstApi } from '@/api/const'
import { MenuApi } from '@/api/v1/common/menu'
import { StaffApi } from '@/api/v1/staff'
import { TooltipApi } from '@/api/v1/admin/tooltip'
import { get, reduce, isPlainObject, mapValues } from 'lodash-es'
import { ShopApi } from '@/api/v1/shop'
import { Dictionary } from 'lodash'
import Vue from 'vue'
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
   * 品牌版本 studio 工作室 club 俱乐部 new_studio 新工作室(封闭会员卡|合同功能的版本)
   */
  version: 'club' | 'old_studio' | 'studio'
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
  config$ = new State({})
  isShop$ = new Computed(this.shop$.pipe(map(shop => !!shop.id)))
  menus$ = new Computed<any[]>(this.menuData$.pipe(pluck('menus')))
  firstMenuUrl$ = new Computed<string>(this.menuData$.pipe(pluck('first_url')))
  favoriteMenu$ = new Computed(this.menuData$.pipe(pluck('favorite')))
  /**
   * 使用版本 club 俱乐部 studio
   */
  useVersion$ = new Computed(
    this.brand$.pipe(
      map(brand => {
        return {
          club: 'club',
          old_studio: 'studio',
          studio: 'studio'
        }[brand.version]
      })
    )
  )
  /**
   * 标准工作室版本
   */
  isBrandStudio$ = new Computed(
    this.brand$.pipe(map(brand => !!(brand.version === 'studio')))
  )

  isThemeClub$ = new Computed(
    this.useVersion$.pipe(map(useVersion => useVersion === 'club'))
  )
  isThemeStudio$ = new Computed(
    this.useVersion$.pipe(map(useVersion => useVersion === 'studio'))
  )

  theme$ = new Computed(
    this.useVersion$.pipe(
      map(useVersion => {
        return `theme-${useVersion}`
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
  soldEnums$ = new Computed<ModuleEnums>(this.enums$.pipe(pluck('sold_common')))
  couponEnums$ = new Computed<ModuleEnums>(this.enums$.pipe(pluck('coupon')))
  pluginEnums$ = new Computed<ModuleEnums>(this.enums$.pipe(pluck('plugin')))
  transactionEnums$ = new Computed<ModuleEnums>(
    this.enums$.pipe(pluck('transaction'))
  )
  groupBuyEnums$ = new Computed<ModuleEnums>(
    this.enums$.pipe(pluck('group_buy'))
  )
  urlData$ = new State({})
  constructor(
    private constApi: ConstApi,
    private menuApi: MenuApi,
    private staffApi: StaffApi,
    private tooltipApi: TooltipApi,
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
  SET_CONFIG(config: any) {
    this.config$.commit(() => config)
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
  fetchStaffInfo() {
    return this.staffApi.getGlobalStaffInfo().pipe(
      tap((res: any) => {
        this.SET_BRAND(res)
        this.SET_USER(res)
        this.SET_SHOP(res)
      })
    )
  }
  fetchEnums() {
    return this.constApi.getEnum().pipe(
      tap(res => {
        this.SET_ENUMS(res)
        this.SET_CONFIG(get(res, 'version_conf.documents.value', {}))
      })
    )
  }
  fetchMenuData() {
    return this.menuApi.getList().pipe(
      tap(res => {
        this.SET_MENU_DATA(res)
      })
    )
  }
  fetchInvalidTooltips() {
    return this.tooltipApi.getInvalid().pipe(
      tap((res: any) => {
        this.SET_INVALID_TOOLTIP(res)
      })
    )
  }
  fetchShopList() {
    return this.shopApi.getShopList().pipe(
      tap(res => {
        this.SET_SHOP_LIST(res)
      })
    )
  }
  private getOptions(enums: any, key: string) {
    const enumObj = get(enums, key)
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
  }

  /**
   * 通过key名获取下拉选项
   * @example
   * getOptions$('member.card_consume_type') => Observable([{label:'次卡',value:1},{label:'期限卡',2}])
   */
  public getOptions$(
    key: string,
    options: {
      addAll?: boolean | string
    } = {}
  ): Computed<{ label: string; value: number }[]> {
    return computed(
      (enums: any) => {
        let opts = this.getOptions(enums, key)
        if (options.addAll) {
          const allLabel = options.addAll === true ? '全部' : options.addAll
          opts = [{ value: -1, label: allLabel }].concat(opts)
        }
        return opts
      },
      [this.enums$]
    )
  }
  /**
   * 通过对象获取一组枚举值
   * @param map
   */
  public getOptionsMap$(map: Dictionary<string>) {
    return computed(
      (enums: any) => {
        return mapValues(map, enumKey => this.getOptions(enums, enumKey))
      },
      [this.enums$]
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
  public c(key: string): string {
    return get(this.config$.snapshot(), key, key)
  }
  public interpolation(title: string): string {
    if (!title) {
      return ''
    }
    const vm: any = new Vue({
      template: '<span>' + title + '</span>'
    }).$mount()
    return vm.$el.innerText
  }
}
