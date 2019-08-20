import { Injectable } from 'vue-service-app'
import { MemberApi, CoachParams, CoachQuery } from '@/api/v1/member'
import { State } from 'rx-state/src'

@Injectable()
export class DistributionCoachService {
  loading$ = new State({})
  constructor(private cardsApi: MemberApi) {}
  getSaleList(query: CoachQuery) {
    return this.cardsApi.getCoachList(query)
  }
  addSale(params: CoachParams) {
    return this.cardsApi.addCoach(params)
  }
}
