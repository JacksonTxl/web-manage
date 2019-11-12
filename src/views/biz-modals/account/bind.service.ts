import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { CourtApi, SetInput } from '@/api/v1/shop/area'
import { UserService } from '@/services/user.service'

@Injectable()
export class AddService {
  loading$ = new State({})
  areaType$ = this.userService.getOptions$('shop.area_type')
  constructor(protected courtApi: CourtApi, private userService: UserService) {}

  @Effect()
  add(params: SetInput) {
    return this.courtApi.add(params)
  }
}
