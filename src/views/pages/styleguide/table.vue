<template>
  <div>
    <h4>st-table</h4>
    <p>
      使用与
      <a href="https://vue.ant.design/components/table-cn/">a-table</a> 相同的api，只是增加了默认无数据的占位图，以及默认应用的分页条数,分页器样式已包含
    </p>
    <st-table :dataSource="[]" :columns="columns"></st-table>
    <st-table
      :columns="columns"
      rowKey="id"
      @change="onTableChange"
      :pagination="{current:+query.p || 1}"
      :dataSource="tableData"
    >
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
      columns: [
        { title: 'id', dataIndex: 'id' },
        { title: '名称', dataIndex: 'name' },
        { title: '操作', width: 180, scopedSlots: { customRender: 'action' } }
      ]
    }
  },
  methods: {
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
