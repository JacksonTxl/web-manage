import { ListService } from './../list.service'
import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { tap } from 'rxjs/operators'
import { State, Effect, log } from 'rx-state'
import { BrandTeamCourseApi } from '@/api/v1/course/team/brand'
import { AuthService } from '@/services/auth.service'
import { forkJoin } from 'rxjs'

@Injectable()
export class BrandService implements Controller {
  // loading
  loading$ = new State({})
  // 业务状态
  list$ = new State([])
  page$ = new State({})

  auth$ = this.authService.authMap$({
    add: 'brand_shop:product:team_course|add'
  })
  categoryList$ = this.listService.categoryList$
  constructor(
    private brandTeamCourseApi: BrandTeamCourseApi,
    private listService: ListService,
    private authService: AuthService
  ) {}
  deleteCourse(courseId: string) {
    return this.brandTeamCourseApi.deleteCourse(courseId)
  }
  @Effect()
  getList(query: any) {
    return this.brandTeamCourseApi.getTeamCourseList(query).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  init(query: any) {
    return forkJoin(this.getList(query))
  }
  beforeEach(to: ServiceRoute) {
    return this.init({ ...to.query })
  }
}
