import { State, Effect } from 'rx-state'
import { NotifyApi } from './../../../../api/v1/notify'
import { Injectable } from 'vue-service-app'
import { tap } from 'rxjs/operators'

@Injectable()
export class NoticeService {
  loading$ = new State({})
  list$ = new State([])
  page$ = new State({})
  constructor(private api: NotifyApi) {}
  getList(query: any) {
    return this.api.getNoticeList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => {
          return [
            {
              id: 1111111111,
              send_time: '2011-11-11 11:11',
              notify_type: '入场通知',
              sub_notify_type: '硬件入场',
              shop_name: 'sb门店',
              content: '内容'
            }
          ]
        })
        this.page$.commit(() => {
          return {
            total_counts: 102,
            total_pages: 6,
            current_page: 1,
            size: 20
          }
        })
      })
    )
  }
}
