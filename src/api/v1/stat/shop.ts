import { HttpService } from '@/services/http.service'
import { AppConfig } from '@/constants/config'
import { Injectable } from 'vue-service-app'
@Injectable()
export class StatApi {
  constructor(protected http: HttpService, protected appConfig: AppConfig) {}
  getRevenueShopList(query: RevenueShopListQuery) {
    return this.http.get('/v1/stat/revenue/shop', { query })
  }
  getFinanceShopList(query: FinanceShopListQuery) {
    return this.http.get('/v1/stat/finance/shop', { query })
  }
  getCourseList(query: CourseShopListQuery) {
    return this.http.get('/v1/stat/course/shop', { query })
  }
  getDepartmentList() {
    return this.http.get('/v1/stat/course/shop/department')
  }
  getCoachList() {
    return this.http.get('/v1/stat/course/shop/department/coach')
  }
  getCourseCoachShopList(query: CourseShopListQuery) {
    return this.http.get('/v1/stat/course/shop/coach', { query })
  }
  getRevenueShopToday(query: RevenueShopTodayQuery) {
    return this.http.get('/v1/stat/revenue/shop/today', { query })
  }
  getOrderShopList(query: OrderShopListQuery) {
    return this.http.get('/v1/stat/order/shop', { query })
  }

  getPersonalCourse(query: PersonalCourseQuery) {
    return this.http.get('v1/stat/course/shop/personal/course', {
      query
    })
  }
  getPersonalConsume(query: PersonalConsumeQuery) {
    return this.http.get('v1/stat/course/shop/personal/checkin/amount', {
      query
    })
  }
  getTeamCourse(query: TeamCourseQuery) {
    return this.http.get('v1/stat/course/shop/team/course', { query })
  }
  getTeamConsume(query: TeamConsumeQuery) {
    return this.http.get('v1/stat/course/shop/team/checkin/amount', {
      query
    })
  }
}
export interface PersonalCourseQuery {
  current_page?: number
}
export interface PersonalConsumeQuery {}
export interface TeamCourseQuery {}
export interface TeamConsumeQuery {}
export interface RevenueShopListQuery {
  page?: number
  size?: number
  day?: number
  start_date: string
  end_date: string
}
export interface FinanceShopListQuery {
  page?: number
  size?: number
  recently_day?: number
  start_date: string
  end_date: string
}
export interface CourseShopListQuery {
  page?: number
  size?: number
  recently_day?: number
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
