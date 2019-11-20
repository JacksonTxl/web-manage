import {
  Injectable,
  Controller,
  ServiceRoute,
  ServiceRouter
} from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { CourseApi } from '@/api/v1/sold/course'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { combineLatest } from 'rxjs'
@Injectable()
export class InfoService implements Controller {
  personalInfo$ = new State({})
  id = ''
  loading$ = new State({})
  auth$ = new State({})
  authTabs$ = this.authService.getAuthTabs$(
    'shop-sold-course-info-personal-info'
  )
  pageAuthTabs$ = new Computed(
    combineLatest(this.authTabs$, authTabs =>
      authTabs.map((tab: any) => {
        const query = this.router.to.meta.query
        tab.route.query = { id: query.id }
        return tab
      })
    )
  )
  constructor(
    private courseApi: CourseApi,
    private authService: AuthService,
    private router: ServiceRouter
  ) {}
  getPackageInfo(id: string, type: string) {
    return this.courseApi.getCourseInfo(id, type).pipe(
      tap((res: any) => {
        res = this.authService.filter(res, 'auth')
        this.personalInfo$.commit(() => res.info)
        this.auth$.commit(() => res.auth)
      })
    )
  }
  unFreeze(id: string) {
    return this.courseApi.unFreezeCourse(id, 'personal')
  }
  beforeRouteEnter(to: ServiceRoute) {
    this.id = to.meta.query.id
    return this.getPackageInfo(to.meta.query.id, 'personal')
  }
}
