import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'

interface CardsTableModelState {
  lableInfo: any
}
@Injectable()
export class AddFollowRecordsService extends Store<CardsTableModelState> {
  constructor(private MemberApi: MemberApi) {
    super()
  }
  getMemberFollowHistory(id: string, data: any) {
    return this.MemberApi.getMemberFollowHistory(id, data)
  }
}
