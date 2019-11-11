import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StaffApi } from '@/api/v1/staff'
import { cloneDeep } from 'lodash-es'

@Injectable()
export class BasicService implements Controller {
  basicInfo$ = new State({})
  constructor(private staffApi: StaffApi) {}

  private formatInfo(commonInfo: any) {
    for (let key in commonInfo) {
      if (
        commonInfo[key] &&
        Array.isArray(commonInfo[key]) &&
        key !== 'image_personal'
      ) {
        commonInfo[key] =
          commonInfo[key].length > 0 ? commonInfo[key].join(' / ') : '--'
      }
      !commonInfo[key] && (commonInfo[key] = '--')
    }
    return commonInfo
  }
  getBasicInfo(id: string) {
    return this.staffApi.getStaffInfo(id).pipe(
      tap(res => {
        this.basicInfo$.commit(() =>
          this.formatInfo(cloneDeep(res.common_info))
        )
      })
    )
  }

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    const { id } = to.meta.query
    return this.getBasicInfo(id)
  }
}
