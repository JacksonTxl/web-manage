import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { MemberApi, FaceCheckQuery } from '@/api/v1/member'

@Injectable()
export class RecognitionService {
  loading$ = new State({})
  constructor(protected MemberApi: MemberApi) {}
  @Effect()
  getMemberCheckResult(query: FaceCheckQuery) {
    return this.MemberApi.getMemberCheckResult(query)
  }
}
