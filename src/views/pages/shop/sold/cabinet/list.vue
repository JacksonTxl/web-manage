<template>
  <st-panel app initial :class="basic()">
    <st-input-search
      slot="title"
      placeholder="请输入租赁柜号、合同编号、会员姓名或手机号查找"
      v-model="$searchQuery.search"
      @search="onKeywordsSearch('search', $event)"
      style="width:400px"
    />
    <st-search-panel @search="onSearchNative" @reset="onSearchReset">
      <st-search-panel-item label="租赁状态：">
        <st-search-radio
          v-model="$searchQuery.lease_status"
          :options="leaseList"
        />
      </st-search-panel-item>
      <st-search-panel-item label="起租时间：">
        <st-range-picker :disabledDays="180" v-model="date" />
      </st-search-panel-item>
    </st-search-panel>

    <div :class="basic('content')">
      <div :class="basic('content-batch')">
        <!-- NOTE: 导出 -->
        <!-- <st-button v-if="auth.export"  type="primary">批量导出</st-button> -->
      </div>
      <st-table
        :page="page"
        :loading="loading.getList"
        :scroll="{ x: 1600 }"
        rowKey="id"
        :columns="columns"
        @change="onTableChange"
        :dataSource="list"
      >
        <template slot="lease_status" slot-scope="record">
          <st-text
            :status="{
              success: record.id === 1,
              error: record.id === 2,
              warning: record.id === 3
            }"
          >
            {{ record.name }}
          </st-text>
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
      listService: ListService
    }
  },
  rxState() {
    return {
      loading: this.listService.loading$,
      cabinetStatus: this.listService.cabinetStatus$,
      page: this.listService.page$,
      list: this.listService.list$,
      auth: this.listService.auth$
    }
  },
  computed: {
    columns,
    leaseList() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.cabinetStatus.length) return list
      this.cabinetStatus.forEach(o => {
        list.push({ value: +o.value, label: o.label })
      })
      return list
    }
  },
  data() {
    return {
      date: []
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
      this.$searchQuery.start_time = this.date[0]
        ? `${this.date[0].format('YYYY-MM-DD')} 00:00:00`
        : ''
      this.$searchQuery.end_time = this.date[1]
        ? `${this.date[1].format('YYYY-MM-DD')} 23:59:59`
        : ''
      this.onSearch()
    },
    // 设置searchData
    setSearchData() {
      const start = this.$searchQuery.start_time
        ? cloneDeep(moment(this.$searchQuery.start_time))
        : null
      const end = this.$searchQuery.end_time
        ? cloneDeep(moment(this.$searchQuery.end_time))
        : null
      this.date = [start, end]
    },
    // 跳转合同
    toContract(record) {
      const order_id = record.order_id
      let url = `${
        window.location.origin
      }/common/contract-preview?id=${order_id}`
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
                    this.$router.reload()
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
                          this.$router.reload()
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
        case 'PrintOrder':
          this.printOrder(orderId)
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
    // 打印小票
    printOrder(order_id) {
      window.open(
        '/ticket/gathering-print?id=' + order_id,
        '_blank',
        'width=800,height=600'
      )
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
