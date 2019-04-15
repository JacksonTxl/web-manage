<template>
  <div>
    <a-table :columns="tableColumns" :dataSource="tableData" :pagination="false">
      <template slot="operation" slot-scope="text, record">
      <div>
        <a @click="delTableRecord(record.key)">删除</a>
      </div>
    </template>
    </a-table>
    <modal-link tag="a" :to="{ name: 'coach-select', props: { selected: selectedCoachIds }, on: {
      change: onSelectComplete } }">
      <st-button type="dashed" block class="mg-t8">添加</st-button>
    </modal-link>
  </div>
</template>
<script>
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
      selectedCoachIds: []
    }
  },
  created() {
    this.selectedCoachIds = this.coachIds
    const tableData = this.getCoaches(this.coachIds)
    this.tableData = tableData
  },
  methods: {
    onSelectComplete(coachIds) {
      const tableData = this.getCoaches(coachIds)
      this.tableData = tableData
      this.selectedCoachIds = coachIds
      this.$emit('change', coachIds)
    },
    getCoaches(coachIds = []) {
      const data = {
        '1': {
          'key': '1',
          'coach_name': '教练A',
          'coach_level': 1,
          'coach_work_name': '全职',
          'coach_id': 1
        },
        '2': {
          'key': '2',
          'coach_name': '教练B',
          'coach_level': 2,
          'coach_work_name': '全职',
          'coach_id': 2
        },
        '3': {
          'key': '3',
          'coach_name': '教练C',
          'coach_level': 3,
          'coach_work_name': '全职',
          'coach_id': 3
        }
      }
      const ret = []
      coachIds.forEach(item => {
        if (data[item]) {
          ret.push(data[item])
        }
      })
      return ret
    },
    delTableRecord(key) {
      const { tableData, selectedCoachIds } = this
      tableData.forEach((item, index) => {
        if (+item.key === +key) {
          tableData.splice(index, 1)
        }
      })
      selectedCoachIds.forEach((item, index) => {
        if (+item === +key) {
          selectedCoachIds.splice(index, 1)
        }
      })
      this.tableData = tableData
      this.selectedCoachIds = selectedCoachIds
      this.$emit('change', selectedCoachIds)
    }
  }
}
</script>
