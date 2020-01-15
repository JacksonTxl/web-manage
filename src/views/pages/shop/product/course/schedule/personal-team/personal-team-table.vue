<template>
  <div class="page-team-table schedule-table">
    <div
      class="page-team-table__title pd-x24 pd-y16 schedule-table__title schedule-table__title--fixed"
      slot="title"
    >
      <div class="title__left">
        <st-button
          @click="onClickScheduleInBatch"
          :loading="loading.getSmallTemplate"
          class="mg-r12"
          type="primary"
          v-if="auth.addBatch"
        >
          批量排期
        </st-button>
        <st-button v-if="auth.copy" @click="onClickCopySchedule">
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
        v-for="card in scheduleTable"
        :key="card.date"
        class="mg-l24 mg-r24 mg-t8"
      >
        <span
          href="javascript:;"
          slot="extra"
          class="add-schedule"
          @click="onClickAdd"
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
              <div v-if="info.can_reserve_num">
                <span class="label">可约：</span>
                <span class="value">{{ info.can_reserve_num }}人</span>
              </div>
            </div>
          </a-col>
          <a-col
            :lg="2"
            :offset="7"
            class="action"
            v-modal-link="{
              name: 'schedule-personal-team-reserve-info',
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
import { PersonalTeamScheduleScheduleService } from '../personal-team/service#/schedule.service'
import date from '@/views/biz-components/schedule/date#/date-component.vue'
import SchedulePersonalTeamReserveInfo from '@/views/biz-modals/schedule/personal-team/reserve-info'
import SchedulePersonalTeamAddInBatch from '@/views/biz-modals/schedule/personal-team/add-in-batch'
import SchedulePersonalTeamAdd from '@/views/biz-modals/schedule/personal-team/add'
import SchedulePersonalTeamCopy from '@/views/biz-modals/schedule/personal-team/copy'
import { PersonalTeamTableService } from './personal-team-table.service'
import ScheduleBatchCourseManage from '@/views/biz-modals/schedule/batch/course-manage'
import ScheduleBatchAddEditCourse from '@/views/biz-modals/schedule/batch/add-edit-course'
import ScheduleBatchCourseRankPreview from '@/views/biz-modals/schedule/batch/course-rank-preview'
export default {
  name: 'SchedulePersonalTeamTable',
  modals: {
    SchedulePersonalTeamReserveInfo,
    SchedulePersonalTeamAddInBatch,
    SchedulePersonalTeamAdd,
    SchedulePersonalTeamCopy,
    ScheduleBatchCourseManage,
    ScheduleBatchAddEditCourse,
    ScheduleBatchCourseRankPreview
  },
  serviceInject() {
    return {
      scheduleService: PersonalTeamScheduleScheduleService,
      service: PersonalTeamTableService
    }
  },
  data() {
    return {
      pageBtnFocusState: 'list'
    }
  },
  components: {
    date
  },
  rxState() {
    return {
      scheduleTable: this.scheduleService.scheduleTable$,
      auth: this.service.auth$,
      smallTemplateList: this.scheduleService.smallTemplateList$,
      loading: this.scheduleService.loading$
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
  methods: {
    handleSizeChange(evt, type) {
      this.pageBtnFocusState = evt.target.value
    },
    // 刷新页面
    onScheduleChange() {
      this.$router.push({ query: this.$searchQuery })
    },
    onClickAdd() {
      this.$modalRouter.push({
        name: 'schedule-personal-team-add',
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
      this.scheduleService.getSmallTemplate().subscribe(res => {
        // 打开课表管理
        if (!this.smallTemplateList.length) {
          this.addOrEditCourse()
          return
        }
        this.$modalRouter.push({
          name: 'schedule-batch-course-manage',
          props: {
            teamTemplateList: this.smallTemplateList,
            type: 'small'
          },
          on: {
            // 确定时开始删除数据
            save: res => {
              this.scheduleService
                .delSmallTemplate({ id: JSON.stringify(res) })
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
          type: 'small'
        },
        on: {
          success: res => {
            setTimeout(() => {
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
            }, 500)
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
    onClickSkipSchedule() {
      this.$router.push({
        name: 'shop-product-course-schedule-personal-team',
        query: { ...this.$searchQuery }
      })
    },
    getTable(val = {}) {
      const query = {
        ...this.$searchQuery,
        start_date: val.start_date,
        end_date: val.end_date
      }
      this.$router.push({ query })
    }
  }
}
</script>
