<template>
  <st-modal
    class="modal-reserved"
    title="批量新增课程排期"
    @ok="onOkSaveForm"
    width="1366px"
    v-model="show"
  >
    <st-table
      rowKey="course_id"
      :columns="columns"
      :page="false"
      :dataSource="data"
      bordered
    >
      <span slot="startTimeTitle" class="modal-table-title">
        <i class="color-danger mg-r8">*</i>
        日期
      </span>
      <span slot="courseIdTitle" class="modal-table-title">
        <i class="color-danger mg-r8">*</i>
        课程
      </span>
      <span slot="coachIdTitle" class="modal-table-title">
        <i class="color-danger mg-r8">*</i>
        上课教练
      </span>
      <span slot="limitNumTitle" class="modal-table-title">
        <i class="color-danger mg-r8">*</i>
        人数
      </span>
      <span slot="courseFeeTitle" class="modal-table-title">
        <i class="color-danger mg-r8">*</i>
        课时费
      </span>
      <template slot="start_time" slot-scope="text, record">
        <a-date-picker
          v-if="record.editable"
          :showTime="{ format: 'HH:mm' }"
          format="YYYY-MM-DD HH:mm"
          placeholder="Select Time"
          :value="text"
          @change="e => handleChange(e, record.key, 'start_time')"
        />
        <template v-else>
          {{ record.show.start_time_show }}
        </template>
      </template>

      <template slot="course_id" slot-scope="text, record">
        <a-select
          v-if="record.editable"
          placeholder="请选择课程"
          style="width: 180px"
          :value="text"
          @change="e => handleChange(e, record.key, 'course_id')"
        >
          <a-select-option v-for="course in courseOptions" :key="course.id">
            {{ course.name }}
          </a-select-option>
        </a-select>
        <template v-else>
          {{ record.show.course_id_show }}
        </template>
      </template>

      <template slot="coach_id" slot-scope="text, record">
        <a-select
          v-if="record.editable"
          placeholder="请选择教练"
          :value="text"
          style="width: 180px"
          @change="e => handleChange(e, record.key, 'coach_id')"
        >
          <a-select-option v-for="coach in courseCoachOptions" :key="coach.id">
            {{ coach.name }}
          </a-select-option>
        </a-select>
        <template v-else>
          {{ record.show.coach_id_show }}
        </template>
      </template>

      <template slot="limit_num" slot-scope="text, record">
        <div>
          <a-input
            v-if="record.editable"
            style="margin: -5px 0;width:100px;"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, 'limit_num')"
          >
            <span slot="suffix">人</span>
          </a-input>
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="course_fee" slot-scope="text, record">
        <div>
          <a-input
            v-if="record.editable"
            style="margin: -5px 0;width:100px;"
            :value="text"
            @change="
              e => handleChange(e.target.value, record.key, 'course_fee')
            "
          >
            <span slot="suffix">元/节</span>
          </a-input>
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">保存</a>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)">编辑</a>
            <a @click="() => deleteData(record.key)">删除</a>
          </span>
        </div>
      </template>
    </st-table>
  </st-modal>
