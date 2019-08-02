import { PersonalScheduleCommonService } from '../personal.service#/common.service'
import { PersonalScheduleScheduleService } from '../personal.service#/schedule.service'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { forkJoin } from 'rxjs'
import moment from 'moment'

interface SetState {
  scheduleTime: any[]
  scheduleList: any[]
}
@Injectable()
export class PersonalTableService {
  scheduleList$ = new State([])
  scheduleColumns$ = new State([])
  scheduleTime$ = new State([])
  constructor(
    private scheduleService: PersonalScheduleScheduleService,
    private commonService: PersonalScheduleCommonService
  ) {}
  getList(query: any) {
    return this.scheduleService.getList(query).pipe(
      tap(res => {
        let schedule_info = res.schedule_time.map((item: any) => {
          return {
            schedule_date: item,
            timing: []
          }
        })
        // schedule_info: [, …]
        // 0: { id: 97692957606068, schedule_date: "2019-07-28", timing: [{ start_time: "00:00", end_time: "23:00" }] }
        // 1: { id: 100403216187512, schedule_date: "2019-07-22", timing: [{ start_time: "00:00", end_time: "24:00" }] }
        // 2: { id: 100403216187514, schedule_date: "2019-07-23", timing: [{ start_time: "00:00", end_time: "24:00" }] }
        // 3: { id: 100403216187516, schedule_date: "2019-07-24", timing: [{ start_time: "00:00", end_time: "24:00" }] }
        // 4: { id: 100403216187518, schedule_date: "2019-07-25", timing: [{ start_time: "00:00", end_time: "24:00" }] }
        // 5: { id: 100403216187520, schedule_date: "2019-07-26", timing: [{ start_time: "00:00", end_time: "24:00" }] }
        // 6: { id: 100403216187522, schedule_date: "2019-07-27", timing: [{ start_time: "00:00", end_time: "24:00" }] }
        // 7: { id: 100403216187524, schedule_date: "2019-07-28", timing: [{ start_time: "00:00", end_time: "24:00" }] }
        // staff_id: 97692957606056
        // staff_name: "丝绒"
        const list = res.list.map((item: any) => {
          //  去除后端返回的重复数据
          item.schedule_info = schedule_info.map((sInfo: any) => {
            let ele = sInfo
            item[sInfo.schedule_date] = sInfo
            item.schedule_info.forEach((itemInfo: any) => {
              item[itemInfo.schedule_date] = itemInfo
              console.log('itemInfo', itemInfo)
              if (sInfo.schedule_date === itemInfo.schedule_date) {
                ele = itemInfo
              }
            })
            return ele
          })
          return item
        })
        let scheduleColumns = res.schedule_time.map((item: any) => {
          let title = `${moment(item).format('MM-DD')} ${moment(item).format(
            'ddd'
          )}`
          return {
            title: title,
            dataIndex: item,
            scopedSlots: {
              customRender: item
            }
          }
        })
        scheduleColumns = [
          {
            title: '教练名称',
            dataIndex: 'staff_name',
            scopedSlots: { customRender: 'staff_name' }
          },
          ...scheduleColumns,
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' }
          }
        ]
        this.scheduleList$.commit(() => list)
        this.scheduleColumns$.commit(() => scheduleColumns)
        this.scheduleTime$.commit(() => res.schedule_time)
      })
    )
  }
  initOptions() {
    return forkJoin(
      this.commonService.getCoachList(),
      this.commonService.getCoachListInBatch()
    )
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
