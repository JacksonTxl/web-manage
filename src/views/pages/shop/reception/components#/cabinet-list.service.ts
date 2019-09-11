import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { tap, pluck } from 'rxjs/operators'
import { State, Computed, Effect } from 'rx-state'
import { Store } from '@/services/store'
import { TemporaryCabinetApi } from '@/api/v1/setting/cabinet/temporary'
import { LongTermCabinetApi } from '@/api/v1/setting/cabinet/long-term'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class CabinetListService {
  state$ = new State<any>({})
  list$ = new State([])
  auth$ = this.authService.authMap$({
    edit: 'shop:cabinet:cabinet|edit'
  })
  constructor(
    private temporaryCabinetApi: TemporaryCabinetApi,
    private longTermCabinetApi: LongTermCabinetApi,
    private authService: AuthService
  ) {}
  getList(type: string, id: number) {
    const cabinetApi =
      type === 'long-term' ? this.longTermCabinetApi : this.temporaryCabinetApi
    return cabinetApi.getList(id).pipe(
      tap(res => {
        this.list$.commit(() => res.list)
      })
    )
  }
}
