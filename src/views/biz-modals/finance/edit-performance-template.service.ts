import { Injectable, ServiceRoute } from 'vue-service-app'
import { FinanceApi, AddPerformanceParams } from '@/api/v1/finance'
import { Store } from '@/services/store'
import { State, Computed, log } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'

interface UserState {
  info: object
}

@Injectable()
export class EditTemplateService {
  // state$: State<UserState>
  // info$: Computed<object>
  constructor(private MemberApi: FinanceApi) {
    // super()
    // this.state$ = new State({
    // info: {}
    // })
    // this.info$ = new Computed(this.state$.pipe(pluck('info')))
  }
  editTemplate(id: any, params: AddPerformanceParams) {
    return this.MemberApi.editPerformance(id, params)
  }
  // getInfo(id: any){
  //   return this.MemberApi.getPerformanceInfo(id).pipe(
  //     tap(res => {
  //       this.state$.commit(state => {
  //         state.info = res.info
  //       })
  //     })
  //   )
  // }

  getInfo(id: any) {
    return this.MemberApi.getPerformanceInfo(id)
  }
}
