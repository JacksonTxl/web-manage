<template>
  <st-panel>
    <div slot="title">
      <st-input-search
        placeholder="可输入姓名、手机号、卡号"
        style="width: 300px;"
        @search="onSearch"
      />
    </div>
    <a-row :gutter="8">
      <a-col :lg="17">
        <st-button
          type="primary"
          @click="onExportList"
          :disabled="selectedRowKeys.length > 0 ? false : true"
        >
          批量导出
        </st-button>
      </a-col>
      <a-col :lg="7" style="text-align: right;">
        <a-select
          style="width: 160px; "
          class="mg-r8"
          :defaultValue="-1"
          placeholder="请选择门店"
          @change="onChooseDepartment"
        >
          <a-select-option :value="1">部门1</a-select-option>
          <a-select-option :value="3">部门2</a-select-option>
          <a-select-option :value="2">部门3</a-select-option>
          <a-select-option :value="-1">全部部门</a-select-option>
        </a-select>
        <a-select
          style="width: 160px"
          placeholder="请选择"
          @change="onChooseStores"
        >
          <a-select-option :value="1">门店1</a-select-option>
          <a-select-option :value="2">门店2</a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row :gutter="8" class="mg-t8">
      <st-table
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        :columns="columns"
        :dataSource="list"
        :scroll="{ x: 1500 }"
        :pagination="pagination"
        @change="pageChange"
      >
        <template slot="i" slot-scope="text, record">
          <a
            v-modal-link="{
              name: 'finance-sale-commission',
              props: { record: record }
            }"
          >
            {{ text }}
          </a>
        </template>
        <template slot="o" slot-scope="text, record">
          <a
            v-modal-link="{
              name: 'finance-class-commission',
              props: { record: record }
            }"
          >
            {{ text }}
          </a>
        </template>
      </st-table>
    </a-row>
  </st-panel>
</template>

<script>
import { columns } from './list.config.ts'
import FinanceClassCommission from '@/views/biz-modals/finance/class-commission'
import FinanceSaleCommission from '@/views/biz-modals/finance/sale-commission'
export default {
  modals: {
    FinanceClassCommission,
    FinanceSaleCommission
  },
  data() {
    return {
      columns,
      list: [
        {
          id: 1,
          q: '201901',
          w: '1号',
          e: '超人',
          r: '私教教练、销售',
          t: '部门1',
          y: '上海体验店',
          u: '11923',
          i: '12332',
          o: '12323',
          p: '1233'
        }
      ],
      selectedRowKeys: [],
      pagination: {}
    }
  },
  methods: {
    onSearch(e) {
      console.log('搜索', e)
    },
    onChooseDepartment(e) {
      console.log('选择部门', e)
    },
    onChooseStores(e) {
      console.log('选择门店', e)
    },
    onSelectChange(index, itemdata) {
      this.selectedRowKeys = index
    },
    pageChange(pagination, filters, sorter) {
      console.log('pagination', pagination)
      console.log('filters', filters)
      console.log('sorter', sorter)
    },
    onExportList() {}
  }
}
</script>
