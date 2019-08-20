import { Injectable } from 'vue-service-app'
import { MemberApi } from '@/api/v1/member'

@Injectable()
export class NewLableService {
  constructor(private MemberApi: MemberApi) {}
  setMemberLabel(data: any) {
    return this.MemberApi.setMemberLabel(data)
  }
}
