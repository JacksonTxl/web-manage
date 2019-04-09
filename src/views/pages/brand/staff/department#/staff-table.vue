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
const columns = [
  { title: '姓名', width: 100, dataIndex: 'staff_name', sorter: true, key: 'name', fixed: 'left', scopedSlots: { customRender: 'staff_name' } },
  { title: '昵称', width: 100, dataIndex: 'nickname', key: 'nickname' },
  { title: '手机号', dataIndex: 'mobile', key: '1', width: 150 },
  { title: '工号', dataIndex: 'staff_id', key: '2', width: 150 },
  { title: '所在门店', dataIndex: 'shop_name', key: '3', width: 150 },
  { title: '所属部门', dataIndex: 'brand_name', key: '4', width: 150 },
  { title: '身份', dataIndex: 'identity', key: '5', width: 150 },
  { title: '在职状态', dataIndex: 'address', key: '6', width: 150 },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]

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
