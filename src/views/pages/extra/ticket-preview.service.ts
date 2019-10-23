import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { ReserveApi } from '@/api/v1/front/reserve'
import { tap } from 'rxjs/operators'
import { State } from 'rx-state'

@Injectable()
export class TicketPreviewService {
  info$ = new State({})
  constructor(private reserveApi: ReserveApi) {}
  getPrintInfo(id: any) {
    return this.reserveApi.getPrintInfo(id).pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
}
