import { Injectable, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { MemberApi } from '@/api/v1/member'

@Injectable()
export class BasicService {
  loading$ = new State({})
  basicInfo$ = new State({})
  constructor(private cardsApi: MemberApi) {}
  getBasicInfo(id: string) {
    return this.cardsApi.getBasicInfo(id).pipe(
      tap(res => {
        this.basicInfo$.commit(() => res.basic_info)
      })
    )
  }

  beforeRouteEnter(to: ServiceRoute) {
    const { id } = to.meta.query
    return this.getBasicInfo(id)
  }
}
