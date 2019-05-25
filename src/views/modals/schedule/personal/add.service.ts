import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'

import {
  ScheduleApi1v1,
  PostSchedulePersonalScheduleInput,
  PostSchedulePersonalBatchInput
} from '@/api/v1/course/personal/schedule1v1'

@Injectable()
export class AddService {
  constructor(protected api: ScheduleApi1v1) { }

  // 添加排期
  addSchedule(params: PostSchedulePersonalScheduleInput) {
    return this.api.PostSchedulePersonalSchedule(params)
  }

  // 批量添加排期
  inBacthSchedule(params: PostSchedulePersonalBatchInput) {
    return this.api.postSchedulePersonalBatch(params)
  }
}
