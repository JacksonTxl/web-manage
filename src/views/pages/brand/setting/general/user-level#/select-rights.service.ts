import { Injectable } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { SettingMemberApi } from '@/api/v1/setting/member'

interface ResState {
  resData: object
}

@Injectable()
export class SelectRightsService extends Store<ResState> {
  state$: State<ResState>
  resData$: Computed<object>
  constructor(protected settingMemberApi: SettingMemberApi) {
    super()
    this.state$ = new State({
      resData: {}
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
  }
  @Effect()
  getRights() {
    return this.settingMemberApi.getRights().pipe(
      tap(res => {
        const list = res.info
        const checked = this.getCheckedRights(list)
        const resData = {
          list,
          checked
        }
        this.state$.commit(state => {
          state.resData = resData
        })
      })
    )
  }
  protected getCheckedRights(condition: any[]) {
    const checkedCondition: number[] = []
    condition.forEach((item: any) => {
      if (item.checked) {
        checkedCondition.push(item.rights_id)
      }
    })
    return checkedCondition
  }
}
