<template>
  <st-panel-layout :class="basic()">
    <st-panel :title="`${$c('member_card')}详情`">
      <div slot="actions">
        <st-btn-actions :options="btnOptions" />
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
import moment from 'moment'
import SoldCardArea from '@/views/biz-modals/sold/card/area'
import SoldCardFreeze from '@/views/biz-modals/sold/card/freeze'
import SoldCardRefund from '@/views/biz-modals/sold/card/refund'
import SoldCardSetTime from '@/views/biz-modals/sold/card/set-time'
import SoldCardTransfer from '@/views/biz-modals/sold/card/transfer'
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
    SoldCardSetTime,
    SoldCardTransfer
  },
  serviceInject() {
    return {
      infoService: InfoService
    }
  },
  rxState() {
    return {
      info: this.infoService.info$,
      loading: this.infoService.loading$,
      pageAuthTabs: this.infoService.pageAuthTabs$,
      auth: this.infoService.auth$
    }
  },
  beforeCreate() {
    this.cardActions.$on('refresh', val => {
      this.$router.reload()
    })
  },
  hooks() {
    return {
      cardActions: useCardActions()
    }
  },
  computed: {
    // 门店范围
    admissionColumns,
    // 授课范围
    courseColumns,
    btnOptions() {
      return [
        {
          text: '查看合同',
          click: this.toContract,
          if: this.auth['shop:sold:sold_member_card|export_contract']
        },
        {
          text: '冻结',
          click: this.onFreeze,
          if: this.auth['shop:sold:sold_member_card|frozen']
        },
        {
          text: '续卡',
          click: this.onRenewal,
          if: this.auth['shop:sold:sold_member_card|renew']
        },
        {
          text: '升级',
          click: this.onUpgrade,
          if: this.auth['shop:sold:sold_member_card|upgrade']
        },
        {
          text: '转让',
          click: this.onTransfer,
          if: this.auth['shop:sold:sold_member_card|transfer']
        },
        {
          text: '退款',
          click: this.onRefund,
          if: this.auth['brand_shop:order:order|refund']
        },
        {
          text: '取消冻结',
          click: this.onUnfreeze,
          if: this.auth['shop:sold:sold_member_card|unfrozen']
        },
        {
          text: '修改有效时间',
          click: this.onSetTime,
          if: this.auth['shop:sold:sold_member_card|vaild_time']
        },
        {
          text: '修改入场vip区域',
          click: this.onArea,
          if: this.auth['shop:sold:sold_member_card|vip_region']
        }
      ]
    }
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
