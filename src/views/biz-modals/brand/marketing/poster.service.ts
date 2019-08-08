import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'

@Injectable()
export class PosterService {
  token$ = new State({})
  info$ = new State({})
  loading$ = new State({})
  qrcode$ = new State({})
  constructor(protected marketingApi: MarketingApi) {}
  getPosterInfo(id: number) {
    return this.marketingApi.getPosterInfo(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  getQrcode() {
    return this.marketingApi.getQrcode().pipe(
      tap((res: any) => {
        this.qrcode$.commit(() => res.qrcode)
      })
    )
  }
}
