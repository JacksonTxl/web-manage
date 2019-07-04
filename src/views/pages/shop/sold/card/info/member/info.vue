<template>
  <section :class="basic()">
    <st-panel title="会员卡详情">
      <div slot="actions">
        <st-button v-if="auth['shop:sold:sold_member_card|export_contract']" type="primary" class="mgr-8"  @click="toContract">查看合同</st-button>
        <st-button v-if="auth['shop:sold:sold_member_card|frozen']" class="mgr-8" @click="onFreeze">冻结</st-button>
        <st-button v-if="auth['shop:sold:sold_member_card|renew']" class="mgr-8" @click="onRenewal">续卡</st-button>
        <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item v-if="auth['shop:sold:sold_member_card|upgrade']" @click="onUpgrade">升级</a-menu-item>
              <a-menu-item v-if="auth['shop:sold:sold_member_card|transfer']" @click="onTransfer">转让</a-menu-item>
              <a-menu-item v-if="auth['shop:sold:sold_member_card|refund']" @click="onRefund">退款</a-menu-item>
              <a-menu-item v-if="auth['shop:sold:sold_member_card|unfrozen']" @click="onUnfreeze">取消冻结</a-menu-item>
              <a-menu-item v-if="auth['shop:sold:sold_member_card|vaild_time']" @click="onSetTime">修改有效时间</a-menu-item>
              <a-menu-item v-if="auth['shop:sold:sold_member_card|vip_region']" @click="onArea">修改入场vip区域</a-menu-item>
            </a-menu>
            <a-button>
              更多操作
              <a-icon type="down"/>
            </a-button>
          </a-dropdown>
      </div>
      <a-row :gutter="24">
        <a-col :span="9">
          <st-info>
            <st-info-item label="卡名">{{info.card_name}}</st-info-item>
            <st-info-item label="类型">{{info.card_type | enumFilter('sold.card_type')}}</st-info-item>
            <st-info-item label="初始额度">{{info.init_amount}}</st-info-item>
            <st-info-item label="剩余额度">{{info.remain_amount}}</st-info-item>
            <st-info-item label="有效期" class="mg-b0">{{info.start_time}} 至  {{info.end_time}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="所属会员">{{info.member_name}}</st-info-item>
            <st-info-item label="手机号">{{info.mobile}}</st-info-item>
            <st-info-item label="订单号">{{info.order_id}}</st-info-item>
            <st-info-item label="订单状态">{{info.order_status | enumFilter('sold.order_status')}}</st-info-item>
            <st-info-item label="当前状态" class="mg-b0">{{info.card_status | enumFilter('sold.card_status')}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="6">
          <st-info>
            <st-info-item label="允许转让">{{info.is_transferable | enumFilter('sold.is_transferable')}}</st-info-item>
            <st-info-item label="转让手续费" v-if="info.is_transferable !== 0">{{info.transfer_num}}{{info.transfer_unit | enumFilter('package_course.transfer_unit')}}</st-info-item>
            <st-info-item label="入场场馆">
              <template v-if="+info.admission_range===1">
                {{info.shop_name}}
              </template>
              <template v-if="+info.admission_range===2">
                <a @click="onShowShops">
                  {{info.admission_range | enumFilter('sold.admission_range')}}
                </a>
              </template>
              <template v-if="+info.admission_range===3">
                {{info.admission_range | enumFilter('sold.admission_range')}}
              </template>
            </st-info-item>
            <st-info-item label="约课范围">
              <template v-if="+info.course_interests===4">
                <a @click="onShowCourses">
                  {{info.course_interests | enumFilter('sold.course_interests')}}
                </a>
              </template>
              <template v-else>
                {{info.course_interests | enumFilter('sold.course_interests')}}
              </template>
            </st-info-item>
            <st-info-item label="备注" class="mg-b0">{{info.description}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
    </st-panel>
    <st-panel initial class="mgt-12" v-if="false"
      :tabs="[
        { label: '消费记录', route: { name: 'shop-sold-card-info-member-info-consumption-record', query: {id:infoService.id}  } },
        { label: '操作日志', route: { name: 'shop-sold-card-info-member-info-operation-record', query: {id:infoService.id}  } },
      ]"
    >
    <router-view></router-view>
  </st-panel>
  </section>
</template>
<script>
import { InfoService } from './info.service'
import { RouteService } from '@/services/route.service'
import moment from 'moment'
export default {
  name: 'PageShopSoldCardMemberInfo',
  bem: {
    basic: 'page-shop-sold-info'
  },
  serviceInject() {
    return {
      infoService: InfoService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      info: this.infoService.info$,
      query: this.routeService.query$,
      loading: this.infoService.loading$,
      auth: this.infoService.auth$
    }
  },
  methods: {
    moment,
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
          this.createdGatheringTip({ message: '收款成功', order_id: orderId }).then(res => {
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
          this.onSearch()
          break
        case 'Print':
          this.createdOrderPrint()
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
    // 打印合同
    createdOrderPrint() {
      console.log('打印合同')
    },
    // 查看订单
    createdOrderViewOrder() {
      console.log('查看订单')
    },
    // 跳转合同
    toContract() {
      let record = this.info
      let url = `${window.location.origin}/extra/contract-preview?id=${record.order_id}`
      window.open(url)
    },
    // 冻结
    onFreeze() {
      this.$modalRouter.push({
        name: 'sold-card-freeze',
        props: {
          id: this.infoService.id
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 取消冻结
    onUnfreeze(record) {
      this.$confirm({
        title: '提示',
        content: '是否取消冻结？',
        maskClosable: true,
        onOk: () => {
          return this.infoService.unFreeze(this.infoService.id).toPromise().then(() => {
            this.$router.push({ force: true, query: this.query })
          })
        }
      })
    },
    // 续卡
    onRenewal() {
      this.$modalRouter.push({
        name: 'sold-card-renewal-member',
        props: {
          id: this.infoService.id
        },
        on: {
          success: async res => {
            this.$router.push({ force: true, query: this.query })
            if (res.type === 'create') {
              // 创建订单成功
              let props = {
                order_id: res.orderId,
                type: 'member',
                message: '订单创建成功',
                needPay: true
              }
              let orderSuccessRes = await this.createdGatheringTip(props)
              this.tipCallBack(res.orderId, 'member', orderSuccessRes.type)
            } else if (res.type === 'createPay') {
              // 创建订单成功 并且到支付页面
              let props = {
                order_id: res.orderId,
                type: 'member'
              }
              let payOrderRes = await this.createdOrderPay(props)
              this.payCallBack(res.orderId, 'member', payOrderRes.type)
            }
          }
        }
      })
    },
    // 升级
    onUpgrade() {
      this.$modalRouter.push({
        name: 'sold-card-upgrade-member',
        props: {
          id: this.infoService.id
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 转让
    onTransfer() {
      this.$modalRouter.push({
        name: 'sold-card-transfer',
        props: {
          id: this.infoService.id,
          type: 'member'
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 退款
    onRefund() {
      this.$modalRouter.push({
        name: 'sold-card-refund',
        props: {
          type: 'member',
          id: this.infoService.id
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 修改有效时间
    onSetTime() {
      this.$modalRouter.push({
        name: 'sold-card-set-time',
        props: {
          id: this.infoService.id
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 变更vip入场区域
    onArea() {
      this.$modalRouter.push({
        name: 'sold-card-area',
        props: {
          id: [this.infoService.id]
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    onShowShops() {
      console.log('多门店')
    },
    onShowCourses() {
      console.log('多课程')
    }
  }
}
</script>
