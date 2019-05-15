import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { PackageApi, GetPackageListInput } from '@/api/v1/course/package'
import { tap } from 'rxjs/operators'
import { RouteService } from '@/services/route.service'

@Injectable()
export class ListService implements RouteGuard {
  list$ = new State({})
  page$ = new State({})
  constructor(private packageApi: PackageApi, private routeService:RouteService) {}
  getList(params: GetPackageListInput) {
    return this.packageApi.getList(params).pipe(tap((res:any) => {
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }
  beforeEach(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.getList(to.meta.query).subscribe(() => {
      next()
    })
  }
}
