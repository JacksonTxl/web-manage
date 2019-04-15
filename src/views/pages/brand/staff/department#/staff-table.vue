<template>
  <st-table
  class="page-staff-table"
  :loading="loading"
  :alertSelection="{onReset: start}"
  :rowSelection="{selectedRowKeys:
  selectedRowKeys, onChange: onSelectChange}"
  :columns="columns" :dataSource="staffList"
  :scroll="{ x: 1500}">
    <div class="page-staff-table-action" slot="action">
        <a href="" class="mg-r8">详情</a>
        <a href="">编辑</a>
        <st-more-dropdown>
          <a-menu-item v-for="(op, index) in opreations" :key="index" @click="op.clickName"><modal-link tag="a" :to="op.route">{{op.name}}</modal-link></a-menu-item>
        </st-more-dropdown>
    </div>
    <div slot="status" slot-scope="status">
      <a-badge :status="status == 1 ? 'success' : 'error'" />{{status == 1 ? '在职' : '不在职'}}
    </div>
    <div class="page-staff-table-name" slot="staff_name"  slot-scope="text, record">
      <img class="page-staff-table-name__img mg-r8" :src="record.avatar" ><span class="name">{{text}}</span>
    </div>
  </st-table>
</template>
<script>
import { columns } from './staff-table.config'
export default {
  data() {
    return {
      columns,
      selectedRowKeys: [],
      opreations: [
        { clickName: this.onClickSettingSalary, tag: 'a', name: '设置薪资账户', route: { name: 'staff-bind-entity-card' } },
        { clickName: this.onClickUpdateStaffPosition, tag: 'a', name: '更改员工职位', route: { name: 'staff-update-staff-position' } },
        { clickName: this.onClickTurnover, tag: 'a', name: '离职', route: { name: 'staff-turnover' } },
        { clickName: this.onCLickReinstatement, tag: 'a', name: '复职', route: { name: 'staff-reinstatement' } },
        { clickName: this.onCLickDeleteStaff, tag: 'a', name: '删除', route: { name: 'staff-delete' } }
      ]
    }
  },
  props: {
    staffList: {
      type: Array,
      default: () => {
        return []
      }
    },
    loading: {
      type: Boolean,
      defalut: false
    }
  },
  methods: {
    onClickSettingSalary() {
      console.log('onClickSettingSalary')
    },
    onClickUpdateStaffPosition() {
      console.log('onClickUpdateStaffPosition')
    },
    onClickTurnover() {
      console.log('onClickTurnover')
    },
    start() {
      this.selectedRowKeys = []
    },
    onChange() {

    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    onCLickReinstatement() {
      console.log('onCLickReinstatement')
    }
  }
}
</script>
