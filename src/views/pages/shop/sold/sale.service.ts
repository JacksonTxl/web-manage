import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state/src'
import { CourseApi } from '@/api/v1/setting/course'
import { TransactionApi } from '@/api/v1/sold/transaction'

@Injectable()
export class SaleService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  constructor(private leaseApi: CourseApi, private transactionApi: TransactionApi) {}
  addAdvance(params:any) {
    return this.transactionApi.setAdvance(params)
  }
  getList() {

  }
  beforeEach(to:ServiceRoute, from: ServiceRoute, next: ()=>{}) {
    next()
  }
}
