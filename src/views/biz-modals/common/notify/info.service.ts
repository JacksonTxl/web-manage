import { UserService } from '@/services/user.service'
import { State, Effect } from 'rx-state'
import { Injectable, ServiceRoute, ServiceRouter } from 'vue-service-app'
import { tap } from 'rxjs/operators'
import { NotifyApi } from '@/api/v1/notify'

@Injectable()
export class InfoService {
  info$ = new State([{}])
  brand$ = this.userService.brand$
  constructor(private api: NotifyApi, private userService: UserService) {}
  getAnnouncementInfo(id: any) {
    return this.api.getAnnouncementInfo(id).pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
}
