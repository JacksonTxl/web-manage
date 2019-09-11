<template>
  <st-panel app initial :class="basic()">
    <div slot="title">
      <st-input-search
        placeholder="请输入租赁柜名、会员姓名或手机号查找"
        v-model="query.search"
        @search="onSearchNative"
        :class="basic('search')"
      />
    </div>
    <st-search-panel>
      <div :class="basic('select')">
        <span :class="basic('select-text')">租赁状态：</span>
        <st-search-radio v-model="query.lease_status" :list="leaseList" />
      </div>
      <div :class="basic('select')">
        <span :class="basic('select-text')">起租时间：</span>
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

    <div :class="basic('content')">
      <div :class="basic('content-batch')">
        <!-- NOTE: 导出 -->
        <!-- <st-button v-if="auth.export"  type="primary">批量导出</st-button> -->
      </div>
      <st-table
        :page="page"
        :scroll="{ x: 1600 }"
        rowKey="sold_cabinet_id"
        :columns="columns"
        @change="onTableChange"
        :dataSource="list"
      >
        <template slot="lease_status" slot-scope="record">
          <a-badge
            :status="
              record.id === 1
                ? 'success'
                : record.id === 2
                ? 'error'
                : 'warning'
            "
            :text="record.name"
          />
        </template>
        <div slot="action" slot-scope="text, record">
          <st-table-actions>
            <a
              v-if="record.auth['shop:sold:sold_cabinet|renew']"
              @click="onRelet(record)"
            >
              续租
            </a>
            <a
              v-if="record.auth['shop:sold:sold_cabinet|export_contract']"
              @click="toContract(record)"
            >
              查看合同
            </a>
            <a
              v-if="record.auth['shop:sold:sold_cabinet|transfer']"
              @click="onTransfer(record)"
            >
              转让
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
  </st-panel>
</template>

<script>
import moment from 'moment'
import { cloneDeep, filter } from 'lodash-es'
import { UserService } from '@/services/user.service'
import { ListService } from './list.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './list.config'
import SoldDealGatheringTip from '@/views/biz-modals/sold/deal/gathering-tip'
import SoldDealGathering from '@/views/biz-modals/sold/deal/gathering'
import SoldLeaseRefund from '@/views/biz-modals/sold/lease/refund'
import SoldLeaseRelet from '@/views/biz-modals/sold/lease/relet'
import SoldLeaseTransfer from '@/views/biz-modals/sold/lease/transfer'
export default {
  name: 'PageShopSoldLease',
  mixins: [tableMixin],
  bem: {
    basic: 'page-shop-sold'
  },
  modals: {
    SoldDealGatheringTip,
    SoldDealGathering,
    SoldLeaseRefund,
    SoldLeaseRelet,
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
      loading: this.listService.loading$,
      sold: this.userService.soldEnums$,
      page: this.listService.page$,
      query: this.routeService.query$,
      list: this.listService.list$,
      auth: this.listService.auth$
    }
  },
  computed: {
    columns,
    leaseList() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.sold.sold_cabinet.cabinet_status) return list
      Object.entries(this.sold.sold_cabinet.cabinet_status.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
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
        ? `${this.selectTime.endTime.value.format('YYYY-MM-DD')} 00:00:00`
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
    // 跳转合同
    toContract(record) {
      const order_id = record.order_id
      let url = `${
        window.location.origin
      }/extra/contract-preview?id=${order_id}`
      window.open(url)
    },
    // 查看订单
    createdOrderViewOrder(order_id) {
      console.log('查看订单')
      this.$router.push({
        name: 'shop-finance-order-info-collection-details',
        query: {
          id: order_id
        }
      })
    },
    // 续租
    onRelet(record) {
      this.$modalRouter.push({
        name: 'sold-lease-relet',
        props: {
          id: record.id
        },
        on: {
          success: result => {
            if (result.type === 'create') {
              // 创建订单成功
              this.$modalRouter.push({
                name: 'sold-deal-gathering-tip',
                props: {
                  order_id: result.order_id,
                  type: 'cabinet_order',
                  message: '订单创建成功',
                  needPay: true
                },
                on: {
                  success: res => {
                    this.$router.push({
                      force: true,
                      query: this.$router.query
                    })
                    this.tipCallBack(res.orderId, 'cabinet_order', res.type)
                  }
                }
              })
            } else if (result.type === 'createPay') {
              // 创建订单成功 并且到支付页面
              this.$modalRouter.push({
                name: 'sold-deal-gathering',
                props: {
                  order_id: result.order_id,
                  type: 'cabinet_order'
                },
                on: {
                  success: () => {
                    this.$modalRouter.push({
                      name: 'sold-deal-gathering-tip',
                      props: {
                        orderId: result.order_id,
                        type: 'cabinet_order',
                        message: '收款成功'
                      },
                      on: {
                        success: res => {
                          this.$router.push({
                            force: true,
                            query: this.$router.query
                          })
                          this.tipCallBack(
                            result.order_id,
                            'cabinet_order',
                            res.type
                          )
                        }
                      }
                    })
                  }
                }
              })
            }
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
    payCallBack(orderId, modalType, callBackType) {
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
    // 提示框回调，gathering-tip
    tipCallBack(orderId, modalType, callBackType) {
      switch (callBackType) {
        case 'cancel':
          this.$router.reload()
          break
        case 'Print':
          this.toContract({ order_id: orderId })
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
    // 转让
    onTransfer(record) {
      this.$modalRouter.push({
        name: 'sold-lease-transfer',
        props: {
          id: record.id
        },
        on: {
          success: result => {
            this.$router.reload()
          }
        }
      })
    },
    // 退款
    onRefund(record) {
      this.$modalRouter.push({
        name: 'sold-lease-refund',
        props: {
          id: record.id
        },
        on: {
          success: result => {
            this.$router.reload()
          }
        }
      })
    }
  }
}
</script>
