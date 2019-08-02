import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { MemberApi } from '@/api/v1/member'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class SoldService implements RouteGuard {
  soldListInfo$ = new State([])
  soldPage$ = new State({})
  entranceList$ = new State([])
  entrancePage$ = new State({})
  auth$ = new State([])
  constructor(private memberApi: MemberApi, private authService: AuthService) {}
  getMemberReserve(id: string, params: any) {
    return this.memberApi.getMemberReserve(id, params).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.soldListInfo$.commit(() => res.list)
        this.soldPage$.commit(() => res.page)
      })
    )
  }
  getMemberEntrance(id: string) {
    return this.memberApi.getMemberEntrance(id).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.entranceList$.commit(() => res.list)
        this.entrancePage$.commit(() => res.page)
      })
    )
  }
  getMemberCancel(params: any) {
    return this.memberApi.getMemberCancel(params)
  }
  getMemberSign(params: any) {
    return this.memberApi.getMemberSign(params)
  }
  init(id: string, params: any) {
    return forkJoin(
      this.getMemberReserve(id, params),
      this.getMemberEntrance(id)
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query.id, {
      reserve_type: 1,
      size: 20,
      page: 1
    })
  }
}
