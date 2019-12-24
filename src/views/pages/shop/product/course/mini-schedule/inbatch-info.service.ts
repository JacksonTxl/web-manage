import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { UserService } from '@/services/user.service'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class InbatchInfoService {
  scheduleList$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'shop:schedule:personal_course_schedule|add',
    addBatch: 'shop:schedule:personal_course_schedule|batch_add'
  })
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  beforeEach(to: ServiceRoute) {
    this.scheduleList$.commit(() => to.query.courseScheduleList)
  }
}
