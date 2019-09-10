<template>
  <section class="sg-section">
    <h3>st-table</h3>
    <dl>
      使用与
      <a href="https://vue.ant.design/components/table-cn/">a-table</a>
      相同的api，只是增加了默认无数据的占位图，以及默认应用的分页条数,分页器样式已包含
      添加了alertSelection属性 以支持 ·已选中几项· 清空的功能
      <dt>
        后端分页
      </dt>
      <dd>
        新增[page]属性 参数为后端的page对象 直接使用即可
      </dd>
    </dl>
    <st-table :dataSource="[]" :columns="columns"></st-table>
    <st-table
      class="mg-t24"
      :columns="columns"
      :alertSelection="{ onReset: onSelectionReset }"
      :rowSelection="{ selectedRowKeys, onChange: onSelectionChange }"
      rowKey="id"
      @change="onTableChange"
      :page="page"
      :dataSource="tableData"
    >
      <template slot="tooltips">
        ID
        <a-icon type="smile-o" />
      </template>
      <div slot="action">
        <st-table-actions>
          <a v-modal-link="{ name: 'test-sg' }">详情</a>
          <a>上架</a>
          <a>删除</a>
        </st-table-actions>
      </div>
    </st-table>

    <dl>
      <dt>
        前端分页
      </dt>
      <dd>
        前端分页时不需要传pagination或page，声明page-mode="client"即可，不过表格的dataSource需要传入全量的
      </dd>
      <st-table
        :dataSource="tableData"
        :columns="columns"
        page-mode="client"
      ></st-table>
    </dl>
  </section>
</template>
<script>
import tableMixin from '@/mixins/table.mixin'
import { RouteService } from '@/services/route.service'
const tableData = new Array(60).fill(1).map((item, i) => ({ id: i, name: i }))
export default {
  mixins: [tableMixin],
  serviceInject() {
    return {
      route: RouteService
    }
  },
  rxState() {
    return {
      query: this.route.query$
    }
  },
  data() {
    return {
      tableData,
      page: {
        current_page: 1,
        total_counts: 10
      },
      columns: [
        {
          dataIndex: 'id',
          slots: { title: 'tooltips' },
          scopedSlots: { customRender: 'id' }
        },
        { title: '名称', dataIndex: 'name' },
        {
          title: '操作',
          width: 180,
          fixed: 'right',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    onDelete(record) {
      console.log('delete ', record)
    }
  }
}
</script>
