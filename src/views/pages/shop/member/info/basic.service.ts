import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'

interface BasicState {
    basicInfo: Object
}
@Injectable()
export class BasicService extends Store<BasicState> {
    state$: State<BasicState>
    basicInfo$: Computed<Object>
    constructor(private cardsApi: MemberApi) {
      super()
      this.state$ = new State({
        basicInfo: {}
      })
      this.basicInfo$ = new Computed(this.state$.pipe(pluck('basicInfo')))
    }
    getBasicInfo(id: string) {
      return this.cardsApi.getBasicInfo(id).pipe(
        tap(res => {
          this.state$.commit(state => {
            state.basicInfo = res.basic_info
          })
        })
      )
    }

    beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
      const { id } = to.meta.query
      this.getBasicInfo(id).subscribe(() => {
        next()
      })
    //   next()
    }
}
