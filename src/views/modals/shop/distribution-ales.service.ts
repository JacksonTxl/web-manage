import { Injectable } from 'vue-service-app'
import { Store } from '@/services/store'
import { MemberAPi, SaleQuery, SalesParams } from '@/api/v1/member'

interface CardsTableModelState {
  saleList: Object
}
@Injectable()
export class DistributionAlesService extends Store<CardsTableModelState> {
  constructor(private cardsApi: MemberAPi) {
    super()
  }
  getSaleList(query: SaleQuery) {
    return this.cardsApi.getSaleList(query)
  }
  addSale(params: SalesParams) {
    return this.cardsApi.addSale(params)
  }
}
