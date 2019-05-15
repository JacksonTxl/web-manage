import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { PackageApi } from '@/api/v1/course/package'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class EditFixPackageService implements RouteGuard {
  loading$ = new State({})
  coachList$ = new State({})
  packageInfo$ = new State({})
  id = ''
  constructor(private packageApi: PackageApi) {}
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
  beforeRouteEnter(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.id = to.meta.query.id
    this.initData(to.meta.query.id).subscribe(() => {
      next()
    })
  }
}
