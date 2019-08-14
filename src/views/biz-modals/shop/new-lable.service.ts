import { Injectable } from 'vue-service-app'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'

interface CardsTableModelState {
  lableInfo: any
}
@Injectable()
export class NewLableService extends Store<CardsTableModelState> {
  constructor(private MemberApi: MemberApi) {
    super()
  }
  setMemberLabel(data: any) {
    return this.MemberApi.setMemberLabel(data)
  }
}
