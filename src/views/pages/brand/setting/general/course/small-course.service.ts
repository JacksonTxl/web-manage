import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { GroupReserveSettingApi } from '@/api/v1/setting/course/group/reserve'
import { AuthService } from '@/services/auth.service'
import { forkJoin } from 'rxjs'

@Injectable()
export class SmallCourseService {
  reserveInfo$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    edit: 'brand:setting:small_course_reserve_setting|edit',
    get: 'brand:setting:small_course_reserve_setting|get'
  })
  constructor(
    private reserveSettingApi: GroupReserveSettingApi,
    private authService: AuthService
  ) {}
  getInfo() {
    return this.reserveSettingApi.getInfo().pipe(
      tap((res: any) => {
        this.reserveInfo$.commit(() => res.info)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getInfo()
  }
}
