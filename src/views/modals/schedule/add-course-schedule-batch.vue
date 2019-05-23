<template>
<st-modal class="modal-reserved" title="批量新增课程排期" @ok="save" :footer="null" width="1366px" v-model="show">
  <st-table :columns="columns" :dataSource="data" bordered>
    <a-date-picker
      slot="start_time"
      showTime
      format="YYYY-MM-DD HH:mm:ss"
      placeholder="Select Time"
      @change="onChange"
      @ok="onOk"
    />
    <template v-for="col in ['course_id', 'coach_id', 'court_site_id', 'limit_num', 'course_fee']" :slot="col" slot-scope="text, record">
      <div :key="col">
        <a-input
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          @change="e => handleChange(e.target.value, record.key, col)"/>
        <template v-else>{{text}}</template>
      </div>
    </template>
    <template slot="operation" slot-scope="text, record">
      <div class='editable-row-operations'>
        <span v-if="record.editable">
          <a @click="() => save(record.key)">Save</a>
          <a-popconfirm title='Sure to cancel?' @confirm="() => cancel(record.key)">
            <a>Cancel</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a @click="() => edit(record.key)">Edit</a>
        </span>
      </div>
    </template>
  </st-table>
</st-modal>
</template>
<script>
import { cloneDeep } from 'lodash-es'
const columns = [{
  title: '日期',
  dataIndex: 'start_time',
  scopedSlots: { customRender: 'start_time' }
}, {
  title: '课程',
  dataIndex: 'course_id',
  scopedSlots: { customRender: 'course_id' }
}, {
  title: '上课教练',
  dataIndex: 'coach_id',
  scopedSlots: { customRender: 'coach_id' }
}, {
  title: '座位模版',
  dataIndex: 'court_site_id',
  scopedSlots: { customRender: 'court_site_id' }
}, {
  title: '人数',
  dataIndex: 'limit_num',
  scopedSlots: { customRender: 'limit_num' }
}, {
  title: '课时费',
  dataIndex: 'course_fee',
  scopedSlots: { customRender: 'course_fee' }
}, {
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]
export default {
  name: 'AddCourseScheduleBatch',
  data() {
    const data = []
    for (let i = 0; i < 100; i++) {
      if (i === 0) {
        data.push({
          key: 0,
          editable: true,
          start_time: '',
          course_id: '',
          coach_id: '',
          court_site_id: ''
        })
      } else {
        data.push({
          key: i,
          start_time: i.toString(),
          course_id: `Edrward ${i}`,
          coach_id: 32,
          court_site_id: `London Park no. ${i}`
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
        court_site_id: ''
      },
      show: false,
      columns
    }
  },
  methods: {
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
    save(key) {
      let newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (key === 0 && target) {
        delete target.editable
        delete newData[0].editable
        newData.unshift({
          key: 0,
          editable: true,
          start_time: '',
          course_id: '',
          coach_id: '',
          court_site_id: ''
        })
        this.data = newData
        this.cacheData = newData.map(item => ({ ...item }))
        return
      }
      if (target) {
        delete target.editable
        this.data = newData
        this.cacheData = newData.map(item => ({ ...item }))
      }
    },
    cancel(key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
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
