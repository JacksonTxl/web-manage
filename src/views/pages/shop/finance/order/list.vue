<template>
  <st-panel app initial :class="basic()">
    <div slot="title">
      <st-input-search
      placeholder="请输入会员姓名或手机号查找"
      v-model="keyword"
      style="width: 290px;"/>
    </div>
    <st-search-panel>
      <div :class="basic('select')">
        <span style="width:90px;">订单状态：</span>
        <st-search-radio v-model="status" :list="orderStatusList"/>
      </div>
      <div :class="basic('select')">
        <span style="width:90px;">支付状态：</span>
        <st-search-radio v-model="type" :list="payStatusList"/>
      </div>
      <div :class="basic('select')">
        <span style="width:90px;">创建时间：</span>
        <a-date-picker
          format="YYYY-MM-DD"
          placeholder="开始日期"
          :showToday="false"
          v-model="start_date"
        />
        &nbsp;~&nbsp;
        <a-date-picker
          format="YYYY-MM-DD"
          placeholder="结束日期"
          :showToday="false"
          v-model="end_date"
        />
      </div>
      <div slot="button">
          <st-button type="primary" @click="onSearch">查询</st-button>
          <st-button class="mgl-8" @click="onReset">重置</st-button>
      </div>
    </st-search-panel>

    <div :class="basic('content')">
      <div :class="basic('content-batch')">
          <st-button type="primary">批量导出</st-button>
      </div>
      <st-table
      rowKey="sold_cabinet_id"
      :columns="columns"
      :dataSource="list">
        <template slot="order_status" slot-scope="text">
          {{text | enumFilter('sold.order_status')}}
        </template>
        <div slot="action" slot-scope="text, record">
          <a @click="onRelet(record)">收款</a>
          <a-divider type="vertical"></a-divider>
          <a>取消</a>
          <a-divider type="vertical"></a-divider>
          <a @click="onTransfer(record)">详情</a>
          <a-divider type="vertical"></a-divider>
          <a @click="onRefund(record)">退款</a>
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
  name: 'PageShopFinanceOrder',
  bem: {
    basic: 'page-shop-finance'
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
      list: this.listService.list$
    }
  },
  computed: {
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
      columns: [
        {
          title: '订单编号',
          dataIndex: 'id',
          scopedSlots: { customRender: 'id' }
        }, {
          title: '商品名称',
          dataIndex: 'product_name',
          scopedSlots: { customRender: 'product_name' }
        }, {
          title: '商品类型',
          dataIndex: 'product_type',
          scopedSlots: { customRender: 'product_type' }
        }, {
          title: '订单状态',
          dataIndex: 'order_status',
          scopedSlots: { customRender: 'order_status' }
        }, {
          title: '支付状态',
          dataIndex: 'pay_status',
          scopedSlots: { customRender: 'pay_status' }
        }, {
          title: '会员姓名',
          dataIndex: 'member_name',
          scopedSlots: { customRender: 'member_name' }
        }, {
          title: '手机号',
          dataIndex: 'member_mobile',
          scopedSlots: { customRender: 'member_mobile' }
        }, {
          title: '订单总价',
          dataIndex: 'total_price',
          scopedSlots: { customRender: 'total_price' }
        }, {
          title: '优惠金额',
          dataIndex: 'order_discount',
          scopedSlots: { customRender: 'order_discount' }
        }, {
          title: '减免金额',
          dataIndex: 'reduce_price',
          scopedSlots: { customRender: 'reduce_price' }
        }, {
          title: '实收金额',
          dataIndex: 'pay_price',
          scopedSlots: { customRender: 'pay_price' }
        }, {
          title: '剩余待收',
          dataIndex: 'remainder_price',
          scopedSlots: { customRender: 'remainder_price' }
        }, {
          title: '创建时间',
          dataIndex: 'created_time',
          scopedSlots: { customRender: 'created_time' }
        }, {
          title: '销售',
          dataIndex: 'staff_name',
          scopedSlots: { customRender: 'staff_name' }
        }, {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }],
      keyword: '',
      status: -1,
      type: -1,
      start_date: null,
      end_date: null
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
        keyword: this.keyword,
        status: this.status,
        start_date: this.start_date
          ? `${this.start_date.format('YYYY-MM-DD')}`
          : '',
        end_date: this.end_date
          ? `${this.end_date.format('YYYY-MM-DD')}`
          : ''
      }
      this.$router.push({ query: { ...this.query, ...params } })
    },
    // 重置
    onReset() {
      let query = {
        keyword: '',
        status: -1,
        type: -1,
        start_date: '',
        end_date: ''
      }
      this.$router.push({ query: { ...this.query, ...query } })
    },
    // 设置searchData
    setSearchData() {
      this.keyword = this.query.keyword
      this.status = this.query.status
      this.type = this.query.type
      this.start_date = this.query.start_date
        ? cloneDeep(moment(this.query.start_date))
        : null
      this.end_date = this.query.end_date
        ? cloneDeep(moment(this.query.end_date))
        : null
    },
    // 收款
    onRelet(record) {
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
                order_id: result.order_id,
                type: 'cabinet_order',
                message: '收款成功'
              },
              on: {
                success: () => {
                  console.log('success')
                }
              }
            })
          }
        }
      })
    },
    // 转让
    onTransfer(record) {
      this.$modalRouter.push({
        name: 'sold-lease-transfer',
        props: {
          // id: record.sold_cabinet_id,
          id: 48587472437681
        },
        on: {
          success: (result) => {
            console.log('转让成功!')
          }
        }
      })
    },
    // 退款
    onRefund(record) {
      this.$modalRouter.push({
        name: 'sold-lease-refund',
        props: {
          // id: record.sold_cabinet_id,
          id: 48587472437681
        },
        on: {
          success: (result) => {
            console.log('退款成功!')
          }
        }
      })
    }
  }
}
</script>
