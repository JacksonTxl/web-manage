import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { ContractApi } from '@/api/v1/setting/contract'
import { forkJoin } from 'rxjs'
import { tap } from 'rxjs/operators'
import { State, log } from 'rx-state/src'

@Injectable()
export class EditService implements RouteGuard {
  info$ = new State({})
  constructor(private contractApi: ContractApi) {}
  getInfo(id: number) {
    return this.contractApi.getInfo(id).pipe(
      tap(res => {
        this.info$.commit(() => res)
      })
    )
  }
  init(id: number) {
    return forkJoin(this.getInfo(id))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init(to.meta.query.id).subscribe(() => {
      next()
    })
  }
}
