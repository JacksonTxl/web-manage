<template>
  <div :class="bPage()">
    <st-search-panel :class="bSearch()">
      <st-search-panel-item label="查询门店：">
        <shop-select v-model="$searchQuery.shop_id" class="mg-r12" />
      </st-search-panel-item>
      <st-search-panel-item label="查询日期：">
        <st-range-picker :disabledDays="180" v-model="date" class="value" />
      </st-search-panel-item>

      <div slot="button">
        <st-button
          type="primary"
          @click="onSearchNative"
          :loading="loading$.getList"
        >
          查询
        </st-button>
        <st-button class="mg-l8" @click="onReset">重置</st-button>
      </div>
    </st-search-panel>
    <st-table
      :columns="columns"
      :scroll="{ x: 1400 }"
      rowKey="id"
      :page="page$"
      @change="onTableChange"
      :dataSource="list$"
    >
      <span slot="internal_amount">
        内部结转
        <st-help-tooltip id="TBFIS001" />
      </span>
    </st-table>
  </div>
</template>
<script>
import tableMixin from '@/mixins/table.mixin'
import { IncomeService } from './income.service'
import { columns } from './income.config.ts'
import ShopFinanceFlow from '@/views/biz-modals/shop/finance/flow'
import { cloneDeep } from 'lodash-es'
import ShopSelect from '@/views/biz-components/shop-select'
export default {
  name: 'FinanceFlowIncome',
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-flow-income',
    bSearch: 'search'
  },
  modals: {
    ShopFinanceFlow
  },
  serviceInject() {
    return {
      service: IncomeService
    }
  },
  rxState() {
    const { loading$, page$, list$, payType$ } = this.service
    return {
      loading$,
      page$,
      list$
    }
  },
  data() {
    return {
      checkedList: [],
      indeterminate: false,
      date: []
    }
  },
  computed: {
    columns
  },
  mounted() {
    this.setSearchDate()
  },
  components: {
    ShopSelect
  },
  methods: {
    setSearchDate() {
      if (!this.$searchQuery.start_date) return
      const start = moment(this.$searchQuery.start_date)
      const end = moment(this.$searchQuery.end_date)
      this.date = [start, end]
    },
    onChangePayType(checkedList) {
      this.indeterminate =
        !!checkedList.length && checkedList.length < this.payType$.length
      this.checkAll = checkedList.length === this.payType$.length
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked
          ? this.payType$.map(item => item.value)
          : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
    },
    onClickFlowChargeAgainst(record) {
      console.log(record)
      this.$modalRouter.push({
        name: 'shop-finance-flow',
        props: {
          id: record.flow_id,
          order_id: record.order_id
        },
        on: {
          success: result => {
            this.$router.reload()
          }
        }
      })
    },
    onSearchNative() {
      const start_date = this.date[0]
        ? `${this.date[0].format('YYYY-MM-DD')}`
        : ''
      const end_date = this.date[1]
        ? `${this.date[1].format('YYYY-MM-DD')}`
        : ''
      this.$searchQuery.pay_channel = this.checkedList
      this.$searchQuery.current_page = 1
      this.$router.push({
        query: { ...this.$searchQuery, start_date, end_date }
      })
    },
    onReset() {
      this.checkedList = []
      this.date = [null, null]
      this.onSearchReset()
    }
  }
}
</script>
