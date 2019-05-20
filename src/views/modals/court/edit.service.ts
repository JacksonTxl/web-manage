import { Injectable } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CourtApi, SetInput } from '@/api/v1/shop/area'

interface EditState {
  info: object
}
@Injectable()
export class EditService extends Store<EditState> {
  state$: State<EditState>
  info$: Computed<object>
  constructor(protected courtApi: CourtApi) {
    super()
    this.state$ = new State({
      info: {}
    })
    this.info$ = new Computed(this.state$.pipe(pluck('info')))
  }
  getInfo(id: number) {
    return this.courtApi.getInfo(id).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.info = res.info
        })
      })
    )
  }
  @Effect()
  update(params: SetInput) {
    return this.courtApi.update(params)
  }
}
