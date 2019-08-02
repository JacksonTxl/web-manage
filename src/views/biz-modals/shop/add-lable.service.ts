import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'

interface CardsTableModelState {
  lableInfo: any
}
@Injectable()
export class AddLableService extends Store<CardsTableModelState> {
  constructor(private cardsApi: MemberApi) {
    super()
  }
  getMemberLableList() {
    return this.cardsApi.getMemberLableList()
  }
  setMemberLabelCreate(data: any) {
    return this.cardsApi.setMemberLabelCreate(data)
  }
}