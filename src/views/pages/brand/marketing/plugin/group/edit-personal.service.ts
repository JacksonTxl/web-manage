import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
// import { AuthService } from '@/services/auth.service'
import { GroupBuyApi, EditParams } from '@/api/v1/marketing/group_buy'
import { tap } from 'rxjs/operators'
import { anyAll } from '@/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class EditPersonalService implements Controller {
  info$ = new State({})
  loading$ = new State({})
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
  @Effect()
  getPersonalList() {
    return this.groupBuyApi.getPersonalList().pipe(
      tap((res: any) => {
        console.log(res)
        this.personalList$.commit(() => res.list)
      })
    )
  }
  @Effect()
  getCoachList(id: number) {
    return this.groupBuyApi.getCoachList(id).pipe(
      tap((res: any) => {
        console.log(res)
        this.coach$.commit(() => res.list)
      })
    )
  }
  editGroupbuy(params: EditParams) {
    return this.groupBuyApi.editGroup(params)
  }
  init(params: any) {
    return anyAll(this.getPersonalDetail(params))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query.id)
  }
}
