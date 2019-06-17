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
        <a href="javascript:void()" @click="staffInfo(record)" class="mg-r8">详情</a>
        <a href="javascript:void()" @click="editStaff(record.id)">编辑</a>
        <st-more-dropdown>
          <a-menu-item v-if="record.work_status.id === 1"><modal-link tag="a" :to="{ name: 'staff-bind-entity-card', props: {staff: record} }"> {{record.has_card ? '重绑定实体卡':'绑定实体卡'}}</modal-link></a-menu-item>
          <a-menu-item v-if="record.work_status.id === 1"><modal-link tag="a" :to="{ name: 'staff-update-staff-position', props: {staff: record} }">职位变更</modal-link></a-menu-item>
          <a-menu-item v-if="record.work_status.id === 1"><modal-link tag="a" :to="{ name: 'staff-turnover', props: {staff: record} } ">离职</modal-link></a-menu-item>
          <a-menu-item v-else><modal-link tag="a" :to="{ name: 'staff-reinstatement', props: {staff: record} }">复职</modal-link></a-menu-item>
          <a-menu-item v-if="record.work_status.id === 1"><modal-link tag="a" :to="{ name: 'staff-re-password', props: {staff: record} }">管理登录账号</modal-link></a-menu-item>
          <a-menu-item v-if="record.work_status.id === 1"><modal-link tag="a" :to="{ name: 'staff-salary-account-setting', props: {staff: record} }">设置薪资账户</modal-link></a-menu-item>
          <a-menu-item ><modal-link tag="a" :to="{ name: 'staff-delete', props: {staff: record} }">删除</modal-link></a-menu-item>
        </st-more-dropdown>
    </div>
    <div slot="work_status" slot-scope="work_status">
      <a-badge :status="work_status.id == 1 ? 'success' : 'error'" />{{work_status.name}}
    </div>
    <div slot="shop" slot-scope="shop">
      <a v-modal-link="{ name: 'staff-shop-with-staff', props: {shopList: shop} }" v-if="shop.length">{{shop|shopFilter}}</a>
      <span v-else>{{shop|shopFilter}}</span>
    </div>
    <div slot="identity" slot-scope="identity">
      {{identity | identityNames}}
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
  filters: {
    shopFilter(val) {
      return val.length === 0 ? '--' : `共${val.length}家门店`
    },
    identityNames(val) {
      console.log(val)
      if (val.length === 0) return '--'
      return val.map(item => {
        return item.name
      }).join(',')
    }
  },
  methods: {
    staffInfo(staff) {
      this.$router.push({ name: 'brand-staff-info',
        query: {
          id: staff.id } })
    },
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
