import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CardApi, CardSettingTimeInput } from '@/api/v1/sold/cards'
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
  @Effect()
  setTime(params:CardSettingTimeInput, id:string) {
    return this.cardApi.setCardSettingTime(params, id)
  }
}
