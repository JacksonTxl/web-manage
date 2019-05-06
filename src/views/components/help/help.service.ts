import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { Effect } from 'rx-state/src'
import {
  HelpApi,
  GetHelpInput
} from '@/api/v1/help'
interface HelpState {
  resData: object
}
@Injectable()
export class HelpService extends Store<HelpState> {
  state$: State<HelpState>
  resData$: Computed<Object>
  constructor(private helpApi: HelpApi) {
    super()
    this.state$ = new State({
      resData: []
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
  }
  @Effect()
  getHelp(id: GetHelpInput) {
    return this.helpApi.getHelp(id).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.resData = res
        })
      })
    )
  }
}
