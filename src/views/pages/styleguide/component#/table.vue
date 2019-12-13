<template>
  <div>
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
    <dl>
      <dt>
        父子表格
      </dt>
      <dd>
        props新增一个字段 优化展开收起图表，当没有chilren字段的时候图表不显示
      </dd>
      <st-table
        :columns="childrenColumns"
        :dataSource="dataSourceChildren"
        isExpand
      ></st-table>
    </dl>
  </div>
</template>
<script>
import tableMixin from '@/mixins/table.mixin'
const tableData = new Array(60).fill(1).map((item, i) => ({ id: i, name: i }))
const childrenColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '12%'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '30%',
    key: 'address'
  }
]

const dataSourceChildren = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park'
      }
    ]
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'Johnss Brown',
        age: 42,
        address: 'New York No. 2 Lake Park'
      }
    ]
  }
]

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    )
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  }
}
export default {
  mixins: [tableMixin],
  serviceInject() {
    return {}
  },
  rxState() {
    return {}
  },
  data() {
    return {
      dataSourceChildren,
      childrenColumns,
      rowSelection,
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
