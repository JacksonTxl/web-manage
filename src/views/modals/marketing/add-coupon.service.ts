import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { MarketingApi, InviteCouponListInput } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'

@Injectable()
export class AddCouponService {
    loading$ = new State({})
    list$ = new State([])
    constructor(private marketingApi:MarketingApi) {}
    @Effect()
    getList(query:InviteCouponListInput) {
      return this.marketingApi.getInviteCouponList(query).pipe(tap((res:any) => {
        this.list$.commit(() => res.list)
      }))
    }
}
