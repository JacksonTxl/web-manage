import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { GroupApi, GroupTemplateQuery } from '@/api/v1/setting/sms/group'
import { UserService } from '@/services/user.service'
import { tap } from 'rxjs/operators'

@Injectable()
export class GroupService {
  loading$ = new State({})
  crowdList$ = new State({})
  templateList$ = new State([])
  info$ = new State([])
  userType$ = this.userService.getOptions$('sms_group.user_type')
  tmplType$ = this.userService.getOptions$('sms_group.tmpl_type')
  sendType$ = this.userService.getOptions$('sms_group.send_type')

  constructor(private GroupApi: GroupApi, private userService: UserService) {}
  @Effect()
  getCrowdList(query: any) {
    return this.GroupApi.getCrowdList(query).pipe(
      tap((res: any) => {
        this.crowdList$.commit(() => res.list)
      })
    )
  }
  getTemplateOptionList(query: any) {
    return this.GroupApi.getTemplateOptionList(query).pipe(
      tap((res: any) => {
        this.templateList$.commit(() => res.list)
      })
    )
  }
  addGroup(query: any) {
    return this.GroupApi.addGroup(query).pipe(tap((res: any) => {}))
  }
  editGroup(query: any) {
    return this.GroupApi.editGroup(query).pipe(tap((res: any) => {}))
  }
  getEditInfo(query: any) {
    return this.GroupApi.getEditInfo(query)
  }
}
