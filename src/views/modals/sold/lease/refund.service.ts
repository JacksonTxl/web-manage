import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { CabinetApi } from '@/api/v1/sold/cabinet'
import { tap } from 'rxjs/operators'

@Injectable()
export class RefundService {
  info$ = new State({})
  loading$ = new State({})
  constructor(private cabinetApi: CabinetApi) {}
  getDetail(id:number) {
    return this.cabinetApi.getDetail(id, 'refund').pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
}
