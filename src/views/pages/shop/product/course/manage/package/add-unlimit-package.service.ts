import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { PackageApi } from '@/api/v1/course/package'

@Injectable()
export class AddUnlimitPackageService {
  loading$ = new State({})
  constructor(private packageApi: PackageApi) {}
  @Effect()
  addPackage(data: any) {
    return this.packageApi.AddCoursePackageUnlimited(data)
  }
}
