<template>
  <st-panel-layout :class="basic()">
    <st-panel :title="`${$c('member_card')}详情`">
      <div slot="actions">
        <st-button
          v-if="auth['shop:sold:sold_member_card|export_contract']"
          type="primary"
          class="mg-r8"
          @click="toContract"
        >
          查看合同
        </st-button>
        <st-button
          v-if="auth['shop:sold:sold_member_card|frozen']"
          class="mg-r8"
          @click="onFreeze"
        >
          冻结
        </st-button>
        <st-button
          v-if="auth['shop:sold:sold_member_card|renew']"
          class="mg-r8"
          @click="onRenewal"
        >
          续卡
        </st-button>
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item
              v-if="auth['shop:sold:sold_member_card|upgrade']"
              @click="onUpgrade"
            >
              升级
            </a-menu-item>
            <a-menu-item
              v-if="auth['shop:sold:sold_member_card|transfer']"
              @click="onTransfer"
            >
              转让
            </a-menu-item>
            <a-menu-item
              v-if="auth['brand_shop:order:order|refund']"
              @click="onRefund"
            >
              退款
            </a-menu-item>
            <a-menu-item
              v-if="auth['shop:sold:sold_member_card|unfrozen']"
              @click="onUnfreeze"
            >
              取消冻结
            </a-menu-item>
            <a-menu-item
              v-if="auth['shop:sold:sold_member_card|vaild_time']"
              @click="onSetTime"
            >
              修改有效时间
            </a-menu-item>
            <a-menu-item
              v-if="auth['shop:sold:sold_member_card|vip_region']"
              @click="onArea"
            >
              修改入场vip区域
            </a-menu-item>
          </a-menu>
          <st-button>
            更多操作
            <a-icon type="down" />
          </st-button>
        </a-dropdown>
      </div>
      <a-row :gutter="24">
        <a-col :span="9">
          <st-info>
            <st-info-item label="卡名">{{ info.card_name }}</st-info-item>
            <st-info-item label="类型">
              {{ info.card_type | enumFilter('sold_common.card_type') }}
            </st-info-item>
            <st-info-item label="初始额度">{{ info.init_amount }}</st-info-item>
            <st-info-item label="剩余额度">
              {{ info.remain_amount }}
            </st-info-item>
            <st-info-item label="有效期" class="mg-b16">
              {{ info.start_time }} 至 {{ info.end_time }}
            </st-info-item>
            <st-info-item label="合同编号" class="mg-b0">
              {{ info.contract_number }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="所属会员">{{ info.member_name }}</st-info-item>
            <st-info-item label="手机号">{{ info.mobile }}</st-info-item>
            <st-info-item label="订单号">{{ info.order_id }}</st-info-item>
            <st-info-item label="订单状态">
              {{ info.order_status | enumFilter('sold_common.order_status') }}
            </st-info-item>
            <st-info-item label="当前状态" class="mg-b0">
              {{ info.card_status | enumFilter('sold_common.card_status') }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="6">
          <st-info>
            <st-info-item label="允许转让">
              {{
                info.is_transferable | enumFilter('sold_common.is_transferable')
              }}
            </st-info-item>
            <st-info-item label="转让手续费" v-if="info.is_transferable !== 0">
              {{ info.transfer_num
              }}{{
                info.transfer_unit | enumFilter('package_course.transfer_unit')
              }}
            </st-info-item>
            <st-info-item label="入场场馆">
              <template v-if="info.admission_range.id < 2">
                {{ info.admission_range.shop_name }}
              </template>
              <a-popover :title="info.admission_range.shop_name" v-else>
                <template slot="content">
                  <st-table
                    :columns="admissionColumns"
                    :dataSource="info.admission_range.shops"
                    :pagination="false"
                    key="id"
                    :class="basic('popover-content')"
                  ></st-table>
                </template>
                <a type="primary">
                  {{
                    info.admission_range.id
                      | enumFilter('sold_common.admission_range')
                  }}
                </a>
              </a-popover>
            </st-info-item>
            <st-info-item label="约课范围">
              <template v-if="info.course_interests.id < 2">
                {{ info.course_interests.name }}
              </template>
              <a-popover :title="info.course_interests.name" v-else>
                <template slot="content">
                  <st-table
                    :columns="courseColumns"
                    :dataSource="info.course_interests.courses"
                    :pagination="false"
                    key="id"
                    :class="basic('popover-content')"
                  ></st-table>
                </template>
                <a type="primary">
                  {{
                    info.course_interests.id
                      | enumFilter('sold_common.course_interests')
                  }}
                </a>
              </a-popover>
            </st-info-item>
            <st-info-item label="备注" class="mg-b0">
              {{ info.description }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
    </st-panel>
    <st-panel app class="mg-t16" :tabs="pageAuthTabs">
      <router-view></router-view>
    </st-panel>
  </st-panel-layout>
</template>
<script>
import { InfoService } from './info.service'
import { RouteService } from '@/services/route.service'
import moment from 'moment'
import SoldCardArea from '@/views/biz-modals/sold/card/area'
import SoldCardFreeze from '@/views/biz-modals/sold/card/freeze'
import SoldCardRefund from '@/views/biz-modals/sold/card/refund'
import SoldCardRenewalMember from '@/views/biz-modals/sold/card/renewal-member'
import SoldCardSetTime from '@/views/biz-modals/sold/card/set-time'
import SoldCardTransfer from '@/views/biz-modals/sold/card/transfer'
import SoldCardUpgradeMember from '@/views/biz-modals/sold/card/upgrade-member'
import SoldDealGatheringTip from '@/views/biz-modals/sold/deal/gathering-tip'
import SoldDealGathering from '@/views/biz-modals/sold/deal/gathering'
import { admissionColumns, courseColumns } from '../info.config'
import useCardActions from '@/hooks/card-actions.hook'
export default {
  name: 'PageShopSoldCardMemberInfo',
  bem: {
    basic: 'page-shop-sold-info'
  },
  modals: {
    SoldCardArea,
    SoldCardFreeze,
    SoldCardRefund,
    SoldCardRenewalMember,
    SoldCardSetTime,
    SoldCardTransfer,
    SoldCardUpgradeMember,
    SoldDealGatheringTip,
    SoldDealGathering
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
      pageAuthTabs: this.infoService.pageAuthTabs$,
      auth: this.infoService.auth$
    }
  },
  beforeCreate() {
    this.cardActions = useCardActions(this)
    this.cardActions.$on('refresh', val => {
      this.$router.reload()
    })
  },
  computed: {
    // 门店范围
    admissionColumns,
    // 授课范围
    courseColumns
  },
  methods: {
    moment,
    // 跳转合同
    toContract() {
      let record = this.info
      let url = `${window.location.origin}/common/contract-preview?id=${
        record.order_id
      }`
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
            this.$router.reload()
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
          return this.infoService
            .unFreeze(this.infoService.id)
            .toPromise()
            .then(() => {
              this.$router.reload()
            })
        }
      })
    },
    // 续卡
    onRenewal() {
      this.cardActions.onRenewal({
        id: this.infoService.id
      })
    },
    // 升级
    onUpgrade() {
      this.cardActions.upgradeCard({
        id: this.infoService.id
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
            this.$router.reload()
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
            this.$router.reload()
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
            this.$router.reload()
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
            this.$router.reload()
          }
        }
      })
    }
  }
}
</script>
