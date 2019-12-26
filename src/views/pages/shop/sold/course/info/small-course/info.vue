<template>
  <st-panel-layout :class="basic()">
    <st-panel title="小班课详情">
      <div slot="actions">
        <st-btn-actions
          :options="[
            {
              //if: auth['shop:sold:sold_personal_course|export_contract'],
              text: '查看合同',
              click: toContract
            },
            {
              //if: auth['shop:sold:sold_personal_course|transfer'],
              text: '转让',
              click: onTransfer
            },
            {
              //if: auth['brand_shop:order:order|refund'],
              text: '退款',
              click: onRefund
            }
          ]"
        ></st-btn-actions>
      </div>
      <a-row :gutter="24">
        <a-col :span="9">
          <st-info>
            <st-info-item label="课程名称">
              {{ info.course_name }}
            </st-info-item>
            <st-info-item label="类型">{{ info.type }}</st-info-item>
            <st-info-item label="剩余课时">
              {{ info.remain_course_num }}节
            </st-info-item>
            <st-info-item label="购买课时">
              {{ info.init_course_num }}节
            </st-info-item>
            <st-info-item label="班级时间">
              {{ info.buy_time }} 至 {{ info.end_time }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="所属会员">
              {{ info.member_name }}
            </st-info-item>

            <template v-if="info.is_minors === 1">
              <st-info-item label="家长手机号">
                {{ info.parent_mobile }}
              </st-info-item>
              <st-info-item :label="`家长姓名`">
                {{ info.parent_name }}({{ info.parent_user_role }})
              </st-info-item>
            </template>
            <template v-else>
              <st-info-item label="手机号">
                {{ info.mobile }}
              </st-info-item>
            </template>
            <st-info-item label="订单号">
              {{ info.order_id }}
            </st-info-item>
            <st-info-item label="合同编号">
              {{ info.contract_number }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="6">
          <st-info>
            <st-info-item label="允许转让">
              {{ info.is_transfer }}
            </st-info-item>
            <st-info-item label="转让手续费">
              {{ info.transfer_num }}{{ info.transfer_fee }}
            </st-info-item>
            <st-info-item label="当前状态">
              {{ info.course_status }}
            </st-info-item>
            <st-info-item label="订单状态">
              {{ info.order_status }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="24">
          <st-info>
            <st-info-item label="备注" class="mg-b0">
              {{ info.description || '无' }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
    </st-panel>
    <st-panel app class="mg-t12" :tabs="authTabs">
      <router-view></router-view>
    </st-panel>
  </st-panel-layout>
</template>
<script>
import { InfoService } from './info.service'
import useSmallCourseActions from '@/hooks/shop/sold-small-course-actions.hook'

export default {
  name: 'PageShopSoldSmallCourseInfo',
  bem: {
    basic: 'page-shop-sold-info'
  },
  serviceInject() {
    return {
      infoService: InfoService
    }
  },
  rxState() {
    return {
      info: this.infoService.info$,
      authTabs: this.infoService.authTabs$,
      auth: this.infoService.auth$
    }
  },
  beforeCreate() {
    this.smallCourseActions.$on('refresh', val => {
      this.$router.reload()
    })
  },
  hooks() {
    return {
      smallCourseActions: useSmallCourseActions()
    }
  },
  methods: {
    // 跳转合同
    toContract() {
      let record = this.info
      let url = `${window.location.origin}/common/contract-preview?id=${
        record.order_id
      }`
      window.open(url)
    },
    onTransfer() {
      this.smallCourseActions.onTrasnfer({
        id: this.$searchQuery.id
      })
    },
    onRefund() {}
  }
}
</script>
