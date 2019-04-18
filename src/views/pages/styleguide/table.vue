<template>
  <div>
    <h4>st-table</h4>
    <p>
      使用与
      <a href="https://vue.ant.design/components/table-cn/">a-table</a> 相同的api，只是增加了默认无数据的占位图，以及默认应用的分页条数,分页器样式已包含
      添加了alertSelection属性 以支持 ·已选中几项· 清空的功能
    </p>
    <st-table :dataSource="[]" :columns="columns"></st-table>
    <st-table
      :columns="columns"
      :alertSelection="{onReset:onSelectionReset}"
      :rowSelection="{selectedRowKeys:selectedRowKeys,onChange:onSelectionChange}"
      rowKey="id"
      @change="onTableChange"
      :pagination="{current:+query.p || 1}"
      :dataSource="tableData"
    >
      <div slot="action" slot-scope="record">
        <modal-link tag="a" :to="{name:'test-sg'}">打开 {{record.name}}</modal-link>
        <a-divider type="vertical"></a-divider>
        <a-popconfirm title="确认删除该权限么?" @confirm="onDelete(record.id)">
          <a>删除</a>
        </a-popconfirm>
      </div>
    </st-table>

    <h3>st-form-table</h3>
    <p>纯样式table 适用于表单场景的表格和内联编辑的场景</p>
    <p>
      [hoverable] 添加鼠标hover样式
      [loading] 加载状态
    </p>
    <st-form-table hoverable>
      <thead>
        <tr>
          <th>标题1</th>
          <th>标题2</th>
          <th>标题3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
      </tbody>
    </st-form-table>
  </div>
</template>
<script>
import { RouteService } from '@/services/route.service'
const tableData = new Array(60).fill(1).map((item, i) => ({ id: i, name: i }))
export default {
  serviceInject() {
    return {
      route: RouteService
    }
  },
  subscriptions() {
    return {
      query: this.route.query$
    }
  },
  data() {
    return {
      tableData,
      selectedRowKeys: [],
      columns: [
        { title: 'id', dataIndex: 'id' },
        { title: '名称', dataIndex: 'name' },
        { title: '操作', width: 180, scopedSlots: { customRender: 'action' } }
      ]
    }
  },
  methods: {
    onSelectionReset() {
      this.selectedRowKeys = []
    },
    onSelectionChange(keys) {
      this.selectedRowKeys = keys
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
