<template>
  <div :class="bPage()">
    <st-search-panel :class="bSearch()">
      <div :class="bSearch('radio')" class="mg-t24 search-item">
        <span class="label">收银方式:</span>
        <a-checkbox @change="onCheckAllChange" :checked="checkAll">
          全部
        </a-checkbox>
        <a-checkbox-group
          @change="onChangePayType"
          v-model="checkedList"
          :options="payType$"
        />
      </div>
      <div :class="bSearch('amount')" class="mg-t24 search-item">
        <div class="label">流水金额：</div>
        <st-input-number
          class="amount__input mg-r8"
          :min="1"
          :max="99999"
          :step="1"
          :precision="0"
          float
          v-model="query.start_amount"
        ></st-input-number>
        至
        <st-input-number
          :min="1"
          :max="99999"
          :precision="0"
          float
          class="amount__input mg-l8"
          v-model="query.end_amount"
        ></st-input-number>
      </div>
      <div :class="bSearch('range-picker')" class="mg-t24 search-item">
        <span class="label">预约时间：</span>
        <st-range-picker
          :disabledDays="180"
          :value="selectTime"
          class="value"
        ></st-range-picker>
      </div>

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
      <span slot="flow_type" slot-scope="text">{{ text.name }}</span>
      <st-overflow-text
        title="备注"
        maxWidth="200px"
        slot="remark"
        slot-scope="text"
      >
        {{ text }}
      </st-overflow-text>
      <div slot="action" slot-scope="text, record">
        <st-table-actions>
          <a @click="onClickFlowChargeAgainst(record)">流水冲销</a>
        </st-table-actions>
      </div>
    </st-table>
  </div>
</template>
<script>
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { IncomeService } from './income.service'
import { columns } from './income.config.ts'
import ShopFinanceFlow from '@/views/biz-modals/shop/finance/flow'
import { cloneDeep } from 'lodash-es'
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
      routeService: RouteService,
      service: IncomeService
    }
  },
  rxState() {
    const { loading$, page$, list$, payType$ } = this.service
    return {
      query: this.routeService.query$,
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
      selectTime: {
        startTime: {
          showTime: false,
          disabledBegin: null,
          placeholder: '开始日期',
          disabled: false,
          value: null,
          format: 'YYYY-MM-DD',
          change: $event => {}
        },
        endTime: {
          showTime: false,
          placeholder: '结束日期',
          disabled: false,
          value: null,
          format: 'YYYY-MM-DD',
          change: $event => {}
        }
      }
    }
  },
  computed: {
    columns
  },
  methods: {
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
      const start_date = this.selectTime.startTime.value
        ? `${this.selectTime.startTime.value.format('YYYY-MM-DD')} 00:00`
        : ''
      const end_date = this.selectTime.endTime.value
        ? `${this.selectTime.endTime.value.format('YYYY-MM-DD')} 23:59`
        : ''
      this.query.pay_channel = this.checkedList
      this.$router.push({ query: { ...this.query, start_time, end_time } })
    },
    onReset() {
      this.checkedList = []
      this.selectTime.startTime.value = null
      this.selectTime.endTime.value = null
      this.onSearhReset()
    }
  }
}
</script>
