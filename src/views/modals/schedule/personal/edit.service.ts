import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'

import {
  ScheduleApi1v1,
  GetSchedulePersonalCoachInfoInput,
  ScheduleInfo
} from '@/api/v1/course/personal/schedule1v1'

@Injectable()
export class editService {
  constructor(protected api: ScheduleApi1v1) { }

  // 编辑提交
  editSchedule(id: any, params: ScheduleInfo) {
    return this.api.putSchedulePersonalScheduleById(id, params)
  }

  // 编辑回显
  editScheduleInfo(id: any, query: GetSchedulePersonalCoachInfoInput) {
    return this.api.getSchedulePersonalCoachInfoById(id, query)
  }
}
