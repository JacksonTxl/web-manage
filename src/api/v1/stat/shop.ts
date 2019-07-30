import { HttpService } from '@/services/http.service'
import { AppConfig } from '@/constants/config'
import { Injectable } from 'vue-service-app'
@Injectable()
export class StatApi {
  constructor(protected http: HttpService, protected appConfig: AppConfig) {}
  getRevenueShopList(query: RevenueShopListQuery) {
    return this.http.get('/v1/stat/revenue/shop', { query })
  }
  getRevenueShopToday(query: RevenueShopTodayQuery) {
    return this.http.get('/v1/stat/revenue/shop/today', { query })
  }
  getOrderShopList(query: OrderShopListQuery) {
    return this.http.get('/v1/stat/order/shop', { query })
  }
}
export interface RevenueShopListQuery {
  page?: number
  size?: number
  day?: number
  start_date: string
  end_date: string
}
export interface OrderShopListQuery {
  page?: number
  size?: number
  day?: number
  start_date: string
  end_date: string
}
export interface RevenueShopTodayQuery {}
