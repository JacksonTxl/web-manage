import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberAPi, CardConsumptionQuery, CourseConsuptionQuery } from '@/api/v1/member'
import { forkJoin } from 'rxjs'

interface CardsListInfoState {
    cardsListInfo: Object,
    courseListInfo: Object
}
@Injectable()
export class ReserveService extends Store<CardsListInfoState> {
  state$: State<CardsListInfoState>
  cardsListInfo$: Computed<Object>
  courseListInfo$: Computed<Object>
  constructor(private cardsApi: MemberAPi) {
    super()
    this.state$ = new State({
      cardsListInfo: {},
      courseListInfo: {}
    })
    this.cardsListInfo$ = new Computed(this.state$.pipe(pluck('cardsListInfo')))
    this.courseListInfo$ = new Computed(this.state$.pipe(pluck('courseListInfo')))
  }

  getCardInfo(id: string, query: CardConsumptionQuery) {
    return this.cardsApi.getCardConsumption(id, query).pipe(
      tap(res => {
        console.log(res, '卡获取数据')
        this.state$.commit(state => {
          state.cardsListInfo = res
        })
      })
    )
  }
  getCourseInfo(id: string, query: CourseConsuptionQuery) {
    return this.cardsApi.getCourseConsumption(id, query).pipe(
      tap(res => {
        console.log(res, '课获取数据')
        this.state$.commit(state => {
          state.courseListInfo = res
        })
      })
    )
  }

  init(id: string, cardQuery: CardConsumptionQuery, courseQuery: CourseConsuptionQuery) {
    return forkJoin(this.getCardInfo(id, cardQuery), this.getCourseInfo(id, courseQuery))
  }

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('route enter')
    const { id } = to.meta.query
    this.init(id, { card_type: 1 }, { course_type: 1 }).subscribe(() => next())
  }
}
