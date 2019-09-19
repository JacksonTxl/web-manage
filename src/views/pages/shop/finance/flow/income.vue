<template>
  <st-panel :class="bPage()">
    <div slot="prepend">
      <st-search-panel :class="bSearch()">
        <div :class="bSearch('radio')" class="mg-t24 search-item">
          <span class="label">收银方式:</span>
          <st-search-radio
            class="value"
            v-model="query.pay_channel"
            :list="payType$"
          />
        </div>
        <div :class="bSearch('range-picker')" class="mg-t24 search-item">
          <div class="label">流水金额：</div>
          <st-input-number></st-input-number>
          至
          <st-input-number></st-input-number>
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
            查dd询
          </st-button>
          <st-button class="mg-l8" @click="onSearhReset">重置</st-button>
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
      <span slot="flow_type" slot-scope="text">{{ text.name }}</span>
      <div slot="action"></div>
    </st-table>
  </st-panel>
</template>
<script>
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { IncomeService } from './income.service'
import { columns } from './income.config.ts'
export default {
  name: 'FinanceFlowIncome',
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-flow-income',
    bSearch: 'search'
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
    onSearchNative() {
      const start_time = this.selectTime.start_time.format('YYYY-MM-DD')
      const end_time = this.selectTime.end_time.format('YYYY-MM-DD')
      this.$router.push({ query: { ...this.query, start_time, end_time } })
    },
    onSearhReset() {}
  }
}
</script>
