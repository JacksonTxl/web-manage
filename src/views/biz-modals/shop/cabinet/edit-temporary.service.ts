import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { UserService } from './../../../../services/user.service'
import {
  TemporaryCabinetApi,
  UpdateInput
} from '@/api/v1/setting/cabinet/temporary'

@Injectable()
export class EditTemporaryService {
  loading$ = new State({})
  resData$ = new State({})
  transferUnits$ = this.userService.getOptions$('cabinet.transfer_unit')
  useStatus$ = this.userService.getOptions$('cabinet.use_status')
  constructor(
    private cabinetApi: TemporaryCabinetApi,
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
