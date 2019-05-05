import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { Effect } from 'rx-state/src'
import {
  PersonalCourseApi
} from '@/api/v1/course/personal'
interface SetState {
  resData: object
}
@Injectable()
export class SetPriceService extends Store<SetState> {
  state$: State<SetState>
  resData$: Computed<Object>
  constructor(private personalCourseApi: PersonalCourseApi) {
    super()
    this.state$ = new State({
      resData: []
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
  }
  @Effect()
  getSetting() {
    return this.personalCourseApi.getSetting().pipe(
      tap(res => {
        this.state$.commit(state => {
          state.resData = res
        })
      })
    )
  }
}
