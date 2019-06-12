import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { CardApi, CardGiveInput } from '@/api/v1/sold/cards'

@Injectable()
export class GivingService {
    loading$ = new State({})
    constructor(private cardApi: CardApi) {}
    @Effect()
    setGive(params:CardGiveInput) {
      return this.cardApi.setCardGive(params)
    }
}
