import { Injectable } from 'vue-service-app'
import { MemberApi } from '@/api/v1/member'
import { State } from 'rx-state/src'

@Injectable()
export class BindingEntityCardService {
  loading$ = new State({})
  constructor(private cardsApi: MemberApi) {}
  getMemberCard(id: string, params: any) {
    return this.cardsApi.getMemberCard(id, params)
  }
}
