import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { MemberApi } from '@/api/v1/member'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class UserExperienceService implements Controller {
  loading$ = new State({})
  physicalListInfo$ = new State([])
  followInfo$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'shop:member:member_physical_record|add'
  })
  constructor(private memberApi: MemberApi, private authService: AuthService) {}
  getMemberSideRecord(id: any, query: any) {
    return this.memberApi.getMemberSideRecord(id, query).pipe(
      tap(res => {
        console.log(res, '获取数据')
        res = this.authService.filter(res)
        this.physicalListInfo$.commit(() => res)
      })
    )
  }
  getMemberSideChart(id: any) {
    return this.memberApi.getMemberSideChart(id).pipe(
      tap(res => {
        console.log(res, '获取数据')
        this.followInfo$.commit(() => res)
      })
    )
  }
  init(id: string) {
    return forkJoin(
      this.getMemberSideRecord(id, {
        size: 20,
        page: 1
      }),
      this.getMemberSideChart({
        id: id,
        filed: 1
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute) {
    return this.init(to.meta.query.id)
  }
}
