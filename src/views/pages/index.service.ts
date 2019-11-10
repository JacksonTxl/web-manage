import { Controller, Injectable, ServiceRoute } from 'vue-service-app'
import { UserService } from '@/services/user.service'
import { RedirectService } from '@/services/redirect.service'

@Injectable()
export class IndexService implements Controller {
  constructor(
    private userService: UserService,
    private redirectService: RedirectService
  ) {}
  beforeEach() {
    return this.redirectService.redirect({
      locateRouteName: 'index',
      redirectRoute: {
        name: this.userService.firstMenuUrl$.snapshot()
      }
    })
  }
}
