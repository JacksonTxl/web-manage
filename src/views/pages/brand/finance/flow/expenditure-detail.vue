<template>
  <st-panel :class="bPage()">
    <div slot="prepend">
      <st-search-panel :class="bSearch()">
        <st-search-panel-item label="查询门店：">
          <shop-select v-model="$searchQuery.shop_id" class="mg-r12" />
        </st-search-panel-item>
        <st-search-panel-item label="支付方式：">
          <a-checkbox @change="onCheckAllChange" :checked="checkAll">
            全部
          </a-checkbox>
          <a-checkbox-group
            @change="onChangePayType"
            v-model="checkedList"
            :options="payType$"
          />
        </st-search-panel-item>
        <st-search-panel-item label="流水金额：">
          <st-input-number
            class="amount__input"
            :min="0"
            :max="99999"
            :step="1"
            :precision="0"
            float
            v-model="$searchQuery.start_amount"
            placeholder="请输入金额范围"
          ></st-input-number>
          至
          <st-input-number
            :min="0"
            :max="99999"
            :precision="0"
            float
            class="amount__input"
            v-model="$searchQuery.end_amount"
            placeholder="请输入金额范围"
          ></st-input-number>
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
    </div>
    <st-table
      :columns="columns"
      :scroll="{ x: 1400 }"
      rowKey="id"
      :page="page$"
      @change="onTableChange"
      :dataSource="list$"
    >
      <span slot="price" :class="{ price__red: +text < 0 }" slot-scope="text">
        {{ text }}
      </span>
      <span slot="flow_type" slot-scope="text">{{ text.name }}</span>
      <st-overflow-text
        title="备注"
        maxWidth="200px"
        slot="remark"
        slot-scope="text"
        :vlaue="text"
      />
    </st-table>
  </st-panel>
</template>
<script>
import tableMixin from '@/mixins/table.mixin'
import { ExpenditureDetailService } from './expenditure-detail.service'
import { columns } from './expenditure-detail.config.ts'
import ShopSelect from '@/views/biz-components/shop-select'
export default {
  name: 'FinanceFlowExpenditure',
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-flow-expenditure',
    bSearch: 'search'
  },
  serviceInject() {
    return {
      service: ExpenditureDetailService
    }
  },
  rxState() {
    const { loading$, page$, list$, payType$ } = this.service
    return {
      loading$,
      page$,
      list$,
      payType$
    }
  },
  data() {
    return {
      checkedList: [],
      indeterminate: false,
      checkAll: false,
      date: []
    }
  },
  computed: {
    columns
  },
  mounted() {
    this.setSearchData()
  },
  components: {
    ShopSelect
  },
  methods: {
    setSearchData() {
      if (!this.$searchQuery.start_date) return
      const start = moment(this.$searchQuery.start_date)
      const end = moment(this.$searchQuery.end_date)
      this.date = [start, end]
      if (!this.$searchQuery.pay_channel) {
        return
      }
      this.checkedList = this.$searchQuery.pay_channel.map(item => +item)
      if (this.$searchQuery.pay_channel.length === this.payType$.length) {
        this.checkAll = true
      }
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
      this.checkAll = false
      this.date = [null, null]
      this.onSearchReset()
    }
  }
}
</script>
