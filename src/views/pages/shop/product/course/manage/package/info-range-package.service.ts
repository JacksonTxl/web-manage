import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { PackageApi } from '@/api/v1/course/package'
import { tap } from 'rxjs/operators'

@Injectable()
export class InfoRangePackageService implements RouteGuard {
  packageInfo$ = new State({})
  constructor(private packageApi: PackageApi) { }
  info(id:string) {
    return this.packageApi.getCoursePackageInfo('range', id).pipe(tap((res:any) => {
      res.info.personal_range.forEach((i:any) => {
        let coach:string[] = []
        i.coach_level.forEach((o:any) => {
          coach.push(o.setting_name)
        })
        i.coach_level_text = coach.join('/')
      })
      this.packageInfo$.commit(() => res.info)
    }))
  }
  beforeRouteEnter(to:ServiceRoute) {
    return this.info(to.meta.query.id)
  }
}
