import { Injectable } from 'vue-service-app'
import { MemberApi, SaleQuery, SalesParams } from '@/api/v1/member'
import { State } from 'rx-state/src'

@Injectable()
export class DistributionSaleService {
  loading$ = new State({})
  constructor(private cardsApi: MemberApi) {}
  getSaleList(query: SaleQuery) {
    return this.cardsApi.getSaleList(query)
  }
  addSale(params: SalesParams) {
    return this.cardsApi.addSale(params)
  }
}
