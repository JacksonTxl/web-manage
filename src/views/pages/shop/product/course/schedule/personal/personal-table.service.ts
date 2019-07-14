import { PersonalScheduleCommonService } from '../personal.service#/common.service'
import { PersonalScheduleScheduleService } from '../personal.service#/schedule.service'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
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
  getList(query: any) {
    return this.scheduleService.getList(query).pipe(
      tap(res => {
        let schedule_info = res.schedule_time.map((item: any) => {
          return {
            schedule_date: item,
            timing: []
          }
        })
        const list = res.list.map((item: any) => {
          item.schedule_info = schedule_info.map((sInfo: any) => {
            let ele = sInfo
            item.schedule_info.forEach((itemInfo: any) => {
              if (sInfo.schedule_date === itemInfo.schedule_date) {
                ele = itemInfo
              }
            })
            return ele
          })
          return item
        })
        this.state$.commit(state => {
          state.scheduleList = list
          state.scheduleTime = res.schedule_time
        })
      })
    )
  }
  initOptions() {
    return forkJoin(this.commonService.getCoachList(), this.commonService.getCoachListInBatch())
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return forkJoin(this.getList(to.query), this.initOptions())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    forkJoin(this.initOptions()).subscribe(() => {
      next()
    })
  }
}
