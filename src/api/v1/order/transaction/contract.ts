import { Api } from '@/api/api'

export class ContractApi extends Api {
  getInfo(query: ID) {
    return this.http.get(`/v1/order/transaction/contract/${query.id}`)
  }
}

export interface ID {
  id: number
}
