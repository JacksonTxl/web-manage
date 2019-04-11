<template>
  <st-table :loading="loading" :columns="columns" :dataSource="staffList" :scroll="{ x: 1500}">
    <div slot="action"  href="javascript:;">
        <div>
          <a href="">详情</a>
          <a href="">编辑</a>
        </div>
        <st-more-dropdown>
          <a-menu-item v-for="(op, index) in opreations" :key="index" @click="op.clickName"><modal-link tag="a" :to="op.route">{{op.name}}</modal-link></a-menu-item>
        </st-more-dropdown>
    </div>
    <span slot="name"  slot-scope="staff_name">
      <span class="avt" style="">{{name.avatar}}</span><span class="name">{{staff_name}}</span>
    </span>
  </st-table>
</template>
<script>

export default {
  data() {
    return {
      columns,
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
    onCLickReinstatement() {
      console.log('onCLickReinstatement')
    }
  }
}
</script>
