import { State, Effect } from 'rx-state'
import { NotifyApi } from './../../../../api/v1/notify'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { tap } from 'rxjs/operators'

@Injectable()
export class NoticeService {
  loading$ = new State({})
  list$ = new State([])
  page$ = new State({})
  noticeTypeOptions$ = new State({})
  constructor(private api: NotifyApi) {}
  @Effect()
  getList(query: any) {
    return this.api.getNoticeList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  getNoticeEnum() {
    return this.api.getAnnouncementEnum().pipe(
      tap((res: any) => {
        this.noticeTypeOptions$.commit(() => [
          { label: '全部', value: -1 },
          ...res.list.map((item: any) => {
            return { label: item.value, value: item.key }
          })
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
