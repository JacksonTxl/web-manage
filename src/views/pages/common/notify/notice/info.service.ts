import { State, Effect } from 'rx-state'
import { Injectable, ServiceRoute, ServiceRouter } from 'vue-service-app'
import { tap } from 'rxjs/operators'
import { NotifyApi } from '@/api/v1/notify'

@Injectable()
export class InfoService {
  info$ = new State([{}])
  constructor(private api: NotifyApi) {}
  getAnnouncementInfo(id: any) {
    this.api.getAnnouncementInfo(id).pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute) {
    return this.getAnnouncementInfo(to.meta.query)
  }
}
