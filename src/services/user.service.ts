import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, log } from 'rx-state'
import { tap, pluck, map } from 'rxjs/operators'
import { Store } from './store'
import { forkJoin, of } from 'rxjs'
import { ConstApi } from '@/api/const'
import { cloneDeep } from 'lodash-es'

interface UserState {
  user: User
  menu: any[]
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
/**
 * 用户的全局初始信息
 */

@Injectable()
export class UserService extends Store<UserState> {
  state$: State<UserState>
  user$: Computed<User>
  menu$: Computed<any[]>

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

  constructor(private constApi: ConstApi) {
    super()
    const initialState = {
      user: {},
      menu: [],
      enums: {}
    }
    this.state$ = new State(initialState)
    this.user$ = new Computed(this.state$.pipe(pluck('user')))
    this.menu$ = new Computed(this.state$.pipe(pluck('menu')))
    this.enums$ = new Computed(
      this.state$.pipe(
        pluck('enums'),
        map(state => cloneDeep(state))
      )
    )
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
  }
  SET_USER(user: User) {
    this.state$.commit(state => {
      state.user = user
    })
  }
  getEnums() {
    return this.constApi.getEnum().pipe(
      tap(res => {
        this.state$.commit(state => {
          state.enums = res
        })
      })
    )
  }
  init() {
    if (!Object.keys(this.enums$.snapshot()).length) {
      return this.getEnums()
    } else {
      return of({})
    }
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: Function) {
    this.init().subscribe(() => {
      next()
    })
  }
}
