<template>
  <st-table :columns="columns" :dataSource="data" :scroll="{ x: 1500, y: 300 }"  class="page-shop-staff-table">
     <div class="page-staff-table-name" slot="staff_name"  slot-scope="text, record">
      <img class="page-staff-table-name__img mg-r8" :src="record.avatar" ><span class="name">{{text}}</span>
    </div>
    <div slot="status" slot-scope="status">
      <a-badge :status="status == 1 ? 'success' : 'error'" />{{status == 1 ? '在职' : '不在职'}}
    </div>
    <template slot="action" slot-scope="text,record">
        <a href="javascript:;" @click="onSearchDetail(record)">详情</a>
        <a-divider type="vertical"></a-divider>
        <a href="javascript:;" @click="onEdit(record)">编辑</a>
        <a-divider type="vertical"></a-divider>
        <st-more-dropdown>
          <a-menu-item ><modal-link tag="a" :to="{ name: 'staff-bind-entity-card', props: {staffId: record.staff_id || 1} }">设置薪资账户</modal-link></a-menu-item>
          <a-menu-item ><modal-link tag="a" :to="{ name: 'staff-update-staff-position', props: {staffId: record.staff_id || 1} }">更改员工职位</modal-link></a-menu-item>
          <a-menu-item ><modal-link tag="a" :to="{ name: 'staff-turnover', props: {staff_id: record.staff_id || 1} } ">离职</modal-link></a-menu-item>
          <a-menu-item ><modal-link tag="a" :to="{ name: 'staff-reinstatement', props: {staff_id: record.staff_id || 1} }">复职</modal-link></a-menu-item>
          <a-menu-item ><modal-link tag="a" :to="{ name: 'staff-delete', props: {staff_id: record.staff_id || 1} }">删除</modal-link></a-menu-item>
        </st-more-dropdown>
    </template>

  </st-table>
</template>
<script>
const columns = [
  { title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: '昵称', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: '手机号', dataIndex: 'address', key: '1', width: 150 },
  { title: '性别', dataIndex: 'address', key: '2', width: 150 },
  { title: '工号', dataIndex: 'address', key: '3', width: 150 },
  { title: '所属部门', dataIndex: 'address', key: '4', width: 150 },
  { title: '所在门店', dataIndex: 'address', key: '5', width: 150 },
  { title: '员工职能', dataIndex: 'address', key: '6', width: 150 },
  { title: '在职状态', dataIndex: 'address', key: '7', width: 150 },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]

const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  })
}

export default {
  data() {
    return {
      data,
      columns
    }
  }
}
</script>
