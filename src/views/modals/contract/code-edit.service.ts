import { Injectable } from 'vue-service-app'
import { ContractApi } from '@/api/v1/setting/contract'
import { tap, pluck } from 'rxjs/operators'
import { State, Effect, Computed } from 'rx-state/src'
import { forkJoin } from 'rxjs'
import { Store } from '@/services/store'
import { rest } from 'lodash-es'

interface CodeEditState {
  list: Array<Object>
}

@Injectable()
export class CodeEditService extends Store<CodeEditState> {
  state$ = new State<CodeEditState>({
    list: []
  })
  list$ = new Computed(this.state$.pipe(pluck('list')))
  constructor(private contractApi: ContractApi) {
    super()
  }
  @Effect()
  getCodeInfo(id: number) {
    return this.contractApi.getCodeInfo(id).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.list = res
        })
      })
    )
  }
  init(id: number) {
    return forkJoin(this.getCodeInfo(id))
  }
}
