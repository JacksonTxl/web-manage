import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { CardApi } from '@/api/v1/sold/cards'
import { tap } from 'rxjs/operators'

@Injectable()
export class SetTimeService {
  info$ = new State({})
  loading$ = new State({})
  constructor(private cardApi: CardApi) {}
  @Effect()
  getInfo(id:string) {
    return this.cardApi.getCardSettimeInfo(id).pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
}
