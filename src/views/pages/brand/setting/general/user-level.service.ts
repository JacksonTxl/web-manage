import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { SettingMemberApi, UpdateInput } from '@/api/v1/setting/member'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class UserLevelService {
  list$ = new State<object[]>([])
  info$ = new State<object>({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    get: 'brand:setting:member_level|get',
    edit: 'brand:setting:member_level|edit'
  })
  constructor(
    private settingMemberApi: SettingMemberApi,
    private authService: AuthService
  ) {}
  getList() {
    return this.settingMemberApi.getList().pipe(
      tap(res => {
        this.list$.commit(() => res.list)
      })
    )
  }
  getInfo() {
    return this.settingMemberApi.getInfo().pipe(
      tap(res => {
        this.info$.commit(() => res.info)
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
