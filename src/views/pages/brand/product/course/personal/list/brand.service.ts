import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { PersonalApi, GetPersonalBrandCourseListInput, SetAvailableInput } from '@/api/v1/course/personal'
import { forkJoin } from 'rxjs'
import { tap, pluck } from 'rxjs/operators'
import { State, Computed, Effect } from 'rx-state/src'
import { Store } from '@/services/store'
import { CourseApi } from '@/api/v1/setting/course'
import { ShopApi } from '@/api/v1/shop'
export interface SetState {
  personalCourseList: any[],
  categoryList: any[]
}
@Injectable()
export class BrandService extends Store<SetState> {
  state$: State<SetState>
  personalCourseList$: Computed<any>
  categoryList$: Computed<any>
  constructor(private personalApi: PersonalApi, private courseApi: CourseApi, private shopApi: ShopApi) {
    super()
    this.state$ = new State({
      personalCourseList: [],
      categoryList: []
    })
    this.personalCourseList$ = new Computed(this.state$.pipe(pluck('personalCourseList')))
    this.categoryList$ = new Computed(this.state$.pipe(pluck('categoryList')))
  }
  SET_PERSONAL_COURSE_LIST(data: any) {
    this.state$.commit(state => {
      state.personalCourseList = data.list
    })
  }
  SET_CATEGORY_LIST(data: any) {
    this.state$.commit(state => {
      state.categoryList = data.list
    })
  }
  getCategoryList() {
    return this.courseApi.getCourseCategoryList({})
  }
  setAvailableInBrand(params: SetAvailableInput) {
    return this.personalApi.setAvailableInBrand(params)
  }
  deleteCourse(courseId: string) {
    return this.personalApi.deleteCourse(courseId)
  }
  @Effect()
  getCoursePersonalBrandList(params: GetPersonalBrandCourseListInput) {
    return this.personalApi.getCourseListInBrand(params).pipe(
      tap(state => {
        this.SET_PERSONAL_COURSE_LIST(state)
      })
    )
  }
  init(query: any) {
    return forkJoin(this.getCoursePersonalBrandList(query), this.getCategoryList()).pipe(tap(state => {
      this.SET_CATEGORY_LIST(state[1])
    }))
  }
  beforeRouteUpdate(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getCoursePersonalBrandList(to.query).subscribe(state$ => next())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init(to.query).subscribe(state$ => next())
  }
}
