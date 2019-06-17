import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { PackageApi, GetPackageListInput, OnsalePackageInput } from '@/api/v1/course/package'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class ListService implements RouteGuard {
  list$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  auth$ = new State({
    add: this.authService.can('shop:product:package_course|add')
  })
  constructor(
    private packageApi: PackageApi,
    private authService: AuthService
  ) {}
  getList(params: GetPackageListInput) {
    return this.packageApi.getList(params).pipe(tap((res:any) => {
      this.auth$.commit(() => res.auth)
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }
  @Effect()
  offsalePackage(id:string) {
    return this.packageApi.offsaleCoursePackage(id)
  }
  @Effect()
  deletePackage(id:string) {
    return this.packageApi.deleteCoursePackage(id)
  }
  @Effect()
  onsalePackage(params:OnsalePackageInput) {
    return this.packageApi.onsaleCoursePackage(params)
  }
  beforeEach(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.getList(to.meta.query).subscribe(() => {
      next()
    })
  }
}
