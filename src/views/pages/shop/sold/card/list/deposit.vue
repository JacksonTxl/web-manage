<template>
  <div :class="basic()">
    <st-search-panel>
      <div :class="basic('select')">
        <span style="width:90px;">储值卡状态：</span>
        <st-search-radio v-model="query.is_valid" :list="cardSaleStatusList"/>
      </div>
      <div :class="basic('select')">
        <span style="width:90px;">购买时间：</span>
        <st-range-picker :disabledDays="180" :value="selectTime"></st-range-picker>
        <!-- <a-date-picker
          :disabledDate="disabledStartDate"
          format="YYYY-MM-DD"
          v-model="start_time"
          placeholder="开始日期"
          :showToday="false"
          @openChange="handleStartOpenChange"
          @change="start_time_change"
        />
        &nbsp;~&nbsp;
        <a-date-picker
          :disabledDate="disabledEndDate"
          format="YYYY-MM-DD"
          v-model="end_time"
          placeholder="结束日期"
          :showToday="false"
          :open="endOpen"
          @openChange="handleEndOpenChange"
          @change="end_time_change"
        /> -->
      </div>
      <div slot="button">
        <st-button type="primary" @click="onSearchNative" :loading="loading.getList">查询</st-button>
        <st-button class="mgl-8" @click="onSearhReset">重置</st-button>
      </div>
    </st-search-panel>
    <div :class="basic('content')">
      <div :class="basic('content-batch')" class="mg-b16">
        <!-- NOTE: 导出 -->
        <!-- <st-button type="primary" class="mgr-8" v-if="auth.export">批量导出</st-button> -->
      </div>
      <div :class="basic('table')">
        <!--
          NOTE: 本期没有按钮不做
          :alertSelection="{onReset: onClear}"
          :rowSelection="{selectedRowKeys: selectedRowKeys,fixed:true, onChange: onSelectChange}"
         -->
        <st-table
          :page="page"
          rowKey="id"
          @change="onTableChange"
          :columns="columns"
          :dataSource="list"
          :scroll="{x:1800}"
        >
          <template slot="is_valid" slot-scope="text">{{text | enumFilter('sold.is_valid')}}</template>
          <template
            slot="end_time"
            slot-scope="text"
          >{{text}}</template>
          <template
            slot="buy_time"
            slot-scope="text"
          >{{text}}</template>
          <div slot="action" slot-scope="text,record">
            <st-table-actions>
              <a v-if="record.auth['shop:sold:sold_deposit_card|get']" @click="onDetail(record)">详情</a>
              <a v-if="record.auth['shop:sold:sold_deposit_card|export_contract']"  @click="toContract(record)">查看合同</a>
              <a v-if="record.auth['shop:sold:sold_deposit_card|transfer']" @click="onTransfer(record)">转让</a>
              <a v-if="record.auth['brand_shop:order:order|refund']" @click="onRefund(record)">退款</a>
            </st-table-actions>
          </div>
        </st-table>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { cloneDeep, filter } from 'lodash-es'
import { DepositService } from './deposit.service'
import { UserService } from '@/services/user.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './deposit.config'
import StRangePicker from '@/views/components/datetime-picker/range-picker'

export default {
  name: 'PageShopSoldCardDepositList',
  mixins: [tableMixin],
  bem: {
    basic: 'page-shop-sold'
  },
  serviceInject() {
    return {
      userService: UserService,
      routeService: RouteService,
      depositService: DepositService
    }
  },
  rxState() {
    return {
      list: this.depositService.list$,
      loading: this.depositService.loading$,
      page: this.depositService.page$,
      package_course: this.userService.packageCourseEnums$,
      sold: this.userService.soldEnums$,
      query: this.routeService.query$,
      auth: this.depositService.auth$
    }
  },
  computed: {
    columns,
    // 售卡状态
    cardSaleStatusList() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.sold.is_valid) return list
      Object.entries(this.sold.is_valid.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    }
  },
  data() {
    return {
      is_valid: 1,
      // 结束时间面板是否显示
      endOpen: false,
      selectedRowKeys: [],
      selectedRows: [],
      selectTime: {
        startTime: {
          showTime: false,
          disabledBegin: null,
          placeholder: '开始日期',
          disabled: false,
          value: null,
          format: 'YYYY-MM-DD',
          change: ($event) => { }
        },
        endTime: {
          showTime: false,
          placeholder: '结束日期',
          disabled: false,
          value: null,
          format: 'YYYY-MM-DD',
          change: ($event) => {}
        }
      }
    }
  },
  components: {
    StRangePicker
  },
  mounted() {
    this.setSearchData()
  },
  watch: {
    query(newVal) {
      this.setSearchData()
    }
  },
  methods: {
    // 跳转合同
    toContract(record) {
      let url = `${window.location.origin}/extra/contract-preview?id=${record.order_id}`
      window.open(url)
    },
    // 转让
    onTransfer(record) {
      this.$modalRouter.push({
        name: 'sold-card-transfer',
        props: {
          id: record.id,
          type: 'deposit'
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 退款
    onRefund(record) {
      this.$modalRouter.push({
        name: 'sold-card-refund',
        props: {
          type: 'deposit',
          id: record.id
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 详情
    onDetail(record) {
      this.$router.push({
        path: `/shop/sold/card/info/deposit/info/consumption-record`,
        query: { id: record.id }
      })
    },
    // 查询
    onSearchNative() {
      this.query.start_time = this.selectTime.startTime.value ? `${this.selectTime.startTime.value.format('YYYY-MM-DD')} 00:00:00` : ''
      this.query.end_time = this.selectTime.endTime.value ? `${this.selectTime.endTime.value.format('YYYY-MM-DD')} 00:00:00` : ''
      this.onSearch()
    },
    // 设置searchData
    setSearchData() {
      this.is_valid = this.query.is_valid
      this.selectTime.startTime.value = this.query.start_time
        ? cloneDeep(moment(this.query.start_time))
        : null
      this.selectTime.endTime.value = this.query.end_time
        ? cloneDeep(moment(this.query.end_time))
        : null
    },
    // moment
    moment,
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = cloneDeep(selectedRowKeys)
    },
    onClear() {
      this.selectedRowKeys = []
      this.selectedRows = []
    }
  }
}
</script>
