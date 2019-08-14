import { Injectable } from 'vue-service-app'
import { Store } from '@/services/store'
import {
  TemporaryCabinetApi,
  AddInput
} from '@/api/v1/setting/cabinet/temporary'
import { Effect, State } from 'rx-state'
import { UserService } from '@/services/user.service'

@Injectable()
export class AddTemporaryService {
  loading$ = new State({})
  sortTypes$ = this.userService.getOptions$('setting.cabinet.sort_type')
  constructor(
    private cabinetApi: TemporaryCabinetApi,
    private userService: UserService
  ) {}
  @Effect()
  add(params: AddInput) {
    return this.cabinetApi.add(params)
  }
}
