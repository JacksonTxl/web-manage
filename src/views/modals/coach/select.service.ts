import { Injectable } from 'vue-service-app'
import { timer } from 'rxjs'
import { tap, debounce } from 'rxjs/operators'
import { CoachApi, GetSelectCoachInput } from '@/api/v1/staff/coach'
@Injectable()
export class SelectService {
  constructor(private coachApi: CoachApi) {}
  getCoachSelect(params: GetSelectCoachInput) {
    return this.coachApi.getCoachSelect(params)
  }
}
