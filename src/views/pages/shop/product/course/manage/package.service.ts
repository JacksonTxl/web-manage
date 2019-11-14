import { Controller, Injectable, ServiceRoute } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class PackageService implements Controller {
  constructor(private redirectService: RedirectService) {}
  beforeEach() {
    return this.redirectService.redirect({
      locateRouteName: 'shop-product-course-manage-package',
      redirectRoute: {
        name: 'shop-product-course-manage-package-list'
      }
    })
  }
}
