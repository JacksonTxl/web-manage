import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'

interface CardsTableModelState {
  lableInfo: any
}
@Injectable()
export class BindingEntityCardService extends Store<CardsTableModelState> {
  constructor(private cardsApi: MemberApi) {
    super()
  }
  getMemberCard(id: string, params: any) {
    return this.cardsApi.getMemberCard(id, params)
  }
}
