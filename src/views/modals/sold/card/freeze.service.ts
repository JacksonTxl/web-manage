import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { CardApi } from '@/api/v1/sold/cards'
import { tap } from 'rxjs/operators'

@Injectable()
export class FreezeService {
  freezeInfo$ = new State({})
  loading$ = new State({})
  constructor(private cardApi: CardApi) {}
  @Effect()
  getFreezeInfo(id:string) {
    return this.cardApi.getMemberFreezeInfo(id, 'member').pipe(tap((res:any) => {
      this.freezeInfo$.commit(() => res.info)
    }))
  }
}
