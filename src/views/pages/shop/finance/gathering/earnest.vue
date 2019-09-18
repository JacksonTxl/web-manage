<template>
  <div :class="b()">
    <st-search-panel>
      <div :class="b('select')">
        <span :class="b('select-text')">定金状态：</span>
        <st-search-radio v-model="query.use_status" :list="useStatus" />
      </div>
      <div :class="b('select')">
        <span :class="b('select-text')">查询日期：</span>
        <st-range-picker
          :disabledDays="180"
          :value="selectTime"
        ></st-range-picker>
      </div>
      <div slot="button">
        <st-button
          type="primary"
          @click="onSearchNative"
          :loading="loading.getList"
        >
          查询
        </st-button>
        <st-button class="mg-l8" @click="onSearhReset">重置</st-button>
      </div>
    </st-search-panel>
    <div :class="b('content')">
      <div :class="b('content-batch')" class="mg-b16">
        <!-- NOTE: 导出 -->
        <!-- <st-button type="primary" class="mg-r8" v-if="auth.export">批量导出</st-button> -->
        <st-button
          type="primary"
          class="mg-r8"
          v-if="auth.add"
          @click="addEarnest"
        >
          添加定金
        </st-button>
      </div>
      <!-- :alertSelection="{ onReset: onClear }"
          :rowSelection="{
            selectedRowKeys: selectedRowKeys,
            fixed: true,
            onChange: onSelectChange,
            getCheckboxProps: record => ({
              props: {
                disabled: disabledSelect(record)
              }
            })
          }" -->
      <div :class="b('table')">
        <st-table
          :page="page"
          rowKey="id"
          @change="onTableChange"
          :columns="columns"
          :dataSource="list"
          :scroll="{ x: 1800 }"
        >
          <template slot="use_status" slot-scope="text">
            {{ text | enumFilter('finance.use_status') }}
          </template>
          <div slot="action" slot-scope="text, record">
            <st-table-actions>
              <a
                v-if="
                  record.auth['shop:temporary_payment:bargin|export_contract']
                "
                @click="toContract(record)"
              >
                查看合同
              </a>
              <a
                v-if="record.auth['shop:temporary_payment:bargin|order']"
                @click="onDeal(record)"
              >
                定金签单
              </a>
              <a
                v-if="record.auth['brand_shop:order:order|refund']"
                @click="onRefund(record)"
              >
                退款
              </a>
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
import { EarnestService } from './earnest.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './earnest.config'
import ShopFinanceGatheringEarnestAdd from '@/views/biz-modals/shop/finance/gathering/earnest/add'
import SoldDealGatheringTip from '@/views/biz-modals/sold/deal/gathering-tip'
import ShopFinanceRefund from '@/views/biz-modals/shop/finance/refund'
import ShopFinanceGatheringEarnestDeal from '@/views/biz-modals/shop/finance/gathering/earnest/deal'
export default {
  name: 'PageShopFinanceGatheringEarnest',
  mixins: [tableMixin],
  bem: {
    b: 'page-shop-sold'
  },
  modals: {
    ShopFinanceGatheringEarnestAdd,
    ShopFinanceGatheringEarnestDeal,
    SoldDealGatheringTip,
    ShopFinanceRefund
  },
  serviceProviders() {
    return [EarnestService]
  },
  serviceInject() {
    return {
      routeService: RouteService,
      earnestService: EarnestService
    }
  },
  rxState() {
    return {
      loading: this.earnestService.loading$,
      list: this.earnestService.list$,
      page: this.earnestService.page$,
      useStatus: this.earnestService.useStatus$,
      query: this.routeService.query$,
      auth: this.earnestService.auth$
    }
  },
  computed: {
    columns
  },
  data() {
    return {
      // 结束时间面板是否显示
      endOpen: false,
      selectedRowKeys: [],
      selectedRows: [],
      diffSelectedRows: [],
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
  mounted() {
    this.setSearchData()
  },
  watch: {
    query(newVal) {
      this.setSearchData()
    }
  },
  methods: {
    // 查询
    onSearchNative() {
      this.query.start_time = this.selectTime.startTime.value
        ? `${this.selectTime.startTime.value.format('YYYY-MM-DD')} 00:00:00`
        : ''
      this.query.end_time = this.selectTime.endTime.value
        ? `${this.selectTime.endTime.value.format('YYYY-MM-DD')} 23:59:59`
        : ''
      this.onSearch()
    },
    // 设置searchData
    setSearchData() {
      this.selectTime.startTime.value = this.query.start_time
        ? cloneDeep(moment(this.query.start_time))
        : null
      this.selectTime.endTime.value = this.query.end_time
        ? cloneDeep(moment(this.query.end_time))
        : null
    },
    // moment
    moment,
    // 退款
    onRefund(record) {
      this.$modalRouter.push({
        name: 'shop-finance-refund',
        props: {
          id: record.order_id
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    // 跳转合同
    toContract(record) {
      let url = `${window.location.origin}/extra/contract-preview?id=${
        record.order_id
      }`
      window.open(url)
    },
    // 退款
    onDeal(record) {
      this.$modalRouter.push({
        name: 'shop-finance-gathering-earnest-deal',
        props: {
          id: record.order_id
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    // 订单收款modal
    createdOrderPay(props) {
      return new Promise((resolve, reject) => {
        this.$modalRouter.push({
          name: 'sold-deal-gathering',
          props,
          on: {
            success: resolve
          }
        })
      })
    },
    // 订单收款回调
    async payCallBack(orderId, modalType, callBackType) {
      switch (callBackType) {
        case 'cancel':
          this.onSearch()
          break
        case 'pay':
          this.createdGatheringTip({
            message: '收款成功',
            order_id: orderId
          }).then(res => {
            this.tipCallBack(orderId, modalType, res.type)
          })
          break
      }
    },
    // 创建成功，提示框modal
    createdGatheringTip(props) {
      return new Promise((resolve, reject) => {
        this.$modalRouter.push({
          name: 'sold-deal-gathering-tip',
          props,
          on: {
            success: resolve
          }
        })
      })
    },
    // 提示框回调，gathering-tip
    async tipCallBack(orderId, modalType, callBackType) {
      switch (callBackType) {
        case 'cancel':
          this.$router.reload()
          break
        case 'Print':
          this.createdOrderPrint(orderId)
          break
        case 'ViewOrder':
          this.createdOrderViewOrder(orderId)
          break
        case 'Pay':
          this.createdOrderPay({ order_id: orderId, type: modalType }).then(
            res => {
              this.payCallBack(orderId, modalType, res.type)
            }
          )
          break
      }
    },
    // 打印合同
    createdOrderPrint(order_id) {
      let url = `${
        window.location.origin
      }/extra/contract-preview?id=${order_id}`
      window.open(url)
    },
    // 查看订单
    createdOrderViewOrder(order_id) {
      this.$router.push({
        name: 'shop-finance-order-info-collection-details',
        query: {
          id: order_id
        }
      })
    },
    // 添加定金
    addEarnest() {
      this.$modalRouter.push({
        name: 'shop-finance-gathering-earnest-add',
        props: {},
        on: {
          success: async res => {
            this.$router.reload()
            // 收款定金成功
            let props = {
              order_id: res.orderId,
              type: 'member'
            }
            this.payCallBack(res.orderId, res.type, 'pay')
          }
        }
      })
    }
  }
}
</script>
