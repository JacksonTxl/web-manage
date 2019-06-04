import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { CardApi } from '@/api/v1/sold/cards'
import { tap } from 'rxjs/operators'

@Injectable()
export class InfoService implements RouteGuard {
    info$ = new State({})
    loading$ = new State({})
    id = ''
    constructor(private cardApi: CardApi) {}
    @Effect()
    getInfo(id:string) {
      return this.cardApi.getCardInfo(id, 'member').pipe(tap((res:any) => {
        this.info$.commit(() => res.info)
      }))
    }
    beforeEach(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
      this.id = to.meta.query.id
      this.getInfo(to.meta.query.id).subscribe(res => {
        next()
      })
    }
}
