import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CrowdAPI } from '@/api/v1/crowd'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'

interface CrowdIndexState {
  crowdIndexInfo: any
}
@Injectable()
export class IndexService extends Store<CrowdIndexState> {
  state$: State<CrowdIndexState>
  crowdIndexInfo$: Computed<string>
  auth$ = this.authService.authMap$({
    analyst: 'shop:member:crowd|analyst',
    export: 'shop:member:crowd|export'
  })
  constructor(private crowdAPI: CrowdAPI, private authService: AuthService) {
    super()
    this.state$ = new State({
      crowdIndexInfo: {}
    })
    this.crowdIndexInfo$ = new Computed(this.state$.pipe(pluck('crowdIndexInfo')))
  }
  SET_CARDS_LIST_INFO(crowdIndexInfo: CrowdIndexState) {
    console.log(crowdIndexInfo)
    this.state$.commit(state => {
      state.crowdIndexInfo = crowdIndexInfo
    })
  }
  // 获取列表

  getListInfo(id: string) {
    return this.crowdAPI.crowdShopExport(id)
  }
}
