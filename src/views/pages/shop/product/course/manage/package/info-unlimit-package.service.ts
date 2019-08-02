import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { PackageApi } from '@/api/v1/course/package'
import { tap } from 'rxjs/operators'

@Injectable()
export class InfoUnlimitPackageService implements RouteGuard {
  packageInfo$ = new State({})
  constructor(private packageApi: PackageApi) {}
  info(id: string) {
    return this.packageApi.getCoursePackageInfo('unlimited', id).pipe(
      tap((res: any) => {
        this.packageInfo$.commit(() => res.info)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: () => {}) {
    this.info(to.meta.query.id).subscribe(() => {
      next()
    })
  }
}
