import { Injectable } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { UserService } from './../../../../services/user.service'
import {
  TemporaryCabinetApi,
  UpdateInput
} from '@/api/v1/setting/cabinet/temporary'

@Injectable()
export class EditTemporaryService {
  loading$ = new State({})
  state$: State<any>
  resData$: Computed<Object>
  transferUnits$ = this.userService.getOptions$('setting.cabinet.transfer_unit')
  useStatus$ = this.userService.getOptions$('setting.cabinet.use_status')
  constructor(
    private cabinetApi: TemporaryCabinetApi,
    private userService: UserService
  ) {
    this.state$ = new State({
      resData: {}
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
  }
  getUpdateInfo(id: number) {
    return this.cabinetApi.getUpdateInfo(id).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.resData = res
        })
      })
    )
  }
  @Effect()
  update(params: UpdateInput) {
    return this.cabinetApi.update(params)
  }
}
