<template>
  <st-modal title="分配销售" onOk="save" v-model="show" size="small">
    <a-row :gutter="8">
      <a-col :lg="24" style="padding: 0;">
        <a-input-search
          size="large"
          placeholder="搜索会籍销售姓名，手机号，昵称"
          style="width: 100%;"
          @search="onSearch"
        />
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="24" class="distribution-container" style="padding-left:12px;padding-right:12px;">
          <st-table
            :rowSelection="{ fixed: true, columnTitle:'分配',type: 'radio',selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            :columns="columns"
            :dataSource="list"
            @change="handleTableChange"
            :pagination="pagination"
            />
      </a-col>
    </a-row>
  </st-modal>
</template>
<script>
import { DistributionAlesService } from './distribution-ales.service'
const columns = [
  {
    title: '会籍销售姓名',
    dataIndex: 'sale_name',
    key: 'sale_name'
  },
  {
    title: '签单率（近30天）',
    dataIndex: 'sign_bill',
    key: 'sign_bill'
  }
]
export default {
  name: 'distributionAles',
  serviceInject() {
    return {
      service: DistributionAlesService
    }
  },
  props: {
    selectedRowData: {
      type: Array
    }
  },
  data() {
    return {
      selectedRowKeys: [],
      pagination: {
        current: 1,
        pageSize: 10
      },
      columns,
      show: false,
      list: [
        {
          id: 1,
          sale_name: '销售1',
          sign_bill: 20
        },
        {
          id: 2,
          sale_name: '销售2',
          sign_bill: 30
        },
        {
          id: 3,
          sale_name: '销售3',
          sign_bill: 60
        },
        {
          id: 4,
          sale_name: '销售4',
          sign_bill: 10
        }
      ]
    }
  },
  mounted() {
    this.service.getSaleList().subscribe(res => {
      console.log(res)
    })
    console.log('11111111', this.selectedRowData)
  },
  methods: {
    onChange(e) {
      console.log(e.target)
    },
    onSelectChange(e) {
      console.log('选中的', e)
      this.selectedRowKeys = e
      console.log(this.selectedRowKeys)
    },
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination)
    },
    onSearch(e) {
      console.log(e)
    },
    save() {
      // this.service.addSale().subscribe(res => {
      //   console.log(res)
      // })
    }
  },
  watch: {}
}
</script>
