import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CourtApi, SetInput } from '@/api/v1/shop/area'

@Injectable()
export class EditService {
  loading$ = new State({})
  info$ = new State({})
  constructor(protected courtApi: CourtApi) {}
  getInfo(id: number) {
    return this.courtApi.getInfo(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  @Effect()
  update(params: SetInput) {
    return this.courtApi.update(params)
  }
}
