import {
  Injectable,
  Controller,
  ServiceRoute,
  ServiceRouter
} from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { SmallCourseApi } from '@/api/v1/sold/small-course'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class InfoService implements Controller {
  info$ = new State({})
  id = ''
  loading$ = new State({})
  auth$ = new State({})
  authTabs$ = this.authService.getAuthTabs$(
    'shop-sold-course-info-personal-info'
  )
  constructor(
    private smallCourseApi: SmallCourseApi,
    private authService: AuthService,
    private router: ServiceRouter
  ) {}
  getInfo(id: string) {
    return this.smallCourseApi.getSmallCourseInfo(id).pipe(
      tap((res: any) => {
        res = this.authService.filter(res, 'auth')
        this.info$.commit(() => res.info)
        this.auth$.commit(() => res.auth)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute) {
    this.id = to.meta.query.id
    return this.getInfo(to.meta.query.id)
  }
}
