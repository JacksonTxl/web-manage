import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { GroupApi } from '@/api/v1/setting/sms/group'
import { tap } from 'rxjs/operators'

@Injectable()
export class TemplateService {
  loading$ = new State({})
  sign$ = new State({})
  constructor(private GroupApi: GroupApi) {}
  @Effect()
  addTemplate(query: any) {
    return this.GroupApi.addTemplate(query).pipe()
  }
  editTemplate(query: any) {
    return this.GroupApi.editTemplate(query).pipe()
  }
  getSmsSign() {
    return this.GroupApi.getSmsSign().pipe(
      tap((res: any) => {
        this.sign$.commit(() => res.info.sign_name)
      })
    )
  }
}
