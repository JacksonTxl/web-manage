<template>
  <st-table
  class="page-staff-table"
  :loading="loading"
  :alertSelection="{onReset: start}"
  :rowSelection="{selectedRowKeys:
  selectedRowKeys, onChange: onSelectChange}"
  :columns="columns" :dataSource="staffList"
  :scroll="{ x: 1500}">
    <div class="page-staff-table-action" slot="action" slot-scope="text, record">
        <a href="javascript:void()" class="mg-r8">详情</a>
        <a href="javascript:void()" @click="editStaff(record.staff_id)">编辑</a>
        <st-more-dropdown>
          <a-menu-item ><modal-link tag="a" :to="{ name: 'staff-bind-entity-card', props: {staffId: record.staff_id || 1} }">设置薪资账户</modal-link></a-menu-item>
          <a-menu-item ><modal-link tag="a" :to="{ name: 'staff-update-staff-position', props: {staffId: record.staff_id || 1} }">更改员工职位</modal-link></a-menu-item>
          <a-menu-item ><modal-link tag="a" :to="{ name: 'staff-turnover', props: {staff_id: record.staff_id || 1} } ">离职</modal-link></a-menu-item>
          <a-menu-item ><modal-link tag="a" :to="{ name: 'staff-reinstatement', props: {staff_id: record.staff_id || 1} }">复职</modal-link></a-menu-item>
          <a-menu-item ><modal-link tag="a" :to="{ name: 'staff-delete', props: {staff_id: record.staff_id || 1} }">删除</modal-link></a-menu-item>
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
      selectedRowKeys: []
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
    editStaff(staffId) {
      this.$emit('edit-staff', staffId)
    },
    onClickSettingSalary(id) {
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
