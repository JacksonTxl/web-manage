import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { CoachApi, GetCoachBasicInput } from '@/api/v1/staff/coach'
@Injectable()
export class SelectCoachService extends Store<any> {
  constructor(private coachApi: CoachApi) {
    super()
  }
  @Effect()
  getCoachBasic(params: GetCoachBasicInput) {
    return this.coachApi.getCoachBasic(params)
  }
}
