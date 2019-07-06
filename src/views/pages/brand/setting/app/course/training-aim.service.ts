import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import {
  TrainingApi,
  DeleteTrainingAimInput
} from '@/api/v1/setting/training'
import {
  AuthService
} from '@/services/auth.service'

@Injectable()
export class TrainingAimService implements RouteGuard {
  resData$ = new State({})
  loading$ = new State({})
  auth$ = new State({
    add: this.authService.can('brand_shop:member:training_aim|add')
  })
  constructor(
    private trainingApi: TrainingApi,
    private authService: AuthService
  ) {}
  @Effect()
  getTrainingAimList() {
    return this.trainingApi.getTrainingAimList()
      .pipe(
        tap(res => {
          res = this.authService.filter(res)
          this.resData$.commit(() => res)
        })
      )
  }
  deleteTrainingAim(params: DeleteTrainingAimInput) {
    return this.trainingApi.deleteTrainingAim(params)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getTrainingAimList()
  }
}
