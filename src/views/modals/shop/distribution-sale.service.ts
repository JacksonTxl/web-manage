import { Injectable } from 'vue-service-app'
import { Store } from '@/services/store'
import { MemberApi, SaleQuery, SalesParams } from '@/api/v1/member'

interface CardsTableModelState {
  saleList: Object
}
@Injectable()
export class DistributionSaleService extends Store<CardsTableModelState> {
  constructor(private cardsApi: MemberApi) {
    super()
  }
  getSaleList(query: SaleQuery) {
    return this.cardsApi.getSaleList(query)
  }
  addSale(params: SalesParams) {
    return this.cardsApi.addSale(params)
  }
}
