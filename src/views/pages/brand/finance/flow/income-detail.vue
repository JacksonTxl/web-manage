<template>
  <div :class="b()">
    <st-search-panel :class="bSearch()">
      <st-search-panel-item label="查询门店：">
        <shop-select v-model="$searchQuery.shop_id" class="mg-r12" />
      </st-search-panel-item>
      <st-search-panel-item label="收银方式：">
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
        <st-range-picker :disabledDays="90" v-model="date" class="value" />
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
      :rowKey="record => record.flow_id"
      :page="page$"
      @change="onTableChange"
      :dataSource="list$"
    >
      <span
        slot="price"
        :class="{ 'color-danger': +text < 0 }"
        slot-scope="text"
      >
        {{ text }}
      </span>
      <span slot="flow_type" slot-scope="text">{{ text.name }}</span>
      <st-overflow-text
        title="备注"
        maxWidth="200px"
        slot="remark"
        slot-scope="text"
        :value="text"
      />

      <div slot="action" slot-scope="text, record">
        <st-table-actions>
          <a
            v-if="record.auth['shop:flow:income|reverse']"
            @click="onClickFlowChargeAgainst(record)"
          >
            流水冲销
          </a>
        </st-table-actions>
      </div>
    </st-table>
  </div>
</template>
<script>
import tableMixin from '@/mixins/table.mixin'
import { IncomeDetailService } from './income-detail.service'
import { columns } from './income-detail.config'
import ShopFinanceFlow from '@/views/biz-modals/shop/finance/flow'
import ShopSelect from '@/views/biz-components/shop-select'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'FinanceFlowIncome',
  mixins: [tableMixin],
  bem: {
    b: 'page-brand-flow-income',
    bSearch: 'search'
  },
  modals: {
    ShopFinanceFlow
  },
  serviceInject() {
    return {
      service: IncomeDetailService
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
      checkedList: this.payType$.map(item => item.value),
      indeterminate: false,
      checkAll: true,
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
      if (this.$searchQuery.start_date) {
        const start = moment(this.$searchQuery.start_date)
        const end = moment(this.$searchQuery.end_date)
        this.date = [start, end]
      }
      if (this.$searchQuery.pay_channel) {
        this.$searchQuery.pay_channel = [...this.$searchQuery.pay_channel]
        this.checkedList = this.$searchQuery.pay_channel.map(item => +item)
        this.checkAll = false
        if (this.$searchQuery.pay_channel.length === this.payType$.length) {
          this.checkAll = true
        }
      }
    },
    onChangePayType(checkedList) {
      this.indeterminate =
        checkedList.length && checkedList.length < this.payType$.length
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
      this.checkAll = false
      this.date = [null, null]
      this.onSearchReset()
    }
  }
}
</script>
