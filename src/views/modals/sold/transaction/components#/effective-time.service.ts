import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { TransactionApi } from '@/api/v1/sold/transaction'

@Injectable()
export class EffectiveTimeService {
  freezeInfo$ = new State({})
  loading$ = new State({})
  constructor(private transactionApi: TransactionApi) { }
  getTime() {
    console.log(11)
    // return this.transactionApi.getTime()
  }
}
