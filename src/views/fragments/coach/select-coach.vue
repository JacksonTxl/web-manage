<template>
  <div>
    <st-table
      :columns="tableColumns"
      :dataSource="list"
      :pagination="false"
      rowKey="id"
      :scroll="{ y: 270 }"
    >
      <template slot="operation" slot-scope="text, record">
      <div>
        <a @click="delTableRecord(record.id)">删除</a>
      </div>
    </template>
    </st-table>
    <a v-modal-link="{
      name: 'coach-select',
      props: {
        selected,
        shopIds
      },
      on: {
        change: onSelectComplete
      }
    }">
      <st-button type="dashed" icon="add" block class="mg-t8">添加</st-button>
    </a>
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
  data() {
    return {
      tableColumns,
      selected: [],
      list: []
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
      if (coachIds.length) {
        this.selectCoachService.getCoachBasic({
          coach_ids: coachIds
        }).subscribe(res => {
          this.list = res.coaches
        })
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
