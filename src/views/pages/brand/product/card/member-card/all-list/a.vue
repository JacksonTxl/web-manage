<template>
  <div>
    <st-button type="primary">
      <a-icon type="plus"/>新增私教课程
    </st-button>
    <div style="display: inline-block;float: right;">
      <a-select defaultValue="所有类型" style="width: 184px;margin-left:24px" @change="handleChange">
        <a-select-option value="所有类型">所有类型</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="tom">Tom</a-select-option>
      </a-select>
      <a-select defaultValue="所有类型" style="width: 184px;margin-left:24px" @change="handleChange">
        <a-select-option value="所有类型">所有类型</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="tom">Tom</a-select-option>
      </a-select>
      <a-select defaultValue="所有类型" style="width: 184px;margin-left:24px" @change="handleChange">
        <a-select-option value="所有类型">所有类型</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="tom">Tom</a-select-option>
      </a-select>
    </div>
    <st-table :columns="columns" rowKey="id" @change="onTableChange" :dataSource="tableData">
      <div slot="action" slot-scope="record">
        <modal-link tag="a" :to="{name:'test'}">打开 {{record.name}}</modal-link>
        <a-divider type="vertical"></a-divider>
        <a-popconfirm title="确认删除该权限么?" @confirm="onDelete(record.id)">
          <a>删除</a>
        </a-popconfirm>
      </div>
    </st-table>
  </div>
</template>
<script>
const tableData = new Array(60).fill(1).map((item, i) => ({
  id: i,
  id1: i,
  id2: i,
  id3: i,
  id4: i,
  id5: i,
  name: i
}))
export default {
  data() {
    return {
      tableData,
      columns: [
        { title: '会员卡名称', dataIndex: 'id' },
        { title: '类型', dataIndex: 'id1', sorter: true },
        { title: '有效期/有效次数', dataIndex: 'id2' },
        { title: '支持入场门店', dataIndex: 'id3' },
        { title: '支持售卖门店', dataIndex: 'id4' },
        { title: '发布渠道', dataIndex: 'id5' },
        { title: '售卖状态', dataIndex: 'name' },
        { title: '操作', width: 180, scopedSlots: { customRender: 'action' } }
      ]
    }
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`)
    },
    onDelete(record) {
      console.log('delete ', record)
    },
    onTableChange(pagination) {
      this.$router.push({
        query: {
          p: pagination.current
        }
      })
      console.log('pagination', pagination)
    }
  }
}
</script>
