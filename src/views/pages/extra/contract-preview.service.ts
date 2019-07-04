import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { ContractApi, ID } from '@/api/v1/order/transaction/contract'
import { tap } from 'rxjs/operators'
import { State } from 'rx-state'

@Injectable()
export class ContractPreviewService {
  info$ = new State({});
  constructor(private contractApi: ContractApi) { }
  getInfo(id:ID) {
    return this.contractApi.getInfo(id).pipe(
      tap(res => {
        this.info$.commit(() => res)
      })
    )
  }
}
