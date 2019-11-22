import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
// import { AuthService } from '@/services/auth.service'
import { GroupBuyApi } from '@/api/v1/marketing/group_buy'
import { tap } from 'rxjs/operators'
import { anyAll } from '@/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class EditPersonalService implements Controller {
  info$ = new State({})
  coach$ = new State({})
  personalList$ = new State([])
  constructor(private groupBuyApi: GroupBuyApi) {}
  @Effect()
  getPersonalDetail(id: number) {
    return this.groupBuyApi.getStoredData(id).pipe(
      tap((res: any) => {
        console.log(res.info, '这是接口返回的')
        this.info$.commit(() => res.info)
      })
    )
  }
  // 获取私教列表
  getList() {
    return this.groupBuyApi.getPersonalList().pipe(
      tap((res: any) => {
        console.log(res)
        this.personalList$.commit(() => res.list)
      })
    )
  }

  @Effect()
  getCoachList(params: { id: 1 }) {
    return this.groupBuyApi.getCoachList(params).pipe(
      tap((res: any) => {
        console.log(res)
        this.coach$.commit(() => res.list)
      })
    )
  }
  init(params: any) {
    return forkJoin(
      this.getPersonalDetail(params),
      this.getList(),
      this.getCoachList({ id: 1 })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query.id)
  }
}
