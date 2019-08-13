import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { CourtApi, SetInput } from '@/api/v1/shop/area'
import { UserService } from '@/services/user.service'

@Injectable()
export class AddService extends Store<any> {
  areaType$ = this.userService.getOptions$('shop.area_type').pipe()
  constructor(protected courtApi: CourtApi, private userService: UserService) {
    super()
  }

  @Effect()
  add(params: SetInput) {
    return this.courtApi.add(params)
  }
}
