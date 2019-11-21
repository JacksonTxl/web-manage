import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
// import { AuthService } from '@/services/auth.service'
import { GroupBuyApi } from '@/api/v1/marketing/group_buy'
import { tap } from 'rxjs/operators'
import { anyAll } from '@/operators'

@Injectable()
export class EditCourseService implements Controller {
  info$ = new State({})
  constructor(private groupBuyApi: GroupBuyApi) {}
  getDetailData(id: number) {
    return this.groupBuyApi.getStoredData(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res)
      })
    )
  }
  @Effect()
  init(id: any) {
    return anyAll(this.getDetailData(id))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    console.log('sdjfkjsdkf')
    return this.init(to.meta.query.id)
  }
}
