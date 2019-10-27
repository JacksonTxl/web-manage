import { Injectable, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class ListService {
  authTabs$ = this.authService.getAuthTabs$('shop-sold-course-list')
  placeholder$ = new State('')
  constructor(private authService: AuthService) {}
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.name === 'shop-sold-course-list-personal') {
      this.placeholder$.commit(
        () => '请输入私教课名、合同编号、会员姓名或手机号查找'
      )
    } else if (to.name === 'shop-sold-course-list-package') {
      this.placeholder$.commit(
        () => '请输入课程包名、合同编号、会员姓名或手机号查找'
      )
    }
    next()
  }
}
