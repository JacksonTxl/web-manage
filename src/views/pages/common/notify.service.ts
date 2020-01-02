import { State } from 'rx-state'
import { NotifyApi } from '@/api/v1/notify'
import { Injectable } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
import { tap } from 'rxjs/operators'
@Injectable()
export class NotifyService {
  // authTabs$ = this.authService.getAuthTabs$('common-notify')
  info$ = new State({})
  constructor(private authService: AuthService, private api: NotifyApi) {}
  getNoticePcUnread() {
    return this.api.getNoticePcUnread().pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
  beforeEach() {
    return this.getNoticePcUnread()
  }
}
