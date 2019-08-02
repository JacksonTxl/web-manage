import { Injectable } from 'vue-service-app'
import { Store } from '@/services/store'
import { MemberApi, CoachParams, CoachQuery } from '@/api/v1/member'

interface CardsTableModelState {
  coachList: Object
}
@Injectable()
export class DistributionCoachService extends Store<CardsTableModelState> {
  constructor(private cardsApi: MemberApi) {
    super()
  }
  getSaleList(query: CoachQuery) {
    return this.cardsApi.getCoachList(query)
  }
  addSale(params: CoachParams) {
    return this.cardsApi.addCoach(params)
  }
}
