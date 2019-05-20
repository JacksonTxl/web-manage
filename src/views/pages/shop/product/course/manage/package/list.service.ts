import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { PackageApi, GetPackageListInput, OnsalePackageInput } from '@/api/v1/course/package'
import { tap } from 'rxjs/operators'

@Injectable()
export class ListService implements RouteGuard {
  list$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  constructor(private packageApi: PackageApi) {}
  getList(params: GetPackageListInput) {
    return this.packageApi.getList(params).pipe(tap((res:any) => {
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
