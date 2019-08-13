import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CourtApi, SetInput } from '@/api/v1/shop/area'
import { UserService } from '@/services/user.service'

@Injectable()
export class EditService {
  loading$ = new State({})
  info$ = new State({})
  areaType$ = this.userService.getOptions$('shop.area_type')
  constructor(protected courtApi: CourtApi, private userService: UserService) {}
  getInfo(id: number) {
    return this.courtApi.getInfo(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  @Effect()
  update(params: SetInput) {
    return this.courtApi.update(params)
  }
}
