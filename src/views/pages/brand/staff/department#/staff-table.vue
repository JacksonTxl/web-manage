<template>
  <st-table :columns="columns" :dataSource="data" :scroll="{ x: 1500}">
    <div slot="action"  href="javascript:;">
        <a-dropdown class="tree-opreation" placement="bottomLeft">
          <a-button>:</a-button>
          <a-menu slot="overlay">
            <a-menu-item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">编辑</a>
            </a-menu-item>
            <a-menu-item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">新增字部门</a>
            </a-menu-item>
            <a-menu-item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
    </div>
    <span slot="name" >
      <span class="avt">fdsaf</span><span class="name">xinm</span>
    </span>
  </st-table>
</template>
<script>
const columns = [
  { title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left', scopedSlots: { customRender: 'name' } },
  { title: '昵称', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: '手机号', dataIndex: 'address', key: '1', width: 150 },
  { title: '工号', dataIndex: 'address', key: '2', width: 150 },
  { title: '所在门店', dataIndex: 'address', key: '3', width: 150 },
  { title: '所属部门', dataIndex: 'address', key: '4', width: 150 },
  { title: '身份', dataIndex: 'address', key: '5', width: 150 },
  { title: '状态', dataIndex: 'address', key: '6', width: 150 },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
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
