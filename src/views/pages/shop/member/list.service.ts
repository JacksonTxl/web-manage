import { Controller, ServiceRoute, Injectable } from 'vue-service-app'
import { UserService } from '@/services/user.service'
import { RedirectService } from '@/services/redirect.service'

@Injectable()
export class ListService implements Controller {
  constructor(
    private redirectService: RedirectService,
    private userService: UserService
  ) {}
  beforeEach(to: ServiceRoute) {
    return this.redirectService.redirect({
      locateRouteName: 'shop-member-list',
      redirectRoute: {
        name: `shop-member-list-${this.userService.useVersion$.snapshot()}`
      }
    })
  }
}
