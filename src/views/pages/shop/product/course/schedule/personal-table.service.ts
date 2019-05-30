import { PersonalScheduleCommonService } from './personal.service#/common.service'
import { PersonalScheduleScheduleService } from './personal.service#/schedule.service'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ScheduleApi1v1, GetSchedulePersonalListInput } from '@/api/v1/course/personal/schedule1v1'
import { forkJoin } from 'rxjs'

interface SetState {
  scheduleTime: any[]
  scheduleList: any[]
}
@Injectable()
export class PersonalTableService extends Store<SetState> {
  state$: State<SetState>
  scheduleList$: Computed<Object>
  scheduleTime$: Computed<Object>
  constructor(private scheduleService: PersonalScheduleScheduleService, private commonService: PersonalScheduleCommonService) {
    super()
    this.state$ = new State({
      scheduleList: [],
      scheduleTime: []
    })
    this.scheduleList$ = new Computed(this.state$.pipe(pluck('scheduleList')))
    this.scheduleTime$ = new Computed(this.state$.pipe(pluck('scheduleTime')))
  }
  getList(query: GetSchedulePersonalListInput) {
    return this.scheduleService.getList(query).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.scheduleList = res.list
          state.scheduleTime = res.schedule_time
        })
      })
    )
  }
  initOptions() {
    return forkJoin(this.commonService.getCoachList())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    forkJoin(this.initOptions(), this.getList({})).subscribe(() => {
      next()
    })
  }
}