import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state/src'
import { CardApi } from '@/api/v1/sold/cards'
import { tap } from 'rxjs/operators'

@Injectable()
export class InfoService implements RouteGuard {
  info$ = new State({})
  loading$ = new State({})
  cardId = ''
  constructor(private cardApi: CardApi) {}
  getInfo(id:string, type: string) {
    return this.cardApi.getCardInfo(id, type).pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: ()=>{}) {
    this.cardId = to.meta.query.id
    this.getInfo(to.meta.query.id, 'deposit').subscribe(() => {
      next()
    })
  }
}
