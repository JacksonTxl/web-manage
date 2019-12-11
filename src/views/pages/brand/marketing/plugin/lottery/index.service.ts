import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { LotteryApi, GetActivityListQuery } from '@/api/v1/marketing/lottery'
import { forkJoin } from 'rxjs'
import { tap } from 'rxjs/operators'
import { State, Effect } from 'rx-state'
import { UserService } from '@/services/user.service'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class IndexService implements Controller {
  list$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  info$ = new State({})
  status$ = this.userService.getOptions$('plugin.activity_status')
  auth$ = this.authService.authMap$({
    add: 'brand:activity:turn|add',
    destory: 'brand:activity:prize|add'
  })
  constructor(
    private lotteryApi: LotteryApi,
    private userService: UserService,
    private authService: AuthService
  ) {}
  @Effect()
  getActivityList(query: GetActivityListQuery) {
    return this.lotteryApi.getActivityList(query).pipe(
      tap(res => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  getPosterInfo(id: number) {
    return this.lotteryApi.getPosterInfo(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  stopActivity(id: string) {
    return this.lotteryApi.stopActivity(id)
  }
  init(GetActivityListQuery: any) {
    return forkJoin(this.getActivityList(GetActivityListQuery))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
