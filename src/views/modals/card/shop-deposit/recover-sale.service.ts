import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CardsApi, CardSaleRecoverInput } from '@/api/v1/cards'
import { tap } from 'rxjs/operators'

@Injectable()
export class RecoverSaleService {
    loading$ = new State({})
    time$ = new State(0)
    constructor(private cardApi: CardsApi) {}
    getServiceTime() {
      return this.cardApi.getServiceTime().pipe(tap((res:any) => {
        this.time$.commit(() => res.info)
      }))
    }
    @Effect()
    setRecoverSale(params: CardSaleRecoverInput, id:string) {
      return this.cardApi.setCardsSaleRecover(params, id, 'shop', 'deposit')
    }
}
