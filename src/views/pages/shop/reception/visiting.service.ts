import { UserService } from './../../../../services/user.service'
import { RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state/src'
import { tap } from 'rxjs/operators'
export class VisitingService implements RouteGuard {
  loading$ = new State({})
  page$ = new State({})
  list$ = new State([])
  reserveType$ = this.userService.getOptions$('front.reserveType').pipe(
    tap(list => {
      list = [{ label: '全部', value: -1 }, ...list]
    })
  )
  constructor(private userService: UserService) {}

  beforeEach(to: ServiceRoute, from: ServiceRoute) {}
}
