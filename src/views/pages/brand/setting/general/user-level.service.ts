import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { SettingMemberApi, UpdateInput } from '@/api/v1/setting/member'
import { AuthService } from '@/services/auth.service'

interface ListState {
  list: object[]
  info: object
}
@Injectable()
export class UserLevelService extends Store<ListState> {
  state$: State<ListState>
  list$: Computed<object[]>
  info$: Computed<object>
  auth$ = this.authService.authMap$({
    get: 'brand:setting:member_level|get',
    edit: 'brand:setting:member_level|edit'
  })
  constructor(
    private settingMemberApi: SettingMemberApi,
    private authService: AuthService
  ) {
    super()
    this.state$ = new State({
      list: [],
      info: {}
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
    this.info$ = new Computed(this.state$.pipe(pluck('info')))
  }
  getList() {
    return this.settingMemberApi.getList().pipe(
      tap(res => {
        this.state$.commit(state => {
          state.list = res.list
        })
      })
    )
  }
  getInfo() {
    return this.settingMemberApi.getInfo().pipe(
      tap(res => {
        this.state$.commit(state => {
          state.info = this.dataFilter(res.info)
        })
      })
    )
  }
  @Effect()
  update(params: UpdateInput) {
    return this.settingMemberApi.update(params)
  }
  protected dataFilter(info: any) {
    const { condition, rights } = info
    const checkedCondition: number[] = []
    const checkedRights: number[] = []
    condition.forEach((item: any) => {
      if (item.checked) {
        checkedCondition.push(item.condition_id)
      }
    })
    rights.forEach((item: any) => {
      if (item.checked) {
        checkedRights.push(item.rights_id)
      }
    })
    return {
      condition: {
        list: condition,
        checked: checkedCondition
      },
      rights: {
        list: rights,
        checked: checkedRights
      }
    }
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    const { type } = to.meta.query
    this.getList().subscribe(
      () => {
        if (type === 'edit') {
          this.getInfo().subscribe(next, () => {
            next(false)
          })
        } else {
          next()
        }
      },
      () => {
        next(false)
      }
    )
  }
}
