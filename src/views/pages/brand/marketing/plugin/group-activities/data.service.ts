import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { GroupApi, GroupData } from '@/api/v1/marketing/group'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { anyAll } from '@/operators'
@Injectable()
export class DataService {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({})
  constructor(
    private marketingApi: MarketingApi,
    private GroupApi: GroupApi,
    private authService: AuthService
  ) {}
  @Effect()
  getData(params: GroupData) {
    return this.GroupApi.getData(params).pipe(
      tap((res: any) => {
        console.log(res)
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
}
