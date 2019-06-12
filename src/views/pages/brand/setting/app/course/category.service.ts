import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import {
  CourseApi,
  DeleteCourseCategoryInput,
  GetCourseCategoryListInput
} from '@/api/v1/setting/course'
import {
  AuthService
} from '@/services/auth.service'

interface ListState {
  resData: object
}
@Injectable()
export class CategoryService extends Store<ListState> {
  state$: State<ListState>
  resData$: Computed<object>
  auth$: Computed<object>
  constructor(
    private authService: AuthService,
    private courseApi: CourseApi
  ) {
    super()
    this.state$ = new State({
      resData: {},
      auth: {
        isAdd: this.authService.can('brand_shop:course:course_type|add')
      }
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  getCourseCategoryList(query: GetCourseCategoryListInput) {
    return this.courseApi.getCourseCategoryList(query).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.SET_STATE(res)
      })
    )
  }
  deleteCourseCategory(params: DeleteCourseCategoryInput) {
    return this.courseApi.deleteCourseCategory(params)
  }
  protected SET_STATE(data: ListState) {
    this.state$.commit(state => {
      state.resData = data
    })
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getCourseCategoryList({ page: to.meta.query.page, size: 100 }).subscribe(() => {
      next()
    }, () => {
      next(false)
    })
  }
}
