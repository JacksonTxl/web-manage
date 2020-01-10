<template>
  <st-modal
    :title="id ? '编辑团课周课表' : '新增团课周课表'"
    @ok="save"
    okText="确定"
    v-model="show"
    width="1082px"
    :class="basic()"
  >
    <div :class="basic('form')">
      <st-form :form="form" labelWidth="96px">
        <st-form-item label="课表名称" required>
          <a-input
            placeholder="请选择课表名称"
            v-decorator="decorators.templateName"
            :class="basic('form-name')"
            maxlength="30"
          />
        </st-form-item>
        <st-form-item label="排期起止时间" required>
          <a-range-picker
            v-decorator="decorators.dateTime"
            :disabledDays="180"
            :showTime="{ format: 'HH:mm' }"
            format="YYYY-MM-DD HH:mm"
          />
        </st-form-item>
        <st-form-item label="排课限制" required>
          最多排
          <st-input-number
            placeholder="不填则默认排满"
            :class="basic('form-number')"
            v-decorator="decorators.maxNumber"
          >
            <span slot="addonAfter">节</span>
          </st-input-number>
        </st-form-item>
        <st-form-item label="最多上课安排" required>
          <div :class="basic('border-box')">
            <st-form-table hoverable :isEmpty="false">
              <thead>
                <tr>
                  <th>星期</th>
                  <th>课程</th>
                  <th>开始时间</th>
                  <th>上课{{ $c('coach') }}</th>
                  <th>场地</th>
                  <th>人数</th>
                  <th>预约价格</th>
                  <th style="width:60px">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="8" class="st-form-table__add">
                    <st-button
                      type="dashed"
                      icon="add"
                      block
                      @click="addCourse"
                    >
                      添加
                    </st-button>
                  </td>
                </tr>
                <!-- course_id: '',
        coach_id: '',
        court_id: [],
        people_number: '',
        course_fee: '',
        week_day: '',
        start_time: '' -->
                <template v-for="(item, index) in scheduleInfo">
                  <tr :key="index">
                    <td>
                      <a-select
                        placeholder="请选择星期"
                        style="width: 85px"
                        v-model="item.week_day"
                      >
                        <a-select-option
                          v-for="week in weekDay"
                          :key="week.value"
                        >
                          {{ week.label }}
                        </a-select-option>
                      </a-select>
                    </td>
                    <td>
                      <a-select
                        placeholder="请选择课程"
                        style="width: 85px"
                        v-model="item.course_id"
                      >
                        <a-select-option
                          v-for="course in courseOptions"
                          :key="course.id"
                        >
                          {{ course.course_name }}
                        </a-select-option>
                      </a-select>
                    </td>
                    <td>
                      <a-time-picker
                        style="width: 120px"
                        placeholder="请选择时间"
                        format="HH:mm"
                        v-model="item.start_time"
                      />
                    </td>
                    <td>
                      <a-select
                        :placeholder="`请选择上课${$c('coach')}`"
                        style="width: 85px"
                        v-model="item.coach_id"
                      >
                        <a-select-option
                          v-for="coach in coachOptions"
                          :key="coach.id"
                        >
                          {{ coach.staff_name }}
                        </a-select-option>
                      </a-select>
                    </td>
                    <td>
                      <a-cascader
                        style="width: 85px"
                        placeholder="请选择场地"
                        v-model="item.court_id"
                        :options="courtOptions"
                        :fieldNames="{
                          label: 'name',
                          value: 'id',
                          children: 'children'
                        }"
                      />
                    </td>
                    <td>
                      <st-input-number
                        style="width: 90px"
                        v-model="item.people_number"
                      >
                        <span slot="addonAfter">人</span>
                      </st-input-number>
                    </td>
                    <td>
                      <st-input-number
                        :float="true"
                        style="width: 110px"
                        v-model="item.course_fee"
                      >
                        <span slot="addonAfter">元/节</span>
                      </st-input-number>
                    </td>
                    <td>
                      <template>
                        <a @click="delRow(index)">
                          删除
                        </a>
                      </template>
                    </td>
                  </tr>
                </template>
              </tbody>
            </st-form-table>
          </div>
        </st-form-item>
      </st-form>
    </div>
  </st-modal>
</template>
<script>
import { AddEditCourseService } from './add-edit-course.service'
import { TeamScheduleCommonService } from '@/views/pages/shop/product/course/schedule/team/service#/common.service'
import { UserService } from '@/services/user.service'
import { ruleOptions } from './add-edit-course.config'
export default {
  serviceInject() {
    return {
      addEditCourseService: AddEditCourseService,
      teamScheduleCommonService: TeamScheduleCommonService,
      userService: UserService
    }
  },
  rxState() {
    const tss = this.teamScheduleCommonService
    return {
      loading: this.addEditCourseService.loading$,
      weekDay: this.userService.getOptions$('shop.week_day'),
      coachOptionTeam: tss.coachOptions$,
      courseOptionTeam: tss.courseOptions$,
      courtOptionTeam: tss.courtOptions$
    }
  },
  filters: {
    formatDate(val) {
      return val ? moment(val) : undefined
    }
  },
  name: 'addEditCourseService',
  bem: {
    basic: 'modal-schedule-batch-add-edit-course'
  },
  props: {
    id: {
      type: [Number, String],
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      coachOptions: [],
      courseOptions: [],
      courtOptions: [],
      scheduleInfo: [],
      courseList: [
        {
          time: '2019-11-11 09:00:00',
          name: '周一课表',
          type: '类型一',
          num: '20',
          person: '王新元'
        }
      ],
      show: false
    }
  },
  created() {
    if (this.id) {
      this.addEditCourseService.getTeamInfo(this.id).subscribe(res => {
        this.form.setFieldsValue({
          templateName: res.info.template_name,
          maxNumber: res.info.max_number
        })
        this.scheduleInfo = res.info.schedule_info.map(item => {
          return {
            course_id: item.course_id,
            coach_id: item.coach_id,
            court_id: [item.court_id, item.court_site_id],
            people_number: item.people_number,
            course_fee: item.course_fee,
            week_day: item.week_day,
            start_time: item.start_time
              ? moment(item.start_time, 'HH:mm')
              : undefined
          }
        })
        console.log(res)
      })
    }
    if (this.type === 'team') {
      this.coachOptions = this.coachOptionTeam // 教练
      this.courseOptions = this.courseOptionTeam // 课程
      this.courtOptions = this.courtOptionTeam // 场地
    }
    console.log(this.weekDay)
    console.log(this.type)
  },
  methods: {
    // 添加课表
    addCourse() {
      // this.$emit('add')
      this.scheduleInfo.push({
        course_id: null,
        coach_id: null,
        court_id: [],
        people_number: '',
        course_fee: '',
        week_day: null,
        start_time: null
      })
    },
    delRow(index) {
      this.sites.splice(index, 1)
    },
    save(e) {
      console.log(moment(this.scheduleInfo[0].start_time).format('HH:mm'))
      console.log(this.scheduleInfo[0].start_time)
      this.form.validate().then(values => {
        console.log(values)
        console.log(moment(values.dateTime[0]).format('YYYY-MM-DD HH:mm'))
        console.log(moment(values.dateTime[1]).format('YYYY-MM-DD HH:mm'))
      })
      // this.show = false
      // this.$emit('success', true)
    }
  }
}
</script>
