import { Controller, ServiceRoute, Injectable } from 'vue-service-app'
import { State } from 'rx-state'
import { tap, map } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
import { CourseGroupApi } from '@/api/v1/course/group'
import { AuthService } from '@/services/auth.service'
import { RedirectService } from '@/services/redirect.service'
import { CourseApi } from '@/api/v1/special/course'

@Injectable()
export class ListService implements Controller {
  // loading
  loading$ = new State({})
  // 业务状态
  list$ = new State([])
  page$ = new State({})

  auth$ = this.authService.authMap$({
    add: 'shop:product:team_course|add'
  })
  constructor(
    private courseApi: CourseApi,
    private courseGroupApi: CourseGroupApi,
    private authService: AuthService
  ) {}

  getList(params: any) {
    return this.courseGroupApi.getList(params).pipe(
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
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query)
  }
  // beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
  //   this.initOptions().subscribe(() => {
  //     console.log(to.name)
  //     if (to.name === 'brand-product-course-group-list') {
  //       next({
  //         name: 'brand-product-course-group-list-brand'
  //       })
  //     } else {
  //       next()
  //     }
  //   })
  // }
}
