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
          <span class="mg-r16">总排课数：节&nbsp;&nbsp;&nbsp;</span>
          冲突节数：
          <span :class="basic('title--high')">节</span>
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
          :scroll="{ y: 320 }"
          :dataSource="dataTable"
        >
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
            <template v-else>
              {{ record.course_id.name }}
            </template>
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
            <template v-else>
              {{ record.start_time.data }}
            </template>
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
            <template v-else>
              {{ record.coach_id.name }}
            </template>
          </template>
          <!-- 选择场地 -->
          <template slot="court_id" slot-scope="customRender, record">
            <a-cascader
              v-if="record.isEdit"
              placeholder="请选择场地"
              :value="[customRender.data]"
              :options="courtOptions"
              :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
            />
            <template v-else>
              {{ record.court_id.name
              }}{{
                record.court_site_id.data ? `-${record.court_site_id.name}` : ''
              }}
            </template>
          </template>
          <template slot="limit_num" slot-scope="customRender, record">
            <st-input-number
              v-if="record.isEdit"
              v-model="customRender.data"
              style="width:100px"
            ></st-input-number>
            <template v-else>
              {{ record.limit_num.data }}
            </template>
          </template>
          <template slot="course_fee" slot-scope="customRender, record">
            <st-input-number
              v-if="record.isEdit"
              v-model="customRender.data"
              :float="true"
              style="width:100px"
            ></st-input-number>
            <template v-else>
              {{ record.course_fee.data }}
            </template>
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
import { TeamScheduleCommonService } from '@/views/pages/shop/product/course/schedule/team/service#/common.service'
import { columns } from './course-rank-preview.config'
export default {
  serviceInject() {
    return {
      courseRankPreviewService: CourseRankPreviewService,
      teamScheduleCommonService: TeamScheduleCommonService
    }
  },
  rxState() {
    const tss = this.teamScheduleCommonService
    return {
      coachOptions: tss.coachOptions$,
      courseOptions: tss.courseOptions$,
      courtOptions: tss.courtOptions$
    }
  },
  bem: {
    basic: 'modal-schedule-team-course-rank-preview'
  },
  name: 'courseRankPreviewService',
  props: {},
  filters: {
    formatDate(val) {
      return val ? moment(val) : undefined
    }
  },
  data() {
    return {
      courseType: 'all', // 课程状态：全部课程all  部分课程part
      show: false,
      dataTable: [
        {
          week: '星期二',
          course_id: {
            data: 5,
            valid: 0,
            name: '课程名'
          },
          coach_id: {
            data: 2,
            valid: 0,
            name: '教练名'
          },
          court_id: {
            data: 294249015346224,
            valid: 0,
            name: '场地名'
          },
          court_site_id: {
            data: '',
            valid: 0,
            name: '场地名'
          },
          limit_num: {
            valid: 0,
            data: '10'
          },
          course_fee: {
            valid: 0,
            data: '36.1'
          },
          start_time: {
            valid: 0,
            data: '2019-11-11 09:00:00'
          }
        },
        {
          week: '星期二',
          course_id: {
            data: 5,
            valid: 0,
            name: '课程名'
          },
          coach_id: {
            data: 2,
            valid: 0,
            name: '教练名'
          },
          court_id: {
            data: 294249015346224,
            valid: 0,
            name: '场地名'
          },
          court_site_id: {
            data: '',
            valid: 0,
            name: '场地名'
          },
          limit_num: {
            valid: 0,
            data: '10'
          },
          course_fee: {
            valid: 0,
            data: '36.1'
          },
          start_time: {
            valid: 0,
            data: '2019-11-11 09:00:00'
          }
        }
      ]
    }
  },
  methods: {
    // 课程标签切换触发
    handleSizeChange(e) {
      this.courseType = e.target.value
    },
    save() {
      this.$emit('success')
    },
    // 排期课程删除
    onDelCourse(data) {
      console.log(data)
    },
    onEditCourse(data, index) {
      this.dataTable[index].isEdit = !data
      console.log(this.dataTable[index].isEdit)
    }
  },
  created() {
    console.log(this.coachOptions)
    console.log(this.courseOptions)
    console.log(this.courtOptions)
    this.dataTable = this.dataTable.map((item, index) => {
      return {
        id: index,
        isEdit: false,
        ...item
      }
    })
  },
  computed: {
    columns
  }
}
</script>
