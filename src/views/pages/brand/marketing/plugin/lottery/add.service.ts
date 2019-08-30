import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { LotteryApi } from '@/api/v1/marketing/lottery'
import { forkJoin } from 'rxjs'
import { tap } from 'rxjs/operators'
import { State } from 'rx-state'

@Injectable()
export class AddService implements RouteGuard {
  list$ = new State({})
  constructor(private lotteryApi: LotteryApi) {}
  getList() {
    // return this.lotteryApi.getList().pipe(
    //   tap(res => {
    //     this.list$.commit(() => res)
    //   })
    // )
  }
  init() {
    return forkJoin(this.getList())
  }
  beforeRouteEnter() {
    return this.init()
  }
}
