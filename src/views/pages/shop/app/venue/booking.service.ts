import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { AREA_STATUS } from '@/constants/venue'
import {
  VenueApi,
  BookingQuery,
  PriceParams,
  CreateOrderParams
} from '@/api/v1/venue'
@Injectable()
export class BookingService {
  venueList$ = new State([])
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    reserve: 'shop:reserve:venues_reserve|add',
    pay: 'shop:reserve:venues_reserve|add_pay'
  })
  hasNext$ = new State({})
  constructor(private venueApi: VenueApi, private authService: AuthService) {}
  getVenueList() {
    return this.venueApi.getVenueList({ status: AREA_STATUS.ON }).pipe(
      tap(res => {
        this.venueList$.commit(() => res.list)
      })
    )
  }
  @Effect()
  getBookingList(query: BookingQuery) {
    return this.venueApi.getBookingList(query).pipe(
      tap(res => {
        this.hasNext$.commit(() => res.page.current_page < res.page.total_pages)
      })
    )
  }
  @Effect()
  createOrder(params: CreateOrderParams) {
    return this.venueApi.createOrder(params)
  }
  @Effect()
  createPay(params: CreateOrderParams) {
    return this.venueApi.createOrder(params)
  }
  @Effect()
  calcPrice(params: PriceParams) {
    return this.venueApi.calcPrice(params)
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.getVenueList()
  }
}
