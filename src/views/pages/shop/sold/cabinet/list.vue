<template>
  <st-panel app initial :class="basic()">
    <div slot="title">
      <st-input-search
      placeholder="请输入租赁柜名、会员姓名或手机号查找"
      v-model="search"
      @search="onSearch"
      style="width: 290px;"/>
    </div>
    <st-search-panel>
      <div :class="basic('select')">
        <span style="width:90px;">租赁状态：</span>
        <st-search-radio v-model="lease_status" :list="leaseList"/>
      </div>
      <div :class="basic('select')">
        <span style="width:90px;">起租时间：</span>
        <a-date-picker
          format="YYYY-MM-DD"
          placeholder="开始日期"
          :showToday="false"
          v-model="start_time"
        />
        &nbsp;~&nbsp;
        <a-date-picker
          format="YYYY-MM-DD"
          placeholder="结束日期"
          :showToday="false"
          v-model="end_time"
        />
      </div>
      <div slot="button">
          <st-button type="primary" @click="onSearch">查询</st-button>
          <st-button class="mgl-8" @click="onReset">重置</st-button>
      </div>
    </st-search-panel>

    <div :class="basic('content')">
      <div :class="basic('content-batch')">
          <st-button v-if="auth.export"  type="primary">批量导出</st-button>
      </div>
      <st-table
      rowKey="sold_cabinet_id"
      :columns="columns"
      :dataSource="list">
        <template
            slot="lease_status"
            slot-scope="record">
          <a-badge :status="record.id === 1?'success':record.id === 2?'error':'warning'" :text="record.name" />
        </template>
        <div slot="action" slot-scope="text, record">
          <a v-if="record.auth['shop:sold:sold_cabinet|renew']" @click="onRelet(record)">续租</a>
          <a-divider type="vertical"></a-divider>
          <a v-if="record.auth['shop:sold:sold_cabinet|export_contract']" @click="toContract(record)">查看合同</a>
          <a-divider type="vertical"></a-divider>
          <a v-if="record.auth['shop:sold:sold_cabinet|transfer']" @click="onTransfer(record)">转让</a>
          <a-divider type="vertical"></a-divider>
          <a v-if="record.auth['shop:sold:sold_cabinet|refund']" @click="onRefund(record)">退款</a>
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
export default {
  name: 'PageShopSoldLease',
  bem: {
    basic: 'page-shop-sold'
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
      sold: this.userService.soldEnums$,
      loading: this.listService.loading$,
      page: this.listService.page$,
      query: this.routeService.query$,
      list: this.listService.list$,
      auth: this.listService.auth$
    }
  },
  computed: {
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
      columns: [
        {
          title: '租赁柜号',
          dataIndex: 'serial_num',
          scopedSlots: { customRender: 'serial_num' }
        }, {
          title: '剩余天数',
          dataIndex: 'remain_days',
          scopedSlots: { customRender: 'remain_days' }
        }, {
          title: '租赁天数',
          dataIndex: 'lease_days',
          scopedSlots: { customRender: 'lease_days' }
        }, {
          title: '姓名',
          dataIndex: 'member_name',
          scopedSlots: { customRender: 'member_name' }
        }, {
          title: '手机号',
          dataIndex: 'member_mobile',
          scopedSlots: { customRender: 'member_mobile' }
        }, {
          title: '状态',
          dataIndex: 'lease_status',
          scopedSlots: { customRender: 'lease_status' }
        }, {
          title: '到期日期',
          dataIndex: 'end_time',
          scopedSlots: { customRender: 'end_time' }
        }, {
          title: '起租日期',
          dataIndex: 'start_time',
          scopedSlots: { customRender: 'start_time' }
        }, {
          title: '销售人员',
          dataIndex: 'sale_name',
          scopedSlots: { customRender: 'sale_name' }
        }, {
          title: '关联订单号',
          dataIndex: 'order_id',
          scopedSlots: { customRender: 'order_id' }
        }, {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }],
      search: '',
      lease_status: -1,
      start_time: null,
      end_time: null
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
    onSearch() {
      let params = {
        search: this.search,
        lease_status: this.lease_status,
        start_time: this.start_time
          ? `${this.start_time.format('YYYY-MM-DD')} 00:00:00`
          : '',
        end_time: this.end_time
          ? `${this.end_time.format('YYYY-MM-DD')} 23:59:59`
          : ''
      }
      this.$router.push({ query: { ...this.query, ...params } })
    },
    // 重置
    onReset() {
      let query = {
        search: '',
        lease_status: -1,
        start_time: '',
        end_time: ''
      }
      this.$router.push({ query: { ...this.query, ...query } })
    },
    // 设置searchData
    setSearchData() {
      this.search = this.query.search
      this.lease_status = this.query.lease_status
      this.start_time = this.query.start_time
        ? cloneDeep(moment(this.query.start_time))
        : null
      this.end_time = this.query.end_time
        ? cloneDeep(moment(this.query.end_time))
        : null
    },
    // 跳转合同
    toContract(record) {
      let url = `${window.location.origin}/extra/contract-preview?id=${record.order_id}`
      window.open(url)
    },
    // 续租
    onRelet(record) {
      this.$modalRouter.push({
        name: 'sold-lease-relet',
        props: {
          id: record.id
          // id: 48587472437681
        },
        on: {
          success: (result) => {
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
                  success: () => {
                    this.$router.push({ force: true, query: this.$router.query })
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
                        success: () => {
                          this.$router.push({ force: true, query: this.$router.query })
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
    // 转让
    onTransfer(record) {
      this.$modalRouter.push({
        name: 'sold-lease-transfer',
        props: {
          id: record.id
          // id: 48587472437681
        },
        on: {
          success: (result) => {
            console.log('转让成功!')
            this.$router.push({ force: true, query: this.$router.query })
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
          // id: 58240612761731
        },
        on: {
          success: (result) => {
            console.log('退款成功!')
            this.$router.push({ force: true, query: this.$router.query })
          }
        }
      })
    }
  }
}
</script>
