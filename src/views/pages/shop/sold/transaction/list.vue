<template>
  <st-panel app initial :class="basic()">
    <div slot="title" :class="sale('search')">
      <st-input-search
      v-model="query.product_name"
      @search="getList"
      placeholder="请输入商品名查找"
      style="width: 290px;"/>
      <a-select :class="sale('select')" v-model="query.product_type" @change="getList" style="width: 160px">
        <a-select-option
        v-for="(item,index) in productType"
        :key="index"
        :value="item.value">{{item.label}}</a-select-option>
      </a-select>
    </div>
    <div :class="basic('content')">
      <st-table
      :page="page"
      rowKey="id"
      :columns="columns"
      @change="onTableChange"
      :dataSource="list">

        <div slot="action" slot-scope="text, record">
          <st-table-actions>
            <a v-if="record.auth['shop:product:product|order']" @click="onTransaction(record)">签单</a>
          </st-table-actions>
        </div>
      </st-table>
    </div>
  </st-panel>
</template>

<script>
import { ListService } from './list.service'
import { UserService } from '@/services/user.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './list.config'
export default {
  name: 'PageShopSoldLease',
  mixins: [tableMixin],
  bem: {
    basic: 'page-shop-sold',
    sale: 'page-shop-sold-sale'
  },
  serviceInject() {
    return {
      listService: ListService,
      userService: UserService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      list: this.listService.list$,
      page: this.listService.page$,
      loading: this.listService.loading$,
      query: this.routeService.query$,
      transaction: this.userService.transactionEnums$,
      auth: this.listService.auth$
    }
  },
  computed: {
    columns,
    productType() {
      let list = []
      if (!this.transaction.product_type) return list
      Object.entries(this.transaction.product_type.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    }
  },
  data() {
    return {
    }
  },
  methods: {
    getList() {
      this.$router.push({ query: this.query, force: true })
    },
    onPageChange(data) {
      this.$router.push({ query: { ...this.query, page: data.current, size: data.pageSize }, force: true })
    },
    // 详情
    onDetail(record) {
      console.log(record)
    },
    // 签单
    onTransaction(record) {
      switch (this.query.product_type) {
        case 1:
          this.onMember(record)
          break
        case 2:
          this.onDeposit(record)
          break
        case 3:
          this.onPersonalCourse(record)
          break
        case 5:
          this.onPackage(record)
          break
        case 6:
          this.onCabinet(record)
          break
      }
    },
    // 打印合同
    createdOrderPrint(order_id) {
      let url = `${window.location.origin}/extra/contract-preview?id=${order_id}`
      window.open(url)
    },
    // 查看订单
    createdOrderViewOrder() {
      console.log('查看订单')
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
          this.getList()
          break
        case 'Print':
          this.createdOrderPrint(orderId)
          break
        case 'ViewOrder':
          this.createdOrderViewOrder()
          break
        case 'Pay':
          this.createdOrderPay({ order_id: orderId, type: modalType }).then(res => {
            this.payCallBack(orderId, modalType, res.type)
          })
          break
      }
    },
    // 订单收款回调
    async payCallBack(orderId, modalType, callBackType) {
      switch (callBackType) {
        case 'cancel':
          this.getList()
          break
        case 'pay':
          this.createdGatheringTip({ message: '收款成功', order_id: orderId }).then(res => {
            this.tipCallBack(orderId, modalType, res.type)
          })
          break
      }
    },
    // 签单成功回调
    async saleCallBack(result, type) {
      if (result.type === 'create') {
        // 创建订单成功
        let props = {
          order_id: result.orderId,
          type,
          message: '订单创建成功',
          needPay: true
        }
        let orderSuccessRes = await this.createdGatheringTip(props)
        console.log(orderSuccessRes)
        this.tipCallBack(result.orderId, type, orderSuccessRes.type)
      } else if (result.type === 'createPay') {
        // 创建订单成功 并且到支付页面
        let props = {
          order_id: result.orderId,
          type
        }
        let payOrderRes = await this.createdOrderPay(props)
        this.payCallBack(result.orderId, type, payOrderRes.type)
      }
    },
    // 会员卡签单
    onMember(record) {
      this.$modalRouter.push({
        name: 'sold-deal-sale-member-card',
        props: {
          id: `${record.id}`
        },
        on: {
          success: (result) => {
            this.saleCallBack(result, 'member')
          }
        }
      })
    },
    // 储值卡签单
    onDeposit(record) {
      this.$modalRouter.push({
        name: 'sold-deal-sale-deposit-card',
        props: {
          id: `${record.id}`
        },
        on: {
          success: (result) => {
            this.saleCallBack(result, 'deposit')
          }
        }
      })
    },
    // 储物柜签单
    onCabinet(record) {
      this.$modalRouter.push({
        name: 'sold-deal-sale-cabinet',
        props: {
          // 默认传0，因为没有选择具体的柜子
          id: '0',
          areaId: `${record.id}`
        },
        on: {
          success: (result) => {
            this.saleCallBack(result, 'cabinet_order')
          }
        }
      })
    },
    // 课程包签单
    onPackage(record) {
      this.$modalRouter.push({
        name: 'sold-deal-sale-course',
        props: {
          id: `${record.id}`
        },
        on: {
          success: (result) => {
            this.saleCallBack(result, 'package')
          }
        }
      })
    },
    // 私教课签单
    onPersonalCourse(record) {
      this.$modalRouter.push({
        name: 'sold-deal-sale-personal-course',
        props: {
          id: `${record.id}`
        },
        on: {
          success: (result) => {
            this.saleCallBack(result, 'personal')
          }
        }
      })
    },

    onAdvance() {
      this.listService.addAdvance({
        member_id: 20554589995205,
        sale_id: 29338200768663,
        pay_price: `${Date.now() % 10}`,
        pay_channel: 1,
        contract_number: 'C62',
        description: '11'
      }).subscribe()
    }
  }
}
</script>
