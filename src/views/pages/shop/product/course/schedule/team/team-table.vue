<template>
  <div class="page-team-table schedule-table">
    <div
      class="page-team-table__title pd-x24 pd-y16 schedule-table__title schedule-table__title--fixed"
      slot="title"
    >
      <div class="title__left">
        <st-button
          @click="onClickScheduleInBatch"
          :loading="loading.getTeamTemplate"
          class="mg-r12"
          type="primary"
          v-if="auth.addBatch"
        >
          批量排期
        </st-button>
        <st-button
          v-if="auth.copy"
          v-modal-link="{ name: 'schedule-team-copy-schedule' }"
        >
          复制排期
        </st-button>
      </div>
      <div class="title__center">
        <date
          @today="getTable"
          :start="$searchQuery.start_date"
          @pre="getTable"
          @next="getTable"
        />
      </div>
      <div class="title__right schedule-button">
        <a-radio-group
          :value="pageBtnFocusState"
          @change="handleSizeChange($event, 'page')"
        >
          <a-radio-button
            value="calendar"
            class="mg-l12"
            @click="onClickSkipSchedule"
          >
            <st-icon type="calendar"></st-icon>
          </a-radio-button>
          <a-radio-button value="list">
            <st-icon type="list"></st-icon>
          </a-radio-button>
        </a-radio-group>
      </div>
    </div>
    <div class="schedule-table__content">
      <a-card
        :title="card.date | filterStartTime"
        :key="card.date"
        v-for="card in scheduleTable"
        class="mg-l24 mg-r24"
      >
        <span
          slot="extra"
          class="add-schedule"
          @click="onAddSchedule(card.date)"
        >
          + 添加课程排期
        </span>
        <a-row
          class="page-team-table__item"
          v-for="info in card.data"
          :key="info.id"
        >
          <a-col :lg="3" class="time">
            {{ info.start_time }} - {{ info.end_time }}
          </a-col>
          <a-col :lg="12" class="content">
            <div class="course-info">
              <div class="course-name">{{ info.course_name }}</div>
              <div class="address">
                <div class="mg-r24">
                  <span class="label">场地：</span>
                  <span class="value">{{ info.court_name }}</span>
                </div>
                <div>
                  <span class="label">{{ $c('coach') }}：</span>
                  <span class="value">{{ info.coach_name }}</span>
                </div>
              </div>
            </div>
            <div :lg="5" :offset="3" class="reserve">
              <div class="mg-r24">
                <span class="label">签到：</span>
                <span class="value">{{ info.checkin_num }}人</span>
              </div>
              <div class="mg-r24">
                <span class="label">预约：</span>
                <span class="value">{{ info.reserved_num }}人</span>
              </div>
              <div>
                <span class="label">可约：</span>
                <span class="value">{{ info.reserve_max }}人</span>
              </div>
            </div>
          </a-col>
          <a-col
            :lg="2"
            :offset="7"
            class="action"
            v-modal-link="{
              name: 'schedule-team-reserve-info',
              props: { id: info.id }
            }"
          >
            <a href="#">查看详情</a>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </div>
</template>

<script>
import { TeamScheduleScheduleService } from '../team/service#/schedule.service'
import ScheduleTeamAddCourseBatch from '@/views/biz-modals/schedule/team/add-course-batch'
import ScheduleTeamAddCourse from '@/views/biz-modals/schedule/team/add-course'
import ScheduleTeamCopySchedule from '@/views/biz-modals/schedule/team/copy-schedule'
import date from '@/views/biz-components/schedule/date#/date-component.vue'
import ScheduleTeamReserveInfo from '@/views/biz-modals/schedule/team/reserve-info'
import { TeamTableService } from './team-table.service'
import ScheduleBatchCourseManage from '@/views/biz-modals/schedule/batch/course-manage'
import ScheduleBatchAddEditCourse from '@/views/biz-modals/schedule/batch/add-edit-course'
import ScheduleBatchCourseRankPreview from '@/views/biz-modals/schedule/batch/course-rank-preview'
export default {
  name: 'ScheduleTeamTable',
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
      teamScheduleScheduleService: TeamScheduleScheduleService,
      service: TeamTableService
    }
  },
  rxState() {
    return {
      auth: this.service.auth$,
      scheduleTable: this.teamScheduleScheduleService.scheduleTable$,
      loading: this.teamScheduleScheduleService.loading$,
      teamTemplateList: this.teamScheduleScheduleService.teamTemplateList$
    }
  },
  data() {
    return {
      pageBtnFocusState: 'list'
    }
  },
  filters: {
    filterStartTime(val) {
      const weekday = moment(val)
        .format('ddd')
        .valueOf()
      const MMDD = moment(val)
        .format('MM-DD')
        .valueOf()
      return `${MMDD} ${weekday}`
    }
  },
  components: {
    date
  },
  methods: {
    handleSizeChange(evt, type) {
      this.pageBtnFocusState = evt.target.value
    },
    onScheduleChange() {
      this.$router.push({ query: this.$searchQuery })
    },
    // 添加团课排期
    onAddSchedule(date) {
      this.$modalRouter.push({
        name: 'schedule-team-add-course',
        props: { time: moment(date) },
        on: {
          ok: res => {
            this.onScheduleChange()
          }
        }
      })
    },
    onClickSkipSchedule() {
      this.$router.push({
        name: 'shop-product-course-schedule-team',
        query: this.$searchQuery
      })
    },
    getTable(val = {}) {
      const query = {
        ...this.$searchQuery,
        start_date: val.start_date,
        end_date: val.end_date
      }
      this.$router.push({ query })
    },
    // 批量排期(打开课程管理或者新增课程)
    onClickScheduleInBatch() {
      this.teamScheduleScheduleService.getTeamTemplate().subscribe(res => {
        // 打开课表管理
        if (!this.teamTemplateList.length) {
          this.addOrEditCourse()
          return
        }
        this.$modalRouter.push({
          name: 'schedule-batch-course-manage',
          props: {
            teamTemplateList: this.teamTemplateList,
            type: 'team'
          },
          on: {
            // 确定时开始删除数据
            save: res => {
              this.teamScheduleScheduleService
                .delTeamTemplate({ id: JSON.stringify(res) })
                .subscribe()
            },
            // 添加课表打开新增课表弹窗
            add: () => {
              setTimeout(() => {
                this.addOrEditCourse()
              }, 500)
            },
            // 编辑课表打开编辑课表弹窗
            edit: res => {
              setTimeout(() => {
                this.addOrEditCourse(res)
              }, 500)
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
            setTimeout(() => {
              this.$modalRouter.push({
                name: 'schedule-batch-course-rank-preview',
                props: {
                  dataTable: res.info,
                  type: 'team'
                },
                on: {
                  success: res => {
                    console.log('新增课表')
                  }
                }
              })
            }, 500)
          }
        }
      })
    }
  }
}
</script>
