import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CardsApi, CardSaleStopInput } from '@/api/v1/cards'
import { tap } from 'rxjs/operators'

@Injectable()
export class StopSaleService {
    loading$ = new State({})
    info$ = new State({})
    constructor(private cardApi: CardsApi) {}
    getStopSaleInfo(id:string) {
      return this.cardApi.getCardSaleStopInfo(id, 'brand', 'member').pipe(tap((res:any) => {
        this.info$.commit(() => res.info)
      }))
    }
    @Effect()
    setStopSale(params:CardSaleStopInput, id:string) {
      return this.cardApi.setCardsSaleStop(params, id, 'brand', 'member')
    }
}
