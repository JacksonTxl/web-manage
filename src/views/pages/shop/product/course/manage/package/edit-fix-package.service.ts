import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { PackageApi } from '@/api/v1/course/package'
import { tap, map } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
import { UserService } from '@/services/user.service'
import { remove } from 'lodash-es'

@Injectable()
export class EditFixPackageService implements RouteGuard {
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
  packageInfo$ = new State({})
  id = ''
  constructor(
    private userService: UserService,
    private packageApi: PackageApi) {}
  getPackageInfo(id: string) {
    return this.packageApi.editCoursePackageInfo('fixation', id).pipe(tap((res:any) => {
      this.packageInfo$.commit(() => res.info)
    }))
  }
  getCoachList() {
    return this.packageApi.getCoachList().pipe(tap((res:any) => {
      this.coachList$.commit(() => res.list)
    }))
  }
  initData(id:string) {
    return forkJoin(this.getPackageInfo(id), this.getCoachList())
  }
  @Effect()
  editPackage(data: any) {
    return this.packageApi.editCoursePackage(data, 'fixation', this.id)
  }
  beforeEach(to:ServiceRoute) {
    this.id = to.meta.query.id
    return this.initData(to.meta.query.id)
  }
}