</template>
<script>
import { cloneDeep } from 'lodash-es'
import { PersonalTeamScheduleCommonService as CommonService } from '@/views/pages/shop/product/course/schedule/personal-team.service#/common.service'
import { PersonalTeamScheduleScheduleService as ScheduleService } from '@/views/pages/shop/product/course/schedule/personal-team.service#/schedule.service'
import { MessageService } from '@/services/message.service'
import { RouteService } from '../../../../services/route.service'
const columns = [
  {
    dataIndex: 'start_time',
    slots: { title: 'startTimeTitle' },
    scopedSlots: { customRender: 'start_time' }
  },
  {
    dataIndex: 'course_id',
    slots: { title: 'courseIdTitle' },
    scopedSlots: { customRender: 'course_id' }
  },
  {
    dataIndex: 'coach_id',
    slots: { title: 'coachIdTitle' },
    scopedSlots: { customRender: 'coach_id' }
  },
  {
    dataIndex: 'limit_num',
    slots: { title: 'limitNumTitle' },
    scopedSlots: { customRender: 'limit_num' }
  },
  {
    dataIndex: 'course_fee',
    slots: { title: 'courseFeeTitle' },
    scopedSlots: { customRender: 'course_fee' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: { title: 'courseFeeTitle' },
    scopedSlots: { customRender: 'operation' }
  }
]
export default {
  name: 'AddCourseScheduleBatch',
  serviceInject() {
    return {
      commonService: CommonService,
      scheduleService: ScheduleService,
      routeService: RouteService,
      msg: MessageService
    }
  },
  rxState() {
    const commonService = this.commonService
    return {
      courseOptions: commonService.courseOptions$,
      courseCoachOptions: commonService.courseCoachOptions$
    }
  },
  data() {
    const data = []
    for (let i = 0; i < 100; i++) {
      if (i === 0) {
        data.push({
          key: 0,
          editable: true,
          start_time: moment(),
          course_id: '',
          coach_id: '',
          limit_num: 0
        })
      }
    }
    this.cacheData = data.map(item => ({ ...item }))
    return {
      data,
      obj: {
        key: 0,
        editable: true,
        start_time: '',
        course_id: '',
        coach_id: '',
        show: {}
      },
      show: false,
      columns
    }
  },
  methods: {
    validateForm(form) {
      if (!form.start_time) {
        this.msg.error({ content: '排期开始时间不能为空' })
        return false
      }
      if (!form.course_id) {
        this.msg.error({ content: '请选择课程' })
        return false
      }
      if (!form.coach_id) {
        this.msg.error({ content: '请选择课程教练' })
        return false
      }
      if (!form.limit_num) {
        this.msg.error({ content: '请输入上课人数' })
        return false
      }
      if (!form.course_fee) {
        this.msg.error({ content: '请输入课时费' })
        return false
      }
      return true
    },
    onOkSaveForm() {
      let data = cloneDeep(this.data)
      data = data
        .filter((item, index) => {
          return index !== 0
        })
        .map(item => {
          delete item.show
          delete item.key
          delete item.editable
          item.start_time = moment(item.start_time)
            .format('YYYY-MM-DD HH:mm:ss')
            .valueOf()
          item.limit_num = +item.limit_num
          item.course_fee = +item.course_fee
          return item
        })
      this.scheduleService
        .addScheduleInBatch(data)
        .subscribe(this.onSubmitSuccess)
    },
    handleChange(value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (column === 'course_id') {
        this.commonService.getCourseCoachList(value).subscribe()
        target.coach_id = ''
      }
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit(key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    deleteData(key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.data = newData.filter(item => {
          return item.key !== key
        })
      }
    },
    getShowTableData(data) {
      data.key = Math.random()
      data.show = {}
      data.show.start_time_show = moment(data.start_time).format(
        'YYYY-MM-DD HH:mm'
      )
      data.show.course_id_show = this.getOptionName(
        data.course_id,
        this.courseOptions,
        'name'
      )
      data.show.coach_id_show = this.getOptionName(
        data.coach_id,
        this.courseCoachOptions,
        'name'
      )
      return data
    },
    getOptionName(id, options, name) {
      let option = []
      options.forEach(ele => {
        if (ele.id === id) {
          option = ele[name]
        }
      })
      return option
    },
    save(key) {
      let newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (!this.validateForm(target)) {
        return ''
      }
      if (key === 0 && target) {
        delete target.editable
        delete newData[0].editable
        newData[0] = this.getShowTableData(newData[0])
        newData.unshift({
          key: 0,
          editable: true,
          start_time: moment(),
          course_id: '',
          coach_id: '',
          limit_num: 0,
          show: {}
        })
        this.data = newData
        this.cacheData = newData.map(item => ({ ...item }))
        return
      }
      if (target) {
        delete target.editable
        if (newData.length) {
          newData.forEach(item => {
            if (item.key === key && key !== 0) {
              item = this.getShowTableData(item)
            }
          })
        }
        this.data = newData
        this.cacheData = newData.map(item => ({ ...item }))
      }
    },
    cancel(key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter(item => key === item.key)[0]
        )
        delete target.editable
        this.data = newData
      }
    },
    onSubmitSuccess() {
      this.show = false
      this.$emit('ok')
    }
  }
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
