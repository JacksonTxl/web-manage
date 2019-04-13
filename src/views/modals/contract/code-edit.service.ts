import { Injectable } from 'vue-service-app'
import { ContractApi } from '@/api/v1/setting/contract'
import { tap, pluck, map } from 'rxjs/operators'
import { State, Effect, Computed, getSnapshot } from 'rx-state/src'
import { forkJoin } from 'rxjs'
import { Store } from '@/services/store'
import { cloneDeep } from 'lodash-es'

interface Info {
  id: number
  _mode?: 'edit' | 'add'
  [key: string]: any
}
interface CodeEditState {
  list: Info[]
}

@Injectable()
export class CodeEditService extends Store<CodeEditState> {
  state$ = new State<CodeEditState>({
    list: [],
    editInfo: {}
  })
  list$ = new Computed(this.state$.pipe(pluck('list'))).pipe(
    map(list => cloneDeep(list))
  )
  constructor(private contractApi: ContractApi) {
    super()
  }
  get listSnapshot() {
    return getSnapshot(this.list$)
  }
  SET_LIST(list: Info[]) {
    this.state$.commit(state => {
      state.list = list
    })
  }
  editRow(id: number) {
    const idx = this.listSnapshot.findIndex(item => item.id === id)
    this.state$.commit(state => {
      state.list.forEach(item => {
        item._mode = undefined
      })
      state.list[idx]._mode = 'edit'
    })
  }
  quitEditRow(id: number) {
    const idx = this.listSnapshot.findIndex(item => item.id === id)
    this.state$.commit(state => {
      state.list[idx]._mode = undefined
    })
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
