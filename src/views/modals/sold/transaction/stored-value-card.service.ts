
import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { StoredValueCardApi } from '@/api/v1/sold/stored-value-card'
import { tap } from 'rxjs/operators'

@Injectable()
export class StoredValueCardService {
  loading$ = new State({})
  storedCardInfo$ = new State({});
  constructor(private storedValueCardApi: StoredValueCardApi) { }
  /* 储值卡详情 */
  @Effect()
  getStoredValueCardInfo(id: number) {
    return this.storedValueCardApi.getStoredValueCardInfo(id).pipe(tap((result:any) => {
      this.storedCardInfo$.commit(() => result.info)
    }))
  }
}
