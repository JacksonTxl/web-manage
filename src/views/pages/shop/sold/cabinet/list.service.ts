import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CabinetApi, LeaseParams } from '@/api/v1/sold/cabinet'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'
@Injectable()
export class ListService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  cabinetStatus$ = this.userService.getOptions$('cabinet.cabinet_status')
  auth$ = this.authService.authMap$({
    export: 'shop:sold:sold_cabinet|export'
  })

  constructor(
    private cabinetApi: CabinetApi,
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Effect()
  getList(params: LeaseParams) {
    return this.cabinetApi.getLeaseList(params).pipe(
      tap((res: any) => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }

  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
