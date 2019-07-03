
import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'

@Injectable()
export class StoredValueCardService {
  loading$ = new State({})
  storedCardInfo$ = new State({});
  constructor() { }
  /* 储值卡详情 */
  @Effect()
  getStoredValueCardInfo(id: number) {
    // return this.storedValueCardApi.getStoredValueCardInfo(id).pipe(tap((result:any) => {
    //   this.storedCardInfo$.commit(() => result.info)
    // }))
  }
}
