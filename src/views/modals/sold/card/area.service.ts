import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CardApi, CardVipInput } from '@/api/v1/sold/cards'
import { tap } from 'rxjs/operators'

@Injectable()
export class AreaService {
    vips$ = new State({})
    loading$ = new State({})
    constructor(private cardApi: CardApi) {}
    @Effect()
    getVips() {
      return this.cardApi.getCardVipAreaList().pipe(tap((res:any) => {
        this.vips$.commit(() => res.list)
      }))
    }
    @Effect()
    getCardVip(id:string) {
      return this.cardApi.getCardVipArea(id)
    }
    @Effect()
    setCardVip(params: CardVipInput) {
      return this.cardApi.setCardVipArea(params)
    }
}
