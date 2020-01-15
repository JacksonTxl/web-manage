<template>
  <st-modal
    :title="`${type === 'small' ? '私教小' : ''}团课批量排期预览`"
    v-model="show"
    width="1060px"
  >
    <template slot="footer">
      <a-tooltip
        placement="topRight"
        title="关闭后课程排期不再保留"
        overlayClassName="modal-schedule-batch-course-rank-preview-tooltip"
      >
        <st-button @click="show = false">
          关闭
        </st-button>
      </a-tooltip>
      <st-button
        type="primary"
        @click="save"
        :loading="
          type === 'team' ? loading.validTeamBatch : loading.validSmallBatch
        "
      >
        确认
      </st-button>
    </template>
    <div :class="basic()">
      <div :class="basic('title')">
        <p :class="basic('title--show')">
          <span class="mg-r16">
            总排课数：{{
              dataTable.amount ? dataTable.amount : 0
            }}节&nbsp;&nbsp;&nbsp;
          </span>
          冲突节数：
          <span :class="basic('title--high')">{{ amountValid }}节</span>
        </p>
        <a-radio-group :value="courseType" @change="handleSizeChange">
          <a-radio-button value="all">
            全部课程
          </a-radio-button>
          <a-radio-button value="part">
            冲突课程
          </a-radio-button>
        </a-radio-group>
      </div>
      <div :class="basic('table-box')" class="mg-t16">
        <st-table
          rowKey="id"
          :pagination="false"
          :columns="columns"
          :dataSource="courseSchedule"
        >
          <template slot="week_day" slot-scope="customRender">
            <div :class="customRender.valid ? 'color_red' : ''">
              {{ weekDays[customRender.data] }}
            </div>
          </template>
          <template slot="course_id" slot-scope="customRender, record, index">
            <!-- 选择课程 -->
            <a-select
              v-if="record.isEdit"
              placeholder="请选择课程"
              v-model="record.course_id_label"
              style="width: 100px"
              labelInValue
              @change="e => handleChange(e, index, 'course_id', record)"
            >
              <a-select-option v-for="course in courseOptions" :key="course.id">
                {{ type === 'team' ? course.course_name : course.name }}
              </a-select-option>
            </a-select>
            <div :class="customRender.valid ? 'color_red' : ''" v-else>
              {{ customRender.name }}
            </div>
          </template>
          <!-- 选择时间 -->
          <template slot="start_time" slot-scope="customRender, record, index">
            <a-date-picker
              v-if="record.isEdit"
              :showTime="{ format: 'HH:mm' }"
              format="YYYY-MM-DD HH:mm"
              placeholder="请选择时间"
              style="width: 156px"
              :allowClear="false"
              :value="customRender.data | formatDate"
              @change="e => handleChangeTime(e, index, 'start_time', record)"
            />
            <div :class="customRender.valid ? 'color_red' : ''" v-else>
              {{ customRender.data }}
            </div>
          </template>
          <!-- 选择教练 -->
          <template slot="coach_id" slot-scope="customRender, record, index">
            <a-select
              v-if="record.isEdit"
              :placeholder="`请选择${$c('coach')}`"
              v-model="record.coach_id_label"
              labelInValue
              @change="e => handleChange(e, index, 'coach_id', record)"
              style="width: 100px"
            >
              <a-select-option v-for="coach in coachOptions" :key="coach.id">
                {{ type === 'team' ? coach.staff_name : coach.name }}
              </a-select-option>
            </a-select>
            <div :class="customRender.valid ? 'color_red' : ''" v-else>
              {{ customRender.name }}
            </div>
          </template>
          <!-- 选择场地 -->
          <template
            slot="court_id"
            v-if="type === 'team'"
            slot-scope="customRender, record, index"
          >
            <a-cascader
              v-if="record.isEdit"
              placeholder="请选择场地"
              v-model="record.site_id"
              :options="courtOptions"
              labelInValue
              @change="e => courtChange(e, index, record)"
              :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
            />
            <div
              :class="
                record.court_id.valid || record.court_site_id.valid
                  ? 'color_red'
                  : ''
              "
              v-else
            >
              {{ record.court_id.name
              }}{{
                record.court_site_id.data ? `-${record.court_site_id.name}` : ''
              }}
            </div>
          </template>
          <template slot="limit_num" slot-scope="customRender, record, index">
            <st-input-number
              v-if="record.isEdit"
              v-model="customRender.data"
              style="width:100px"
              @change="changeRed(index, record)"
            ></st-input-number>
            <div :class="customRender.valid ? 'color_red' : ''" v-else>
              {{ customRender.data }}
            </div>
          </template>
          <template slot="course_fee" slot-scope="customRender, record, index">
            <st-input-number
              v-if="record.isEdit"
              v-model="customRender.data"
              :float="true"
              style="width:100px"
              @change="changeRed(index, record)"
            ></st-input-number>
            <div :class="customRender.valid ? 'color_red' : ''" v-else>
              {{ customRender.data }}
            </div>
          </template>
          <template slot="action" slot-scope="customRender, record, index">
            <a @click="onEditCourse(record.isEdit, index)" class="mg-r16">
              {{ record.isEdit ? '保存' : '修改' }}
            </a>
            <a @click="onDelCourse(index, record)">
              删除
            </a>
          </template>
        </st-table>
      </div>
      <div :class="basic('prompt')">
        注：标红部分即为课程冲突信息
      </div>
    </div>
  </st-modal>
