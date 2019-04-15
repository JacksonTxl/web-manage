import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { PersonalApi, GetPersonalBrandCourseListInput } from '@/api/v1/course/personal'
import { tap, pluck } from 'rxjs/operators'
import { State, Computed } from 'rx-state/src'
@Injectable()
export class BrandService {
  state$: State<any>
  personalCourseList$: Computed<any>
  constructor(private personalApi: PersonalApi) {
    this.state$ = new State({
      personalCourseList: []
    })
    this.personalCourseList$ = new Computed(this.state$.pipe(pluck('personalCourseList')))
  }
  SET_PERSONAL_COURSE_LIST(data: any) {
    this.state$.commit(state => {
      state.personalCourseList = data.list
    })
  }
  getCoursePersonalBrandList(params: GetPersonalBrandCourseListInput) {
    return this.personalApi.getPersonalBrandCourseList(params).pipe(
      tap(state => {
        this.SET_PERSONAL_COURSE_LIST(state)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getCoursePersonalBrandList({}).subscribe(state$ => next())
  }
}
