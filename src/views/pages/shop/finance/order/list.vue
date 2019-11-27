<template>
  <st-panel app>
    <div slot="title">
      <st-input-search
        placeholder="请输入订单编号、会员姓名或手机号查找"
        v-model="$searchQuery.keyword"
        @search="onSingleSearch('keyword', $event, true)"
      />
    </div>
    <st-search-panel slot="prepend">
      <st-search-panel-item label="订单状态：">
        <st-search-radio v-model="$searchQuery.status" :options="orderStatus" />
      </st-search-panel-item>
      <st-search-panel-item label="支付状态：">
        <st-search-radio v-model="$searchQuery.type" :options="payStatus" />
      </st-search-panel-item>
      <st-search-panel-item label="创建时间：">
        <st-range-picker :disabledDays="180" v-model="date" />
      </st-search-panel-item>
      <div slot="button">
        <st-button type="primary" @click="onSearchNative">查询</st-button>
        <st-button class="mg-l8" @click="onSearchReset">重置</st-button>
      </div>
    </st-search-panel>

    <div>
      <div>
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
              业绩拆分
            </a>
          </st-table-actions>
        </div>
      </st-table>
    </div>
  </st-panel>
</template>

<script>
import { cloneDeep, filter } from 'lodash-es'
import { ListService } from './list.service'
import { columns } from './list.config'
import tableMixin from '@/mixins/table.mixin'
import ShopFinanceCancel from '@/views/biz-modals/shop/finance/cancel'
import ShopFinanceRefund from '@/views/biz-modals/shop/finance/refund'
import ShopFinanceSplit from '@/views/biz-modals/shop/finance/split'
import SoldDealGathering from '@/views/biz-modals/sold/deal/gathering'
import SoldLeaseTransfer from '@/views/biz-modals/sold/lease/transfer'
import { ORDER_PRODUCT_TYPE } from '@/constants/finance/order'
export default {
  name: 'PageShopFinanceOrder',
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
      listService: ListService
    }
  },
  rxState() {
    return {
      loading: this.listService.loading$,
      page: this.listService.page$,
      list: this.listService.list$,
      orderStatus: this.listService.orderStatus$,
      payStatus: this.listService.payStatus$,
      auth: this.listService.auth$
    }
  },
  computed: {
    columns
  },
  mounted() {
    this.setSearchData()
  },
  watch: {
    $searchQuery() {
      this.setSearchData()
    }
  },
  data() {
    return {
      ORDER_PRODUCT_TYPE,
      keyword: '',
      status: -1,
      type: -1,
      start_date: null,
      end_date: null,
      date: []
    }
  },
  methods: {
    // 设置searchData
    setSearchData() {
      const start = this.$searchQuery.start_date
        ? cloneDeep(moment(this.$searchQuery.start_date))
        : null
      const end = this.$searchQuery.end_date
        ? cloneDeep(moment(this.$searchQuery.end_date))
        : null
      this.date = [start, end]
    },
    // 查询
    onSearchNative() {
      this.$searchQuery.start_date = this.date[0]
        ? `${this.date[0].format('YYYY-MM-DD')}`
        : ''
      this.$searchQuery.end_date = this.date[1]
        ? `${this.date[1].format('YYYY-MM-DD')}`
        : ''
      this.onSearch()
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
            this.$router.reload()
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
            this.$router.reload()
          }
        }
      })
    },
    // 退款
    onRefund(record) {
      const props = { id: record.id }
      if (record.product_type === this.ORDER_PRODUCT_TYPE.EARNEST) {
        props.goodsInvalid = true
      }
      this.$modalRouter.push({
        name: 'shop-finance-refund',
        props,
        on: {
          success: result => {
            console.log('退款成功!')
            this.$router.reload()
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
            this.$router.reload()
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
