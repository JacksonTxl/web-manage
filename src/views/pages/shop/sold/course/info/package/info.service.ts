import {
  Injectable,
  Controller,
  ServiceRoute,
  ServiceRouter
} from 'vue-service-app'
import { State } from 'rx-state'
import { CourseApi } from '@/api/v1/sold/course'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class InfoService implements Controller {
  packageInfo$ = new State({})
  loading$ = new State({})
  auth$ = new State({})
  id = ''
  authTabs$ = this.authService.getAuthTabs$(
    'shop-sold-course-info-package-info',
    {
      withQuery: ['id']
    }
  )
  constructor(private courseApi: CourseApi, private authService: AuthService) {}
  getPackageInfo(id: string, type: string) {
    return this.courseApi.getCourseInfo(id, type).pipe(
      tap((res: any) => {
        res = this.authService.filter(res, 'auth')
        this.packageInfo$.commit(() => res.info)
        this.auth$.commit(() => res.auth)
      })
    )
  }
  unFreeze(id: string) {
    return this.courseApi.unFreezeCourse(id, 'package')
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    this.id = to.meta.query.id
    return this.getPackageInfo(to.meta.query.id, 'package')
  }
}
