import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CardApi, CardVipInput } from '@/api/v1/sold/cards'
import { tap } from 'rxjs/operators'
import { anyAll } from '@/operators'

@Injectable()
export class BatchAreaService {
  count$ = new State(0)
  vips$ = new State({})
  loading$ = new State({})
  constructor(private cardApi: CardApi) {}
  fetchCardNum(params: any) {
    return this.cardApi.fetchSoldCardValidNum(params).pipe(
      tap((res: any) => {
        this.count$.commit(() => res.info.count)
      })
    )
  }
  @Effect()
  getVips() {
    return this.cardApi.getCardVipAreaList().pipe(
      tap((res: any) => {
        this.vips$.commit(() => res.list)
      })
    )
  }
  @Effect()
  setCardVip(params: CardVipInput) {
    return this.cardApi.setCardVipAreaBatch(params)
  }
  init(params: any) {
    return anyAll(this.fetchCardNum(params), this.getVips())
  }
}
