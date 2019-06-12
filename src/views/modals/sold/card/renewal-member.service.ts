import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { CardApi } from '@/api/v1/sold/cards'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class RenewalMember {
  info$ = new State({})
  loading$ = new State({})
  constructor(private cardApi: CardApi) {}
  getInfo(id:string) {
    return this.cardApi.getCardRenewalInfo(id).pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
  @Effect()
  serviceInit(id:string) {
    return forkJoin(this.getInfo(id))
  }
}
