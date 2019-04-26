<template>
  <div>
    <a-table :columns="tableColumns" :dataSource="list" :pagination="false" rowKey="id">
      <template slot="operation" slot-scope="text, record">
      <div>
        <a @click="delTableRecord(record.id)">删除</a>
      </div>
    </template>
    </a-table>
    <modal-link tag="a" :to="{ name: 'coach-select', props: { selected, shopIds }, on: {
      change: onSelectComplete } }">
      <st-button type="dashed" block class="mg-t8">添加</st-button>
    </modal-link>
  </div>
</template>
<script>
import { SelectCoachService } from './select-coach.service'

const tableColumns = [{
  title: '教练',
  dataIndex: 'name'
}, {
  title: '教练等级',
  dataIndex: 'level'
}, {
  title: '工作性质',
  dataIndex: 'nature_work'
}, {
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]
export default {
  name: 'SelectCoach',
  serviceInject() {
    return {
      selectCoachService: SelectCoachService
    }
  },
  rxState() {
    return {
      list: this.selectCoachService.list$
    }
  },
  props: {
    coachIds: {
      type: Array,
      default() {
        return []
      }
    },
    shopIds: {
      type: Array,
      default() {
        return []
      }
    }
  },
  watch: {
    shopIds(val) {
      console.log('shop change', val)
    }
  },
  data() {
    return {
      tableColumns,
      selected: []
    }
  },
  created() {
    this.selected = this.coachIds
    this.getSelectedList(this.coachIds)
  },
  methods: {
    onSelectComplete(coachIds) {
      this.getSelectedList(coachIds)
      this.selected = coachIds
      console.log('on select complete', coachIds)
      this.$emit('change', coachIds)
    },
    getSelectedList(coachIds = []) {
      console.log('get selected', coachIds)
      if (coachIds.length) {
        this.selectCoachService.getCoachBasic({
          coach_ids: coachIds
        }).subscribe()
      }
    },
    delTableRecord(id) {
      const { list, selected } = this
      list.forEach((item, index) => {
        if (+item.id === +id) {
          list.splice(index, 1)
        }
      })
      selected.forEach((item, index) => {
        if (+item === +id) {
          selected.splice(index, 1)
        }
      })
      this.list = list
      this.selected = selected
      this.$emit('change', selected)
    }
  }
}
</script>
