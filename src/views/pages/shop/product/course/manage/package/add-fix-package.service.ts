import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { PackageApi, OnsalePackageInput } from '@/api/v1/course/package'
import { mergeMap, tap, map } from 'rxjs/operators'
import { UserService } from '@/services/user.service'
import { remove } from 'lodash-es'

@Injectable()
export class AddFixPackageService implements RouteGuard {
  // 是否配置了用户端
  appConfig = true
  unitList$ = this.userService.getOptions$('package_course.valid_time_unit')
  transferUnitList$ = this.userService.getOptions$('package_course.transfer_unit')
  sellTypeList$ = this.userService.getOptions$('package_course.sale_mode')
    .pipe(map(options => {
      if (!this.appConfig) {
        remove(options, i => i.value === 1)
      }
      return options
    }))
  loading$ = new State({})
  coachList$ = new State({})
  constructor(
    private userService: UserService,
    private packageApi: PackageApi) { }
  addPackage(data: any) {
    return this.packageApi.addCoursePackage(data, 'fixation')
  }
  onsalePackage(data: OnsalePackageInput) {
    return this.packageApi.onsaleCoursePackage(data)
  }
  @Effect()
  add(data: any) {
    return this.addPackage(data)
  }
  @Effect()
  addAndOnsale(data: any) {
    return this.addPackage(data).pipe(
      mergeMap((res:any) => {
        return this.onsalePackage({
          id: res.package_course_id,
          start_time: data.start_time,
          end_time: data.end_time })
      })
    )
  }
  getCoachList() {
    return this.packageApi.getCoachList().pipe(tap((res:any) => {
      this.coachList$.commit(() => res.list)
    }))
  }
  beforeEach() {
    return this.getCoachList()
  }
}
