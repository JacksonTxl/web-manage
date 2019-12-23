import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { forkJoin } from 'rxjs'
import moment from 'moment'
import { UserService } from '@/services/user.service'
import { AuthService } from '@/services/auth.service'
interface SetState {
  scheduleTime: any[]
  scheduleList: any[]
}
@Injectable()
export class InbatchInfoService {
  scheduleList$ = new State([])
  scheduleColumns$ = new State([])
  scheduleTime$ = new State([])
  formPage$ = new State('')
  auth$ = this.authService.authMap$({
    add: 'shop:schedule:personal_course_schedule|add',
    addBatch: 'shop:schedule:personal_course_schedule|batch_add',
    copy: 'shop:schedule:personal_course_schedule|copy'
  })
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  beforeEach(to: ServiceRoute) {
    console.log(to)
  }
}
