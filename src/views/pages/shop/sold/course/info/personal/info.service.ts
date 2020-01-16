import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { CourseApi } from '@/api/v1/sold/course'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class InfoService implements Controller {
  personalInfo$ = new State({})
  id = ''
  loading$ = new State({})
  auth$ = new State({})
  authTabs$ = this.authService.getAuthTabs$(
    'shop-sold-course-info-personal-info',
    {
      withQuery: ['id']
    }
  )
  constructor(private courseApi: CourseApi, private authService: AuthService) {}
  getPackageInfo(id: string, type: string) {
    return this.courseApi.getCourseInfo(id, type).pipe(
      tap((res: any) => {
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
