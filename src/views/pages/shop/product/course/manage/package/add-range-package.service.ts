import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { PackageApi, OnsalePackageInput } from '@/api/v1/course/package'
import { mergeMap } from 'rxjs/operators'

@Injectable()
export class AddRangePackageService {
  loading$ = new State({})
  constructor(private packageApi: PackageApi) { }
  addPackage(data: any) {
    return this.packageApi.AddCoursePackage(data, 'range')
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
}
