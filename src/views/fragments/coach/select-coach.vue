<template>
  <div>
    <a-table :columns="tableColumns" :dataSource="tableData" :pagination="false">
      <template slot="operation" slot-scope="text, record">
      <div>
        <a @click="delTableRecord(record.key)">删除</a>
      </div>
    </template>
    </a-table>
    <modal-link tag="a" :to="{ name: 'coach-select', props: { list, selected }, on: {
      change: onSelectComplete } }">
      <st-button type="dashed" block class="mg-t8">添加</st-button>
    </modal-link>
  </div>
</template>
<script>
import { SelectService } from './select-coach.service'
const tableColumns = [{
  title: '教练',
  dataIndex: 'coach_name'
}, {
  title: '教练等级',
  dataIndex: 'coach_level'
}, {
  title: '工作性质',
  dataIndex: 'coach_work_name'
}, {
  title: '在职状态',
  dataIndex: 'coach_status'
}, {
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]
export default {
  name: 'SelectCoach',
  serviceInject() {
    return {
      selectService: SelectService
    }
  },
  rxState() {
    return {
      list: this.selectService.list$
    }
  },
  props: {
    coachIds: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      tableColumns,
      tableData: [],
      selected: []
    }
  },
  created() {
    this.selectService.getCoachList().subscribe()
    this.selected = this.coachIds
    const tableData = this.getSelectedList(this.coachIds)
    this.tableData = tableData
  },
  methods: {
    onSelectComplete(coachIds) {
      const tableData = this.getSelectedList(coachIds)
      this.tableData = tableData
      this.selected = coachIds
      this.$emit('change', coachIds)
    },
    getSelectedList(coachIds = []) {
      const list = this.list
      const ret = []
      coachIds.forEach(id => {
        list.forEach(item => {
          if (+id === +item.coach_id) {
            item.key = item.coach_id
            ret.push(item)
          }
        })
      })
      console.log('get selected list', ret)
      return ret
    },
    delTableRecord(key) {
      const { tableData, selected } = this
      tableData.forEach((item, index) => {
        if (+item.key === +key) {
          tableData.splice(index, 1)
        }
      })
      selected.forEach((item, index) => {
        if (+item === +key) {
          selected.splice(index, 1)
        }
      })
      this.tableData = tableData
      this.selected = selected
      this.$emit('change', selected)
    }
  }
}
</script>
