import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberAPi } from '@/api/v1/member'

interface CardsTableModelState {
  lableInfo: any
}
@Injectable()
export class MissingCaedService extends Store<CardsTableModelState> {
  constructor(private MemberAPi: MemberAPi) {
    super()
  }
  getMemberPhysical(data: any) {
    return this.MemberAPi.getMemberPhysical(data)
  }
  getMemberPhysicalBind(id: any, data: any) {
    return this.MemberAPi.getMemberPhysicalBind(id, data)
  }
}
