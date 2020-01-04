import { NotifyService } from './../notify.service'
import { State, Effect } from 'rx-state'
import { NotifyApi } from './../../../../api/v1/notify'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { tap } from 'rxjs/operators'

@Injectable()
export class InformService {
  loading$ = new State({})
  list$ = new State([{}])
  page$ = new State({})
  informTypeOptions$ = new State([])
  constructor(private api: NotifyApi, private notifyService: NotifyService) {}
  @Effect()
  getList(query: any) {
    return this.api.getInformList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
        this.notifyService.getNoticePcUnread().subscribe()
      })
    )
  }
  getNoticeEnum() {
    return this.api.getNoticeEnum().pipe(
      tap((res: any) => {
        let children: any[] = []
        res.list.forEach((item: any) => {
          children = [...children, ...item.children]
        })
        this.informTypeOptions$.commit(() => [
          { name: '全部', id: -1, children },
          ...res.list
        ])
      })
    )
  }
  beforeRouteEnter() {
    return this.getNoticeEnum()
  }
  beforeEach(to: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
