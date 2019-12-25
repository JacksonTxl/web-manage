import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import {
  LongTermCabinetApi,
  UpdateInput
} from '@/api/v1/setting/cabinet/long-term'
import { UserService } from '@/services/user.service'

@Injectable()
export class EditLongTermService {
  loading$ = new State({})
  resData$ = new State({})
  transferUnits$ = this.userService.getOptions$('cabinet.transfer_unit')
  useStatus$ = this.userService.getOptions$('cabinet.use_status')
  constructor(
    private cabinetApi: LongTermCabinetApi,
    private userService: UserService
  ) {}
  getUpdateInfo(id: number) {
    return this.cabinetApi.getUpdateInfo(id).pipe(
      tap(res => {
        this.resData$.commit(() => res)
      })
    )
  }
  @Effect()
  update(params: UpdateInput) {
    return this.cabinetApi.update(params)
  }
}
