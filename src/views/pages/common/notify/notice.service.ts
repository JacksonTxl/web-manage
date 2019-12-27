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
        let subTypes: any[] = []
        res.list.forEach((item: any) => {
          subTypes = [...subTypes, ...item.sub_type]
        })
        this.noticeTypeOptions$.commit(() => [
          { value: '全部', key: -1, sub_type: subTypes },
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
