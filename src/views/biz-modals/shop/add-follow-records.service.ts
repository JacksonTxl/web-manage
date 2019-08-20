import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { MemberApi } from '@/api/v1/member'

@Injectable()
export class AddFollowRecordsService {
  loading$ = new State({})
  constructor(private MemberApi: MemberApi) {}
  getMemberFollowHistory(id: string, data: any) {
    return this.MemberApi.getMemberFollowHistory(id, data)
  }
}
