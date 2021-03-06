import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import {
  GroupApi,
  GroupListQuery,
  GroupTemplateQuery
} from '@/api/v1/setting/sms/group'
import { UserService } from '@/services/user.service'
import { forkJoin } from 'rxjs'

@Injectable()
export class GroupService implements Controller {
  groupList$ = new State([])
  groupPage$ = new State([])
  templateList$ = new State([])
  templatePage$ = new State([])
  loading$ = new State({})
  notifyType$ = this.userService.getOptions$('setting.notify_type')
  sendStatus$ = this.userService.getOptions$('setting.send_status')

  constructor(private GroupApi: GroupApi, private userService: UserService) {}
  @Effect()
  getGroupList(query: GroupListQuery) {
    return this.GroupApi.getGroupList(query).pipe(
      tap((res: any) => {
        this.groupList$.commit(() => res.list)
        this.groupPage$.commit(() => res.page)
      })
    )
  }
  getTemplateList(query: GroupTemplateQuery) {
    return this.GroupApi.getTemplateList(query).pipe(
      tap((res: any) => {
        this.templateList$.commit(() => res.list)
        this.templatePage$.commit(() => res.page)
      })
    )
  }
  onReset(id: any) {
    return this.GroupApi.onReset(id).pipe()
  }
  onDelete(query: any) {
    return this.GroupApi.onDelete(query).pipe()
  }
  init(query: any) {
    return forkJoin(this.getGroupList(query))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
