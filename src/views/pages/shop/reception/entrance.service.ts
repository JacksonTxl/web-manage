import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { FrontApi, GetEntranceListInput, SetEntranceLeaveBatchInput } from '@/api/v1/front'
import { tap } from 'rxjs/operators'

@Injectable()
export class EntranceService implements RouteGuard {
  loading$ = new State({})
  list$ = new State([])
  page$ = new State({})
  constructor(private frontApi: FrontApi) {}
  @Effect()
  getList(query:GetEntranceListInput) {
    return this.frontApi.getEntranceList(query).pipe(tap((res:any) => {
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }
  // 单个离场
  setEntranceLeave(id:string) {
    return this.frontApi.setEntranceLeave(id)
  }
  // 批量离场
  setEntranceLeaveBatch(params:SetEntranceLeaveBatchInput) {
    return this.frontApi.setEntranceLeaveBatch(params)
  }
  beforeEach(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.getList(to.meta.query).subscribe(() => {
      next()
    })
  }
}
