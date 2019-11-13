import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { MemberApi } from '@/api/v1/member'

@Injectable()
export class DropCoachSeaService {
  loading$ = new State({})
  constructor(private cardsApi: MemberApi) {}
  dropCoachSea(params: any) {
    return this.cardsApi.dropCoachSea(params)
  }
}
