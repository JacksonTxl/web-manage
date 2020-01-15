import { NotifyService } from './../notify.service'
import { State, Effect } from 'rx-state'
import { NotifyApi } from '@/api/v1/notify'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { tap } from 'rxjs/operators'

@Injectable()
export class NoticeService {
  loading$ = new State({})
  list$ = new State([])
  page$ = new State({})
  info$ = new State({})
  noticeTypeOptions$ = new State({})
  constructor(private api: NotifyApi, private notifyService: NotifyService) {}
  @Effect()
  getList(query: any) {
    return this.api.getNoticeList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
        this.notifyService.getNoticePcUnread().subscribe()
      })
    )
  }
  getAnnouncementInfo(query: any) {
    return this.api.getAnnouncementInfo(query).pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
  getNoticeEnum() {
    return this.api.getAnnouncementEnum().pipe(
      tap((res: any) => {
        this.noticeTypeOptions$.commit(() => [
          { label: '全部', value: -1 },
          ...res.list.map((item: any) => {
            return { label: item.name, value: item.id }
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
