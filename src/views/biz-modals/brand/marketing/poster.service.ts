import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'
import { PosterApi } from '@/api/v1/marketing/poster'

@Injectable()
export class PosterService {
  token$ = new State({})
  info$ = new State({})
  loading$ = new State({})
  qrCode$ = new State({})
  constructor(protected api: PosterApi) {}
  // getPosterInfo(id: number, type: string) {
  //   if (type === 'signUp') {
  //     return this.getSignUpPosterInfo(id)
  //   } else if (type === 'wheel') {
  //     return this.getWheelPosterInfo(id)
  //   } else if (type === 'coupon') {
  //     return this.getCouponPosterInfo(id)
  //   }
  //   return
  // }
  // getQrCode(id: number, type: string) {
  //   letaction
  //   if (type === 'signUp') {
  //     return this.getSignUpQrCode(id)
  //   } else if (type === 'wheel') {
  //     return this.getWheelQrCode(id)
  //   } else if (type === 'coupon') {
  //     return this.getCouponQrCode()
  //   }
  //   return ''
  // }
  // getPosterInfo(id: number, type: string) {
  //   return this.api.getPosterInfo(id, type).pipe(
  //     tap((res: any) => {
  //       this.info$.commit(() => res.info)
  //     })
  //   )
  // }
  // getQrCode(id: number, type: string) {
  //   return this.api.getQrCode(id, type).pipe(
  //     tap((res: any) => {
  //       this.qrCode$.commit(() => res.qrcode)
  //     })
  //   )
  // }
}
