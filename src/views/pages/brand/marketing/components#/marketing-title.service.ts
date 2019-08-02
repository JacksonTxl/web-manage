import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'

@Injectable()
export class MarketingTitleService {
  info$ = new State({})
  loading$ = new State({})
  constructor(private marketingApi: MarketingApi) {}
  @Effect()
  getPluginInfo(type: number) {
    return this.marketingApi.getPluginInfo(type).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
}
