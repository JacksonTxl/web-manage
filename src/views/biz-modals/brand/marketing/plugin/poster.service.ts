import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { LotteryApi } from '@/api/v1/marketing/lottery'

@Injectable()
export class PosterService {
  token$ = new State({})
  info$ = new State({})
  loading$ = new State({})
  qrcode$ = new State({})
  constructor(protected lotteryApi: LotteryApi) {}
  getPosterInfo(id: number) {
    return this.lotteryApi.getPosterInfo(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  getQrcode() {
    return this.lotteryApi.getQrcode().pipe(
      tap((res: any) => {
        this.qrcode$.commit(() => res.qrcode)
      })
    )
  }
}
