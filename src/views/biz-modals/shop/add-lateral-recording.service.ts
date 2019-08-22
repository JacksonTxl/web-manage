import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { MemberApi } from '@/api/v1/member'

@Injectable()
export class AddLateralRecordingService {
  loading$ = new State({})
  constructor(private MemberApi: MemberApi) {}
  getAddMemberPhysical(data: any) {
    return this.MemberApi.getAddMemberPhysical(data)
  }
}
