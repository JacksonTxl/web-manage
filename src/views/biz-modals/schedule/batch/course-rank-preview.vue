<template>
  <st-modal
    title="团课批量排期预览"
    @ok="save"
    okText="确定"
    v-model="show"
    width="1060px"
  >
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
          <template slot="course_id" slot-scope="customRender, record">
            <!-- 选择课程 -->
            <a-select
              v-if="record.isEdit"
              placeholder="请选择课程"
              :value="record.course_id.data"
              style="width: 100px"
            >
              <a-select-option v-for="course in courseOptions" :key="course.id">
                {{ course.course_name }}
              </a-select-option>
            </a-select>
            <div :class="customRender.valid ? 'color_red' : ''" v-else>
              {{ customRender.name }}
            </div>
          </template>
          <!-- 选择时间 -->
          <template slot="start_time" slot-scope="customRender, record">
            <a-date-picker
              v-if="record.isEdit"
              :showTime="{ format: 'HH:mm' }"
              format="YYYY-MM-DD HH:mm"
              placeholder="请选择时间"
              style="width: 156px"
              :value="customRender.data | formatDate"
            />
            <div :class="customRender.valid ? 'color_red' : ''" v-else>
              {{ customRender.data }}
            </div>
          </template>
          <!-- 选择教练 -->
          <template slot="coach_id" slot-scope="customRender, record">
            <a-select
              v-if="record.isEdit"
              :placeholder="`请选择${$c('coach')}`"
              :value="record.coach_id.data"
              style="width: 100px"
            >
              <a-select-option v-for="coach in coachOptions" :key="coach.id">
                {{ coach.staff_name }}
              </a-select-option>
            </a-select>
            <div :class="customRender.valid ? 'color_red' : ''" v-else>
              {{ customRender.name }}
            </div>
          </template>
          <!-- 选择场地 -->
          <template slot="court_id" slot-scope="customRender, record">
            <a-cascader
              v-if="record.isEdit"
              placeholder="请选择场地"
              :value="[customRender.data, record.court_site_id.data]"
              :options="courtOptions"
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
          <template slot="limit_num" slot-scope="customRender, record">
            <st-input-number
              v-if="record.isEdit"
              v-model="customRender.data"
              style="width:100px"
            ></st-input-number>
            <div :class="customRender.valid ? 'color_red' : ''" v-else>
              {{ customRender.data }}
            </div>
          </template>
          <template slot="course_fee" slot-scope="customRender, record">
            <st-input-number
              v-if="record.isEdit"
              v-model="customRender.data"
              :float="true"
              style="width:100px"
            ></st-input-number>
            <div :class="customRender.valid ? 'color_red' : ''" v-else>
              {{ customRender.data }}
            </div>
          </template>
          <template slot="action" slot-scope="customRender, record, index">
            <a @click="onEditCourse(record.isEdit, index)" class="mg-r16">
              {{ record.isEdit ? '保存' : '修改' }}
            </a>
            <a @click="onDelCourse(index)">
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
import { TeamScheduleCommonService } from '@/views/pages/shop/product/course/schedule/team/service#/common.service'
import { columns } from './course-rank-preview.config'
export default {
  serviceInject() {
    return {
      courseRankPreviewService: CourseRankPreviewService,
      teamScheduleCommonService: TeamScheduleCommonService,
      userService: UserService
    }
  },
  rxState() {
    const tss = this.teamScheduleCommonService
    return {
      coachOptions: tss.coachOptions$,
      courseOptions: tss.courseOptions$,
      courtOptions: tss.courtOptions$,
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
      weekDays: {}
    }
  },
  methods: {
    // 课程标签切换触发
    handleSizeChange(e) {
      this.courseType = e.target.value
    },
    // 确定排期，开始验证
    save() {
      let params = []
      params = this.courseSchedule.map(item => {
        return {
          course_id: item.course_id.data,
          coach_id: item.coach_id.data,
          court_id: item.court_id.data,
          court_site_id: item.court_site_id.data,
          limit_num: item.limit_num.data,
          course_fee: item.course_fee.data,
          start_time: item.start_time.data
        }
      })
      let functiomName =
        this.type === 'team' ? 'validTeamBatch' : 'validSmallBatch'
      this.courseRankPreviewService[functiomName](params).subscribe(res => {
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
          res.course_schedule = data
          this.dataTable = res
          this.processing()
        }
      })
    },
    // 确定排期
    teamBatch(data) {
      let functiomName = this.type === 'team' ? 'teamBatch' : 'smallBatch'
      this.courseRankPreviewService[functiomName](data).subscribe(res => {
        this.$emit('success', res)
        this.show = false
      })
    },
    // 排期课程删除
    onDelCourse(data) {
      this.courseSchedule.splice(data, 1)
    },
    onEditCourse(data, index) {
      this.courseSchedule[index].isEdit = !data
    },
    // 显示数据处理
    processing() {
      this.amountValid = this.dataTable.amount_valid
      this.courseSchedule = this.dataTable.course_schedule.map(
        (item, index) => {
          return {
            id: index,
            isEdit: false,
            ...item
          }
        }
      )
    }
  },
  created() {
    this.weekDays = this.weekDay.shop.week_day.value
    this.processing()
  },
  computed: {
    columns
  }
}
</script>
