import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberAPi } from '@/api/v1/member'

interface InfoState {
    info: Object,
    basicInfo: Object
}
@Injectable()
export class InfoService extends Store<InfoState> {
    state$: State<InfoState>
    info$: Computed<Object>
    basicInfo$: Computed<Object>
    constructor(private cardsApi: MemberAPi) {
      super()
      this.state$ = new State({
        info: {},
        basicInfo: {}
      })
      this.info$ = new Computed(this.state$.pipe(pluck('info')))
      this.basicInfo$ = new Computed(this.state$.pipe(pluck('basicInfo')))
    }
    getHeaderInfo(id: string) {
      return this.cardsApi.getHeaderInfo(id).pipe(
        tap(res => {
          this.state$.commit(state => {
            state.info = res.common_info
          })
        })
      )
    }
    getBasicInfo(id: string) {
      return this.cardsApi.getBasicInfo(id).pipe(
        tap(res => {
          this.state$.commit(state => {
            state.info = res.basic_info
          })
        })
      )
    }

    beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
      const { id } = to.meta.query
      this.getHeaderInfo(id).subscribe(() => {
        // next()
      })
      next()
    }
}
