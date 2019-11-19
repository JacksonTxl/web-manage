import { PersonalScheduleCommonService } from './schedule/personal/service#/common.service'
import { PersonalScheduleScheduleService } from './schedule/personal/service#/schedule.service'
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
export class PersonalTableService {
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
    private scheduleService: PersonalScheduleScheduleService,
    private commonService: PersonalScheduleCommonService,
    private userService: UserService,
    private authService: AuthService
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
        const list = res.list.map((item: any) => {
          //  去除后端返回的重复数据
          item.schedule_info = schedule_info.map((sInfo: any) => {
            let ele = sInfo
            item[sInfo.schedule_date] = sInfo
            item.schedule_info.forEach((itemInfo: any) => {
              item[itemInfo.schedule_date] = itemInfo
              // console.log('itemInfo', itemInfo)
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
            title: `${this.userService.c('coach')}名称`,
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
  beforeEach(to: ServiceRoute) {
    return this.getList(to.query)
  }
  beforeRouteEnter(to: ServiceRoute) {
    return this.initOptions()
  }
}
