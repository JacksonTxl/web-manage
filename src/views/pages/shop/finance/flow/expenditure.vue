<template>
  <st-panel :class="bPage()">
    <div slot="prepend">
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
        <div :class="bSearch('range-picker')" class="mg-t24 search-item">
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
          <span class="label">创建时间：</span>
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
    </div>
    <st-table
      :columns="columns"
      :scroll="{ x: 1400 }"
      :rowKey="record => record.flow_id"
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
      >
        {{ text }}
      </st-overflow-text>
    </st-table>
  </st-panel>
</template>
<script>
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { ExpenditureService } from './expenditure.service'
import { columns } from './expenditure.config.ts'
export default {
  name: 'FinanceFlowExpenditure',
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-flow-expenditure',
    bSearch: 'search'
  },
  serviceInject() {
    return {
      routeService: RouteService,
      service: ExpenditureService
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
    onSearchNative() {
      const start_date = this.selectTime.startTime.value
        ? `${this.selectTime.startTime.value.format('YYYY-MM-DD')}`
        : ''
      const end_date = this.selectTime.endTime.value
        ? `${this.selectTime.endTime.value.format('YYYY-MM-DD')}`
        : ''
      this.query.pay_channel = this.checkedList
      this.$router.push({ query: { ...this.query, start_date, end_date } })
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
