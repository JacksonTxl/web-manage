import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { GroupApi } from '@/api/v1/setting/sms/group'
import { UserService } from '@/services/user.service'

@Injectable()
export class GroupService {
  loading$ = new State({})
  notifyType$ = this.userService.getOptions$('setting.notify_type')

  constructor(private GroupApi: GroupApi, private userService: UserService) {}
  @Effect()
  addTemplate(query: any) {
    return this.GroupApi.addTemplate(query).pipe()
  }
}
