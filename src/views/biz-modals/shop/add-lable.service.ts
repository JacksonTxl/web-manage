import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { MemberApi } from '@/api/v1/member'

@Injectable()
export class AddLableService {
  loading$ = new State({})
  constructor(private cardsApi: MemberApi) {}
  getMemberLableList() {
    return this.cardsApi.getMemberLableList()
  }
  setMemberLabelCreate(data: any) {
    return this.cardsApi.setMemberLabelCreate(data)
  }
}
