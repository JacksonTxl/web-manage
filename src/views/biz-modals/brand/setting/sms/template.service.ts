import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { GroupApi } from '@/api/v1/setting/sms/group'
@Injectable()
export class TemplateService {
  loading$ = new State({})
  constructor(private GroupApi: GroupApi) {}
  @Effect()
  addTemplate(query: any) {
    return this.GroupApi.addTemplate(query).pipe()
  }
  editTemplate(query: any) {
    return this.GroupApi.editTemplate(query).pipe()
  }
}
