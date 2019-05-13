import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { PackageApi, OnsalePackageInput } from '@/api/v1/course/package'
import { mergeMap, tap } from 'rxjs/operators'

@Injectable()
export class AddFixPackageService implements RouteGuard {
  loading$ = new State({})
  coachList$ = new State({})
  constructor(private packageApi: PackageApi) { }
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
  beforeRouteEnter(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.getCoachList().subscribe(() => {
      next()
    })
  }
}
