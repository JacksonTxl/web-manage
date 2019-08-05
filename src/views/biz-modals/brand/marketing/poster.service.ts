import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { Store } from '@/services/store'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class PosterService {
  token$ = new State({})
  info$ = new State({})
  loading$ = new State({})
  qrcode$ = new State({})
  constructor(protected marketingApi: MarketingApi) {}
  @Effect()
  getToken() {
    return this.marketingApi.getToken().pipe(
      tap((res: any) => {
        this.token$.commit(() => res.response.data.token)
      })
    )
  }
  getPosterInfo(id: number) {
    return this.marketingApi.getPosterInfo(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  serviceInit(id: number) {
    return forkJoin(this.getPosterInfo(id), this.getToken())
  }
  getQrcode() {
    return this.marketingApi.getQrcode().pipe(
      tap((res: any) => {
        this.qrcode$.commit(() => res.qrcode)
      })
    )
  }
}
