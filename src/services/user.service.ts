import { Injectable, ServiceRoute, Dictionary } from 'vue-service-app'
import { State, Computed, log } from 'rx-state'
import { tap, pluck, map } from 'rxjs/operators'
import { Store } from './store'
import { forkJoin, of } from 'rxjs'
import { ConstApi } from '@/api/const'
import { MenuApi } from '@/api/v1/common/menu'
import { get } from 'lodash-es'

interface UserState {
  user: User
  menuData: {}
  enums: {}
}
interface User {
  id: string
  name: string
}
interface ModuleEnums {
  [enumName: string]: {
    description: string
    value: {
      [key: string]: string
    }
  }
}

interface Option {
  id: number
  name: string
}

interface EnumOption {
  /**
   * 枚举标签
   */
  label: string
  /**
   * 枚举map对象
   */
  map: {
    [key: string]: string
  }
  /**
   * 枚举选项用
   */
  select: Option[]
}
/**
 * 用户的全局初始信息
 */

@Injectable()
export class UserService extends Store<UserState> {
  state$: State<UserState>
  user$: Computed<User>
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
  constructor(private constApi: ConstApi, private menuApi: MenuApi) {
    super()
    const initialState = {
      user: {},
      menuData: {},
      enums: {}
    }
    this.state$ = new State(initialState)
    this.user$ = new Computed(this.state$.pipe(pluck('user')))
    this.menuData$ = new Computed(this.state$.pipe(pluck('menuData')))
    this.enums$ = new Computed(this.state$.pipe(pluck('enums')))
    this.staffEnums$ = new Computed(this.enums$.pipe(pluck('staff')))
    this.accountEnums$ = new Computed(this.enums$.pipe(pluck('account')))
    this.depositeCardEnums$ = new Computed(
      this.enums$.pipe(pluck('deposit_card'))
    )
    this.memberEnums$ = new Computed(this.enums$.pipe(pluck('member')))
    this.memberCardEnums$ = new Computed(this.enums$.pipe(pluck('member_card')))
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
  getMenus(params = { force: false }) {
    if (params.force || !Object.keys(this.menuData$.snapshot()).length) {
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
  init() {
    return forkJoin(this.getEnums(), this.getMenus())
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
  getEnum$(key: string) {
    const getEnumByKey = (enums: any, key: string) => {
      const enumObj = get(enums, key)
      const result: EnumOption = {
        select: [],
        map: {},
        label: ''
      }
      result.label = enumObj.description
      result.map = enumObj.value
      result.select = Object.keys(result.map).map(id => {
        return {
          id: +id,
          name: result.map[id]
        }
      })
      return result
    }
    return new Computed(
      this.enums$.pipe(map(enums => getEnumByKey(enums, key)))
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
