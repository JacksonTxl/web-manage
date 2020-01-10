<template>
  <div>
    <calendar
      @get-table="onGetTable"
      @detail="onDetail"
      @add="onAddSchedule"
      :authAdd="auth.add"
      fixed
      :cardList="cardList"
      :startDate="startDate"
    >
      <div slot="toolbar-left">
        <st-button
          type="primary"
          class="mg-r12"
          :loading="loading.getTeamTemplate"
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
import { TeamScheduleScheduleService } from '@/views/pages/shop/product/course/schedule/team/service#/schedule.service'
import ScheduleTeamAddCourseBatch from '@/views/biz-modals/schedule/team/add-course-batch'
import ScheduleBatchCourseManage from '@/views/biz-modals/schedule/batch/course-manage'
import ScheduleBatchAddEditCourse from '@/views/biz-modals/schedule/batch/add-edit-course'
import ScheduleBatchCourseRankPreview from '@/views/biz-modals/schedule/batch/course-rank-preview'
import ScheduleTeamAddCourse from '@/views/biz-modals/schedule/team/add-course'
import ScheduleTeamCopySchedule from '@/views/biz-modals/schedule/team/copy-schedule'
import ScheduleTeamReserveInfo from '@/views/biz-modals/schedule/team/reserve-info'
import { TeamService } from './team.service'
export default {
  name: 'TeamSchedule',
  modals: {
    ScheduleTeamAddCourseBatch,
    ScheduleTeamAddCourse,
    ScheduleTeamCopySchedule,
    ScheduleTeamReserveInfo,
    ScheduleBatchCourseManage,
    ScheduleBatchAddEditCourse,
    ScheduleBatchCourseRankPreview
  },
  serviceInject() {
    return {
      teamSchduleService: TeamScheduleScheduleService,
      service: TeamService
    }
  },
  rxState() {
    return {
      auth: this.service.auth$,
      loading: this.teamSchduleService.loading$,
      cardList: this.teamSchduleService.scheduleTeamCourseList$,
      teamTemplateList: this.teamSchduleService.teamTemplateList$
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
    onMouseLeave() {
      console.log('onMouseLeave')
    },
    // 添加团课排期
    onAddSchedule(date) {
      console.log(date)
      this.$modalRouter.push({
        name: 'schedule-team-add-course',
        props: { time: date },
        on: {
          ok: res => {
            console.log('ok')
            this.onScheduleChange()
          }
        }
      })
    },
    // 查看详情
    onDetail(info) {
      console.log(info)
      this.$modalRouter.push({
        name: 'schedule-team-reserve-info',
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
    // 批量排期(打开课程管理或者新增课程)
    onClickScheduleInBatch() {
      this.getTeamTemplate
      // this.$modalRouter.push({
      //   name: 'schedule-team-add-course-batch',
      //   on: {
      //     ok: res => {
      //       this.onScheduleChange()
      //     }
      //   }
      // })
      this.teamSchduleService.getTeamTemplate().subscribe(res => {
        // 打开课表管理
        this.$modalRouter.push({
          name: 'schedule-batch-course-manage',
          props: {
            teamTemplateList: this.teamTemplateList
          },
          on: {
            // 确定时开始删除数据
            save: res => {
              this.teamSchduleService
                .delTeamTemplate({ id: JSON.stringify(res) })
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
          type: 'team'
        },
        on: {
          success: res => {
            console.log(res, '新建成功')
            this.$modalRouter.push({
              name: 'schedule-batch-course-rank-preview',
              props: {
                dataTable: res.info,
                type: 'small'
              },
              on: {
                success: res => {
                  console.log('新增课表')
                }
              }
            })
          }
        }
      })
    },
    // 复制排期
    onClickCopySchedule() {
      this.$modalRouter.push({
        name: 'schedule-team-copy-schedule',
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
        name: 'shop-product-course-schedule-team-team-table',
        query: this.$searchQuery
      })
    },
    // 刷新页面
    onScheduleChange() {
      this.$router.push({ query: this.$searchQuery })
    }
  }
}
</script>
