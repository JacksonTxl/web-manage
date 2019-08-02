import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { PackageApi } from '@/api/v1/course/package'
import { tap } from 'rxjs/operators'
import { reduce } from 'lodash-es'

@Injectable()
export class InfoFixPackageService implements RouteGuard {
  packageInfo$ = new State({})
  constructor(private packageApi: PackageApi) {}
  info(id: string) {
    return this.packageApi.getCoursePackageInfo('fixation', id).pipe(
      tap((res: any) => {
        res.info.team_times_total = reduce(
          res.info.team_range,
          (sum, o) => sum + +o.team_times,
          0
        )
        res.info.team_unit_price_total = reduce(
          res.info.team_range,
          (sum, o) => sum + o.team_times * o.team_unit_price,
          0
        )
        res.info.personal_times_total = reduce(
          res.info.personal_range,
          (sum, o) => sum + +o.personal_times,
          0
        )
        res.info.personal_unit_price_total = reduce(
          res.info.personal_range,
          (sum, o) => sum + o.personal_times * o.personal_unit_price,
          0
        )
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
