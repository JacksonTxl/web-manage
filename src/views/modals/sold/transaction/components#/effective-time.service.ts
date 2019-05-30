import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { TransactionApi } from '@/api/v1/transaction'
import { tap } from 'rxjs/operators'

@Injectable()
export class EffectiveTimeService {
  freezeInfo$ = new State({})
  loading$ = new State({})
  constructor(private transactionApi: TransactionApi) { }
  getTime() {
    console.log(11)
    return this.transactionApi.getTime()
  }
}
