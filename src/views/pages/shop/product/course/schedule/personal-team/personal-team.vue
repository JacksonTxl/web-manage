<template>
  <div>
    <calendar
      @get-table="onGetTable"
      @detail="onDetail"
      @add="onAddSchedule"
      :cardList="cardList"
      :startDate="startDate"
      fixed
      ref="calendar"
    >
      <div slot="toolbar-left">
        <st-button
          type="primary"
          class="mg-r12"
          @click="onClickScheduleInBatch"
          v-if="auth.addBatch"
        >
          批量排期
        </st-button>
        <st-button @click="onClickCopySchedule" v-if="auth.copy">
          复制排期
        </st-button>
      </div>
    </calendar>
  </div>
</template>

<script>
import Calendar from '@/views/biz-components/schedule/calendar'
import { PersonalTeamScheduleScheduleService } from '@/views/pages/shop/product/course/schedule/personal-team/service#/schedule.service'
import SchedulePersonalTeamAddInBatch from '@/views/biz-modals/schedule/personal-team/add-in-batch'
import SchedulePersonalTeamAdd from '@/views/biz-modals/schedule/personal-team/add'
import SchedulePersonalTeamCopy from '@/views/biz-modals/schedule/personal-team/copy'
import SchedulePersonalTeamReserveInfo from '@/views/biz-modals/schedule/personal-team/reserve-info'
import { PersonalTeamService } from './personal-team.service'
export default {
  name: 'TeamSchedule',
  modals: {
    SchedulePersonalTeamAddInBatch,
    SchedulePersonalTeamAdd,
    SchedulePersonalTeamCopy,
    SchedulePersonalTeamReserveInfo
  },
  serviceInject() {
    return {
      personalTeamSchduleService: PersonalTeamScheduleScheduleService,
      service: PersonalTeamService
    }
  },
  rxState() {
    return {
      auth: this.service.auth$,
      cardList: this.personalTeamSchduleService.courseList$,
      smallTemplateList: this.personalTeamSchduleService.smallTemplateList$
    }
  },
  components: {
    Calendar
  },
  data() {
    return {}
  },
  computed: {
    startDate() {
      return this.$searchQuery.start_date || moment().format('YYYY-MM-DD')
    }
  },
  methods: {
    // 添加团课排期
    onAddSchedule(date) {
      this.$modalRouter.push({
        name: 'schedule-personal-team-add',
        props: { time: date },
        on: {
          ok: res => {
            this.onScheduleChange()
          }
        }
      })
    },
    onMouseLeave() {
      console.log('onMouseLeave')
    },
    // 查看详情
    onDetail(info) {
      this.$modalRouter.push({
        name: 'schedule-personal-team-reserve-info',
        props: {
          id: info.id
        },
        on: {
          ok: res => {
            this.onScheduleChange()
          }
        }
      })
    },
    // 批量排期
    onClickScheduleInBatch() {
      // this.$modalRouter.push({
      //   name: 'schedule-personal-team-add-in-batch',
      //   on: {
      //     ok: res => {
      //       this.onScheduleChange()
      //     }
      //   }
      // })
      this.personalTeamSchduleService.getSmallTemplate().subscribe(res => {
        console.log(res)
        // 打开课表管理
        this.$modalRouter.push({
          name: 'schedule-batch-course-manage',
          props: {
            teamTemplateList: this.smallTemplateList
          },
          on: {
            // 确定时开始删除数据
            save: res => {
              this.personalTeamSchduleService
                .delSmallTemplate({ id: JSON.stringify(res) })
                .subscribe()
            },
            // 添加课表打开新增课表弹窗
            add: () => {
              this.addOrEditCourse()
            },
            // 编辑课表打开编辑课表弹窗
            edit: res => {
              this.addOrEditCourse(res)
            }
          }
        })
      })
    },
    // 添加和编辑团课
    addOrEditCourse(id = undefined) {
      this.$modalRouter.push({
        name: 'schedule-batch-add-edit-course',
        props: {
          id,
          type: 'small'
        },
        on: {
          success: res => {
            console.log(res, '新建成功')
            // this.$modalRouter.push({
            //   name: 'schedule-batch-course-rank-preview',
            //   on: {
            //     success: res => {
            //       console.log('新增课表')
            //     }
            //   }
            // })
          }
        }
      })
    },
    // 复制排期
    onClickCopySchedule() {
      this.$modalRouter.push({
        name: 'schedule-personal-team-copy',
        on: {
          ok: res => {
            this.onScheduleChange()
          }
        }
      })
    },
    // 进入表格模式
    onGetTable() {
      this.$router.push({
        name: 'shop-product-course-schedule-personal-team-personal-team-table',
        query: { ...this.$searchQuery }
      })
    },
    // 刷新页面
    onScheduleChange() {
      this.$router.push({ query: this.$searchQuery })
    }
  },
  watch: {
    $route(newValue, oldValue) {
      this.service.scheduleService.getList(this.$searchQuery)
      this.$refs.calendar.getWeeks(
        this.$searchQuery.time_unit === 2 ? 'week' : ''
      )
    }
  }
}
</script>
