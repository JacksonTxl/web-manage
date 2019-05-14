import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberAPi, CouponQuery } from '@/api/v1/member'

interface CouponListInfoState {
  couponList: Object
}
@Injectable()

export class SalesInterestsService extends Store<CouponListInfoState> {
  state$: State<CouponListInfoState>
  couponList$: Computed<Object>
  constructor(private cardsApi: MemberAPi) {
    super()
    this.state$ = new State({
      couponList: {}
    })
    this.couponList$ = new Computed(this.state$.pipe(pluck('couponList')))
  }

  getCouponInfo(id: string, query: CouponQuery) {
    return this.cardsApi.getCouponList(id, query).pipe(
      tap(res => {
        console.log(res, '卡获取数据')
        this.state$.commit(state => {
          state.couponList = res
        })
      })
    )
  }
  beforeRouteUpdate(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('==', to)
    console.log('==', from)
    let { id, page, size } = to.meta.query
    this.getCouponInfo(id, { page, size }).subscribe(() => next())
    // next()
  }

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('route enter', to.meta)
    const { id } = to.meta.query
    this.getCouponInfo(id, {}).subscribe(() => next())
  }
}
