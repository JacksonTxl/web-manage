<template>
  <st-panel app initial :class="basic()">
    <div slot="title">
      <st-input-search
        placeholder="请输入会员姓名或手机号查找"
        v-model="query.keyword"
        @search="onSingleSearch('keyword', $event, true)"
        style="width: 290px;"
      />
    </div>
    <st-search-panel>
      <div :class="basic('select')">
        <span style="width:90px;">订单状态：</span>
        <st-search-radio v-model="query.status" :list="orderStatusList" />
      </div>
      <div :class="basic('select')">
        <span style="width:90px;">支付状态：</span>
        <st-search-radio v-model="query.type" :list="payStatusList" />
      </div>
      <div :class="basic('select')">
        <span style="width:90px;">创建时间：</span>
        <a-date-picker
          format="YYYY-MM-DD"
          placeholder="开始日期"
          :showToday="false"
          v-model="start_date"
          @change="startdatePickerChange"
        />
        &nbsp;~&nbsp;
        <a-date-picker
          format="YYYY-MM-DD"
          placeholder="结束日期"
          :showToday="false"
          v-model="end_date"
          @change="enddatePickerChange"
        />
      </div>
      <div slot="button">
        <st-button type="primary" @click="onSearch">查询</st-button>
        <st-button class="mgl-8" @click="onSearhReset">重置</st-button>
      </div>
    </st-search-panel>

    <div :class="basic('content')">
      <div :class="basic('content-batch')" class="mg-b16">
        <!-- NOTE: 导出 -->
        <!-- <st-button type="primary" v-if="auth.export" :disabled="isSelectedDisabled">批量导出</st-button> -->
      </div>
      <st-table
        :scroll="{ x: 1840 }"
        rowKey="id"
        :columns="columns"
        :page="page"
        @change="onTableChange"
        :dataSource="list"
        :loading="loading.getList"
      >
        <template slot="order_status" slot-scope="text">
          {{ text | enumFilter('finance.order_status') }}
        </template>
        <template slot="pay_status" slot-scope="text">
          {{ text | enumFilter('finance.pay_status') }}
        </template>
        <div slot="action" slot-scope="text, record">
          <st-table-actions>
            <a
              v-if="record.auth['brand_shop:order:order|pay']"
              @click="onGathering(record)"
            >
              收款
            </a>
            <a
              v-if="record.auth['brand_shop:order:order|cancel']"
              @click="onCancel(record)"
            >
              取消
            </a>
            <a
              v-if="record.auth['brand_shop:order:order|get']"
              @click="onOrderInfo(record)"
            >
              详情
            </a>
            <a
              v-if="record.auth['brand_shop:order:order|refund']"
              @click="onRefund(record)"
            >
              退款
            </a>
            <a
              v-if="record.auth['brand_shop:order:order|split']"
              @click="onSplit(record)"
            >
              业务拆分
            </a>
          </st-table-actions>
        </div>
      </st-table>
    </div>
  </st-panel>
</template>

<script>
import moment from 'moment'
import { cloneDeep, filter } from 'lodash-es'
import { UserService } from '@/services/user.service'
import { ListService } from './list.service'
import { RouteService } from '@/services/route.service'
import { columns } from './list.config'
import tableMixin from '@/mixins/table.mixin'
import ShopFinanceCancel from '@/views/biz-modals/shop/finance/cancel'
import ShopFinanceRefund from '@/views/biz-modals/shop/finance/refund'
import ShopFinanceSplit from '@/views/biz-modals/shop/finance/split'
import SoldDealGathering from '@/views/biz-modals/sold/deal/gathering'
import SoldLeaseTransfer from '@/views/biz-modals/sold/lease/transfer'
export default {
  name: 'PageShopFinanceOrder',
  bem: {
    basic: 'page-shop-finance'
  },
  mixins: [tableMixin],
  modals: {
    ShopFinanceCancel,
    ShopFinanceRefund,
    ShopFinanceSplit,
    SoldDealGathering,
    SoldLeaseTransfer
  },
  serviceInject() {
    return {
      userService: UserService,
      listService: ListService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      finance: this.userService.finance$,
      loading: this.listService.loading$,
      page: this.listService.page$,
      query: this.routeService.query$,
      list: this.listService.list$,
      auth: this.listService.auth$
    }
  },
  computed: {
    columns,
    orderStatusList() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.finance.order_status) return list
      Object.entries(this.finance.order_status.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    },
    payStatusList() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.finance.pay_status) return list
      Object.entries(this.finance.pay_status.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    }
  },
  data() {
    return {
      keyword: '',
      status: -1,
      type: -1,
      start_date: null,
      end_date: null
    }
  },
  methods: {
    startdatePickerChange(date, dateString) {
      this.query.start_date = dateString
    },
    enddatePickerChange(date, dateString) {
      this.query.end_date = dateString
    },
    // 收款
    onGathering(record) {
      this.$modalRouter.push({
        name: 'sold-deal-gathering',
        props: {
          order_id: record.id,
          type: this.productType(record.product_type)
        },
        on: {
          success: () => {
            this.onSearch()
            // this.$modalRouter.push({
            //   name: 'sold-deal-gathering-tip',
            //   props: {
            //     order_id: record.id,
            //     type: this.productType(record.product_type),
            //     message: '收款成功'
            //   },
            //   on: {
            //     success: () => {
            //       console.log('success')
            //     }
            //   }
            // })
          }
        }
      })
    },
    // 取消
    onCancel(record) {
      this.$modalRouter.push({
        name: 'shop-finance-cancel',
        props: {
          id: record.id
        },
        on: {
          success: result => {
            console.log('取消订单!')
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 转让
    onTransfer(record) {
      this.$modalRouter.push({
        name: 'sold-lease-transfer',
        props: {
          id: record.id
        },
        on: {
          success: result => {
            console.log('转让成功!')
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 退款
    onRefund(record) {
      this.$modalRouter.push({
        name: 'shop-finance-refund',
        props: {
          id: record.id
        },
        on: {
          success: result => {
            console.log('退款成功!')
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 业务拆分
    onSplit(record) {
      this.$modalRouter.push({
        name: 'shop-finance-split',
        props: {
          id: record.id
        },
        on: {
          success: result => {
            console.log('业绩拆分成功!')
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 订单详情
    onOrderInfo(record) {
      this.$router.push({
        path: '/shop/finance/order/info/collection-details',
        query: { id: record.id }
      })
    },
    productType(type) {
      let name = ''
      // 1-会员卡 2-私教课 3-团体课 4-课程包 5-储值卡 6-小班课 7-手续费 8-定金 9-押金 10-储物柜
      switch (type) {
        case 1:
          name = 'member'
          break
        case 2:
          name = 'personal'
          break
        case 3:
          name = 'team'
          break
        case 4:
          name = 'package'
          break
        case 5:
          name = 'deposit'
          break
        case 6:
          name = 'member'
          break
        case 7:
          name = 'advance'
          break
        case 8:
          name = 'advance'
          break
        case 9:
          name = 'member'
          break
        case 10:
          name = 'cabinet_order'
          break
      }
      return name
    }
  }
}
</script>
