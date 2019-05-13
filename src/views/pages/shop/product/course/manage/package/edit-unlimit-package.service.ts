import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { PackageApi } from '@/api/v1/course/package'
import { tap } from 'rxjs/operators'

@Injectable()
export class EditUnlimitPackageService implements RouteGuard {
  loading$ = new State({})
  packageInfo$ = new State({})
  id = ''
  constructor(private packageApi: PackageApi) {}
  getPackageInfo(id: string) {
    return this.packageApi.editCoursePackageInfo('unlimited', id).pipe(tap((res:any) => {
      this.packageInfo$.commit(() => res.info)
    }))
  }
  @Effect()
  editPackage(data: any) {
    return this.packageApi.editCoursePackage(data, 'unlimited', this.id)
  }
  beforeRouteEnter(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.id = to.meta.query.id
    this.getPackageInfo(to.meta.query.id).subscribe(() => {
      next()
    })
  }
}
