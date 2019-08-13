<template>
  <st-modal
    class="modal-reserved"
    title="批量新增课程排期"
    @ok="onOkSaveForm"
    width="1366px"
    v-model="show"
  >
    <st-table :columns="columns" :page="false" :dataSource="data" bordered>
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
          placeholder="请选择时间"
          :value="text | formatDate"
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
            {{ course.course_name }}
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
          style="width: 120px"
          @change="e => handleChange(e, record.key, 'coach_id')"
        >
          <a-select-option v-for="coach in coachOptions" :key="coach.id">
            {{ coach.staff_name }}
          </a-select-option>
        </a-select>
        <template v-else>
          {{ record.show.coach_id_show }}
        </template>
      </template>

      <template slot="court_site_id" slot-scope="text, record">
        <a-cascader
          v-if="record.editable"
          placeholder="请选择场地"
          :value="text"
          :options="courtOptions"
          @change="e => handleChange(e, record.key, 'court_site_id')"
          :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
        />
        <template v-else>
          {{ record.show.court_site_id_show }}
        </template>
      </template>

      <template slot="limit_num" slot-scope="text, record">
        <div>
          <a-input
            v-if="record.editable"
            style="margin: -5px 0;width:80px;"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, 'limit_num')"
          >
            <span slot="suffix">人</span>
          </a-input>
          <template v-else>
            {{ text }}人
          </template>
        </div>
      </template>
      <template slot="course_fee" slot-scope="text, record">
        <div>
          <a-input
            v-if="record.editable"
            style="margin: -5px 0;width:80px;"
            :value="text"
            @change="
              e => handleChange(e.target.value, record.key, 'course_fee')
            "
          >
            <span slot="suffix">元/节</span>
          </a-input>
          <template v-else>
            {{ text }}元/节
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
import { TeamScheduleCommonService } from '@/views/pages/shop/product/course/schedule/team/service#/common.service'
import { TeamScheduleScheduleService } from '@/views/pages/shop/product/course/schedule/team/service#/schedule.service'
import { MessageService } from '@/services/message.service'
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
    title: '座位模版',
    dataIndex: 'court_site_id',
    scopedSlots: { customRender: 'court_site_id' }
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
    scopedSlots: { customRender: 'operation' }
  }
]
export default {
  name: 'AddCourseScheduleBatch',
  serviceInject() {
    return {
      teamScheduleCommonService: TeamScheduleCommonService,
      teamScheduleScheduleService: TeamScheduleScheduleService,
      msg: MessageService
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
          limit_num: 0,
          court_site_id: []
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
        court_site_id: '',
        show: {}
      },
      show: false,
      columns
    }
  },
  filters: {
    formatDate(val) {
      return val ? moment(val) : undefined
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
          item.start_time = moment(item.start_time).format('YYYY-MM-DD HH:mm')
          item.court_id = item.court_site_id[0]
          item.court_site_id = item.court_site_id[1]
          item.limit_num = +item.limit_num
          item.course_fee = +item.course_fee
          return item
        })
      this.teamScheduleScheduleService
        .addScheduleInBatch(data)
        .subscribe(res => {
          this.show = false
          this.$emit('ok')
        })
    },
    handleChange(value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
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
        'course_name'
      )
      data.show.coach_id_show = this.getOptionName(
        data.coach_id,
        this.coachOptions,
        'staff_name'
      )
      data.show.court_site_id_show = this.getCourtSiteName(
        data.court_site_id,
        this.courtOptions
      )
      return data
    },
    getOptionName(id, options, name) {
      let option = ''
      options.forEach(ele => {
        if (ele.id === id) {
          option = ele[name]
        }
      })
      return option
    },
    getCourtSiteName(ids, options) {
      const id = ids[0]
      const childrenId = ids[1]
      let name = ''
      options.forEach(item => {
        if (item.id === id) {
          name = item.name
          if (item.children && item.children.length && childrenId) {
            item.children.forEach(ele => {
              if (ele.id === childrenId) {
                name = `${name} - ${ele.name}`
              }
            })
          }
        }
      })
      return name
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
          court_site_id: [],
          show: {}
        })
        this.data = newData
        this.cacheData = newData.map(item => ({ ...item }))
        return
      }
      if (target) {
        delete target.editable
        newData.forEach(item => {
          if (item.key === key && key !== 0) {
            item = this.getShowTableData(item)
          }
        })
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
    }
  }
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