</template>
<script>
import { CourseRankPreviewService } from './course-rank-preview.service'
import { UserService } from '@/services/user.service'
import { columns } from './course-rank-preview.config'
import { TeamScheduleCommonService } from '@/views/pages/shop/product/course/schedule/team/service#/common.service'
import { PersonalTeamScheduleCommonService } from '@/views/pages/shop/product/course/schedule/personal-team/service#/common.service'
import { cloneDeep } from 'lodash-es'
import { MessageService } from '@/services/message.service'
export default {
  serviceInject() {
    return {
      courseRankPreviewService: CourseRankPreviewService,
      teamScheduleCommonService: TeamScheduleCommonService,
      personalTeamScheduleCommonService: PersonalTeamScheduleCommonService,
      userService: UserService,
      messageService: MessageService
    }
  },
  rxState() {
    const tss = this.teamScheduleCommonService
    const sms = this.personalTeamScheduleCommonService
    return {
      loading: this.courseRankPreviewService.loading$,
      coachOptionTeam: tss.coachOptions$,
      courseOptionTeam: tss.courseOptions$,
      courtOptionTeam: tss.courtOptions$,
      courseOptionSmall: sms.courseOptions$,
      coachOptionSmall: sms.coachOptions$,
      weekDay: this.userService.enums$
    }
  },
  bem: {
    basic: 'modal-schedule-batch-course-rank-preview'
  },
  name: 'courseRankPreviewService',
  props: {
    dataTable: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: ''
    }
  },
  filters: {
    formatDate(val) {
      return val ? moment(val) : undefined
    }
  },
  data() {
    return {
      courseType: 'all', // 课程状态：全部课程all  部分课程part
      show: false,
      amountValid: 0,
      courseSchedule: [],
      weekDays: {},
      coachOptions: [],
      courseOptions: [],
      courtOptions: [],
      courseScheduleOld: []
    }
  },
  methods: {
    // 课程标签切换触发
    handleSizeChange(e) {
      this.courseType = e.target.value
      let partData = this.courseScheduleOld.filter((item, index) => {
        if (item.is_valid) {
          return {
            ...item
          }
        }
      })
      if (this.courseScheduleOld.length === partData.length) {
        return
      }
      if (e.target.value === 'part') {
        this.courseSchedule = partData
      } else {
        this.courseSchedule = cloneDeep(this.courseScheduleOld)
      }
    },
    // 确定排期，开始验证
    save() {
      let params = []
      params = this.courseScheduleOld.map(item => {
        return {
          course_id: item.course_id.data,
          coach_id: item.coach_id.data,
          court_id: item.site_id[0] || 0,
          court_site_id: item.site_id[1] || 0,
          limit_num: item.limit_num.data,
          course_fee: item.course_fee.data,
          start_time: item.start_time.data
        }
      })
      let functionName =
        this.type === 'team' ? 'validTeamBatch' : 'validSmallBatch'
      this.courseRankPreviewService[functionName](params).subscribe(res => {
        if (res.is_commit) {
          this.teamBatch(params)
        } else {
          let data = res.course_schedule.map(item => {
            return {
              ...item,
              week_day: {
                valid: 0,
                data: item.week
              }
            }
          })
          this.messageService.warn({ content: '存在冲突无法提交' })
          this.dataTable.amount = res.amount
          res.course_schedule = data
          this.processing(res)
        }
      })
    },
    // 确定排期
    teamBatch(data) {
      let functionName = this.type === 'team' ? 'teamBatch' : 'smallBatch'
      this.courseRankPreviewService[functionName](data).subscribe(res => {
        this.$emit('success', res)
        this.messageService.success({ content: '排课成功' })
        this.show = false
      })
    },
    // 排期课程删除
    onDelCourse(data, item) {
      this.courseSchedule.splice(data, 1)
      this.courseScheduleOld = this.courseScheduleOld.filter(res => {
        if (res.index !== item.index) {
          return {
            ...res
          }
        }
      })
      console.log(this.courseSchedule, 'show')
      console.log(this.courseScheduleOld, 'old')
    },
    onEditCourse(data, index) {
      this.courseSchedule[index].isEdit = !data
    },
    // 改变选择教练与课程后的数据
    handleChange(e, index, type, item) {
      this.courseSchedule[index][type].name = e.label.replace(/[\r\n]/g, '')
      this.courseSchedule[index][type].data = e.key
      this.changeRed(index, item)
    },
    // 改变场地数据
    courtChange(e, i, item) {
      const id = e[0]
      const childrenId = e[1]
      this.courtOptions.forEach(item => {
        if (item.id === id) {
          this.courseSchedule[i].court_id.name = item.name
          this.courseSchedule[i].court_site_id.data = 0
          this.courseSchedule[i].court_site_id.name = ''
          if (item.children && item.children.length && childrenId) {
            item.children.forEach(ele => {
              if (ele.id === childrenId) {
                this.courseSchedule[i].court_site_id.data = ele.id
                this.courseSchedule[i].court_site_id.name = ele.name
              }
            })
          }
        }
      })
      this.changeRed(i, item)
    },
    // 改变时间数据
    handleChangeTime(e, i, type, item) {
      let d = moment(e).format('d') == 0 ? 7 : moment(e).format('d')
      this.courseSchedule[i].week_day.data = d
      this.courseSchedule[i][type].data = moment(e).format('YYYY-MM-DD HH:mm')
      this.changeRed(i, item)
    },
    changeRed(i, item) {
      this.courseSchedule[i].court_id.valid = 0
      this.courseSchedule[i].court_site_id.valid = 0
      this.courseSchedule[i].start_time.valid = 0
      this.courseSchedule[i].week_day.valid = 0
      this.courseSchedule[i].coach_id.valid = 0
      this.courseSchedule[i].limit_num.valid = 0
      this.courseSchedule[i].course_fee.valid = 0
      for (let x = 0; x < this.courseScheduleOld.length; x++) {
        let res = this.courseScheduleOld[x]
        if (res.index === item.index) {
          this.courseScheduleOld[x] = item
          return
        }
      }
    },
    // 显示数据处理
    processing(data) {
      this.amountValid = data.amount_valid
      this.courseSchedule = data.course_schedule.map((item, index) => {
        return {
          id: index,
          isEdit: false,
          ...item,
          site_id: [item.court_id.data, item.court_site_id.data],
          course_id_label: {
            key: item.course_id.data,
            label: item.course_id.name
          },
          coach_id_label: {
            key: item.coach_id.data,
            label: item.coach_id.name
          },
          index
        }
      })
      this.courseScheduleOld = cloneDeep(this.courseSchedule)
    }
  },
  created() {
    // 获取团课和私教小团课的课程和教练的选择项
    if (this.type === 'team') {
      this.coachOptions = this.coachOptionTeam // 教练
      this.courseOptions = this.courseOptionTeam // 课程
      this.courtOptions = this.courtOptionTeam // 场地
    } else {
      this.coachOptions = this.coachOptionSmall // 教练
      this.courseOptions = this.courseOptionSmall // 课程
    }
    if (this.type === 'small') {
      this.columns.splice(4, 1)
    }
    this.weekDays = this.weekDay.shop.week_day.value
    this.processing(this.dataTable)
  },
  computed: {
    columns
  }
}
</script>
