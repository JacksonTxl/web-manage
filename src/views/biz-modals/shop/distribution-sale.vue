<template>
  <st-modal title="分配销售" @ok="save" v-model="show" size="small">
    <a-row :gutter="8">
      <a-col :lg="24" style="padding: 0;">
        <a-input-search
          size="large"
          placeholder="搜索会籍销售昵称"
          style="width: 100%;"
          @search="onSearch"
        />
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col
        :lg="24"
        class="distribution-container"
        style="padding-left:12px;padding-right:12px;"
      >
        <st-table
          :rowSelection="{
            fixed: true,
            columnTitle: '分配',
            type: 'radio',
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange
          }"
          :columns="columns"
          :dataSource="list"
          rowKey="id"
          @change="handleTableChange"
          :pagination="false"
        >
          <template slot="custom_title">
            签单率（近30天）
            <st-help-tooltip id="TSYHFP001" />
          </template>
        </st-table>
      </a-col>
    </a-row>
  </st-modal>
</template>
<script>
import { DistributionSaleService } from './distribution-sale.service'
import { MessageService } from '@/services/message.service'
const columns = [
  {
    title: '会籍销售姓名',
    dataIndex: 'sale_name',
    key: 'sale_name'
  },
  {
    dataIndex: 'sign_bill',
    key: 'sign_bill',
    slots: { title: 'custom_title' },
    scopedSlots: { customRender: 'sign_bill' }
  }
]
export default {
  name: 'distributionAles',
  serviceInject() {
    return {
      service: DistributionSaleService,
      messageService: MessageService
    }
  },
  props: {
    memberIds: {
      type: Array,
      default() {
        return []
      }
    },
    saleId: Number
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
      list: [], // 列表数据
      chooseId: ''
    }
  },
  mounted() {
    this.service.getSaleList().subscribe(res => {
      this.list = res.list
      this.selectedRowKeys = [this.saleId]
    })
  },
  methods: {
    onChange(e) {
      console.log(e.target)
    },
    onSelectChange(e, itemData) {
      this.selectedRowKeys = e
      this.chooseId = itemData[0].id
    },
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination)
    },
    onSearch(e) {
      this.service
        .getSaleList({
          retrieve: e
        })
        .subscribe(res => {
          this.list = res.list
        })
    },
    save() {
      console.log('sale', this.chooseId)
      this.service
        .addSale({
          member_ids: this.memberIds,
          sales_id: this.chooseId
        })
        .subscribe(res => {
          this.show = false
          this.$emit('success')
          this.messageService.success({ content: '分配成功' })
        })
    }
  },
  watch: {}
}
</script>
