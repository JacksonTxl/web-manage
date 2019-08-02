import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import {
  MemberApi,
  CardConsumptionQuery,
  CourseConsuptionQuery
} from '@/api/v1/member'
import { forkJoin } from 'rxjs'

@Injectable()
export class ReserveService implements RouteGuard {
  cardsListInfo$ = new State([])
  cardPage$ = new State({})
  courseListInfo$ = new State([])
  coursePage$ = new State({})
  constructor(private cardsApi: MemberApi) {}

  getCardInfo(id: string, query: CardConsumptionQuery) {
    return this.cardsApi.getCardConsumption(id, query).pipe(
      tap(res => {
        console.log(res, '卡获取数据')
        this.cardsListInfo$.commit(() => res.list)
        this.cardPage$.commit(() => res.page)
      })
    )
  }
  getCourseInfo(id: string, query: CourseConsuptionQuery) {
    return this.cardsApi.getCourseConsumption(id, query).pipe(
      tap(res => {
        console.log(res, '课获取数据')
        this.courseListInfo$.commit(() => res.list)
        this.coursePage$.commit(() => res.page)
      })
    )
  }

  init(
    id: string,
    cardQuery: CardConsumptionQuery,
    courseQuery: CourseConsuptionQuery
  ) {
    return forkJoin(
      this.getCardInfo(id, cardQuery),
      this.getCourseInfo(id, courseQuery)
    )
  }

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    console.log('route enter')
    const { id } = to.meta.query
    return this.init(id, { card_type: 1 }, { course_type: 1 })
  }
}
