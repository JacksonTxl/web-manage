import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { CardApi, FreezeCardInput } from '@/api/v1/sold/cards'
import { tap } from 'rxjs/operators'

@Injectable()
export class FreezeService {
  freezeInfo$ = new State({})
  loading$ = new State({})
  constructor(private cardApi: CardApi) {}
  @Effect()
  getFreezeInfo(id:string) {
    return this.cardApi.getMemberFreezeInfo(id).pipe(tap((res:any) => {
      this.freezeInfo$.commit(() => res.info)
    }))
  }
  @Effect()
  freeze(params: FreezeCardInput, id: string) {
    return this.cardApi.editMemberFreeze(params, id)
  }
}
