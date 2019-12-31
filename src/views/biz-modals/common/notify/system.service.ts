import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { NotifyApi } from '@/api/v1/notify'
import { tap } from 'rxjs/operators'
import { MessageService } from '@/services/message.service'

@Injectable()
export class ActivityService {
  list$ = new State({})
  loading$ = new State({})
  constructor(private api: NotifyApi, private msg: MessageService) {}
  getNoticeList() {
    return this.api.getNewAnnouncementSystem().pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
      })
    )
  }
}
