import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { NotifyApi } from '@/api/v1/notify'
import { tap } from 'rxjs/operators'
import { MessageService } from '@/services/message.service'
import { anyAll } from '@/operators'

@Injectable()
export class NotifyService {
  systemList$ = new State({})
  activityList$ = new State({})
  loading$ = new State({})
  constructor(private api: NotifyApi, private msg: MessageService) {}
  getSystemList() {
    return this.api.getNewAnnouncementSystem().pipe(
      tap((res: any) => {
        this.systemList$.commit(() => res.list)
      })
    )
  }
  getActivityList() {
    return this.api.getNewAnnouncementActivity().pipe(
      tap((res: any) => {
        this.activityList$.commit(() => res.list)
      })
    )
  }
  init() {
    return anyAll(this.getActivityList(), this.getSystemList())
  }
}
