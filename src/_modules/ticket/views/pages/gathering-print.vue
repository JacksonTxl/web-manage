<template>
  <div :class="b()">
    <div :class="b('section')">
      <div>
        <span>打印时间:</span>
        <span>{{ info.print_time }}</span>
      </div>
      <div :class="b('section-title')">{{ info.shop_name }}</div>
    </div>
    <div :class="b('section')">
      <div :class="b('section-item')">
        <span class="mg-b16">会员姓名:</span>
        <span>{{ info.member_info }}</span>
      </div>
      <div :class="b('section-item')">
        <span class="mg-b16">订单编号:</span>
        <span>{{ info.order_id }}</span>
      </div>
      <div :class="b('section-item')">
        <span class="mg-b16">创建时间:</span>
        <span>{{ info.order_create_time }}</span>
      </div>
      <div :class="b('section-item')">
        <span class="mg-b16">商品类型:</span>
        <span>{{ info.product_type }}</span>
      </div>
    </div>
    <div :class="b('section')">
      <template v-for="(item, index) in info.product_list">
        <span :class="b('section-subtitle')" :key="index">
          {{ item.product_name
          }}{{ item.specification ? '(' + item.specification + ')' : '' }}
        </span>
        <div :class="b('section-item')" :key="index">
          <span class="mg-b16">定价:￥{{ item.price }}</span>
          <span>实付:￥{{ item.actual }}</span>
        </div>
      </template>
    </div>
    <div :class="b('section')">
      <div :class="b('section-item')">
        <span class="mg-b16">商品合计:</span>
        <span>￥{{ info.total_price }}</span>
      </div>
      <div :class="b('section-item')">
        <span class="mg-b16">优惠金额:</span>
        <span>￥{{ info.discount_price }}</span>
      </div>
      <div :class="b('section-item')">
        <span class="mg-b16">减免金额:</span>
        <span>￥{{ info.reduce_price }}</span>
      </div>
      <div :class="b('section-item')">
        <span class="mg-b16">定金抵扣:</span>
        <span>￥{{ info.advance_fee_discount_price }}</span>
      </div>
      <div :class="b('section-item')">
        <span class="mg-b16">应付金额:</span>
        <span>￥{{ info.actual_price }}</span>
      </div>
      <div :class="b('section-item')">
        <span class="mg-b16">实付金额:</span>
        <span>￥{{ info.pay_price }}</span>
      </div>
    </div>
    <div>
      <div class="mg-t16 ta-c">*******感谢您的惠顾！*******</div>
    </div>
  </div>
</template>
<script>
import { GatheringPrintService } from './gathering-print.service'
export default {
  bem: {
    b: 'extra-gathering-ticket-preview'
  },
  serviceInject() {
    return {
      gatheringPrintService: GatheringPrintService
    }
  },
  rxState() {
    return {
      info: this.gatheringPrintService.info$
    }
  },
  mounted() {
    window.print()
  }
}
</script>
