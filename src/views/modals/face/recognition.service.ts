import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { tap, pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi, FaceCheckQuery } from '@/api/v1/member'

interface ScanState {
  is_scan: number
}
@Injectable()
export class RecognitionService extends Store<any> {
  state$: State<ScanState>
  isScan$: Computed<Number>
  constructor(protected MemberApi: MemberApi) {
    super()
    this.state$ = new State({
      isScan: 1
    })
    this.isScan$ = new Computed(this.state$.pipe(pluck('isScan')))
  }
  getMemberCheckResult(query: FaceCheckQuery) {
    return this.MemberApi.getMemberCheckResult(query).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.is_scan = res.is_scan
        })
      })
    )
  }
}
