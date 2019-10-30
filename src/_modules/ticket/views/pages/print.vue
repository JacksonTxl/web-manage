<template>
  <div :class="b()">
    <div :class="b('section')">
      <div>
        <span>打印时间:</span>
        <span>{{ info.print_time }}</span>
      </div>
      <div :class="b('section-title')">
        {{ info.shop_name }}
      </div>
    </div>
    <div :class="b('section')">
      <span :class="b('section-subtitle')">{{ info.course_info }}</span>
      <div :class="b('section-item')">
        <span class="mg-b16">上课教练:</span>
        <span>{{ info.coach_name }}</span>
      </div>
      <div :class="b('section-item')">
        <span class="mg-b16">上课会员:</span>
        <span>{{ info.member_info }}</span>
      </div>
      <div :class="b('section-item')">
        <span class="mg-b16">上课时间:</span>
        <span>{{ info.course_start_time }}</span>
      </div>
    </div>
    <div :class="b('section')">
      <div :class="b('section-item')">
        <span class="mg-b16">本次消费:</span>
        <span>{{ info.consume }}</span>
      </div>
      <div :class="b('section-item')">
        <span class="mg-b16">消费类型:</span>
        <span>{{ info.consume_type }}</span>
      </div>
      <div :class="b('section-item')">
        <span
          class="mg-b16"
          v-if="info.ticket_type.code === TICKET_TYPE.PERSONAL"
        >
          剩余课时/总课时:
        </span>
        <span
          class="mg-b16"
          v-if="info.ticket_type.code === TICKET_TYPE.DESOPOSIT"
        >
          剩余额度/总额度:
        </span>
        <span v-if="info.ticket_type.code !== TICKET_TYPE.WECHAT">
          {{ info.amount_num }}
        </span>
      </div>
    </div>
    <div
      :class="b('section')"
      v-if="info.ticket_type.code !== TICKET_TYPE.WECHAT"
    >
      <div :class="b('section-item')">
        <span class="mg-b16">合同号:</span>
        <span>{{ info.contract_number }}</span>
      </div>
      <div :class="b('section-item')">
        <span class="mg-b16">合同有效期:</span>
        <span>{{ info.contract_validity_time }}</span>
      </div>
    </div>
    <div :class="b('section')">
      <div class="mg-t48">会员签字:</div>
    </div>
    <div :class="b('section')">
      <div class="mg-t48">教练签字:</div>
    </div>
    <div :class="b('section')">
      <div class="mg-t48">前台签字:</div>
    </div>
    <div>
      <div class="mg-t16 text-center">********感谢您的惠顾！********</div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { PrintService } from './print.service'
import { TICKET_TYPE } from '@/constants/front/reserve'
export default {
  bem: {
    b: 'extra-ticket-preview'
  },
  serviceInject() {
    return {
      printService: PrintService
    }
  },
  rxState() {
    return {
      info: this.printService.info$
    }
  },
  data() {
    return {
      TICKET_TYPE
    }
  },
  created() {
    this.getPrintInfo(this.$route.query.id)
  },
  methods: {
    getPrintInfo(id) {
      this.printService.getPrintInfo(id).subscribe()
    },
    save() {},
    handleCancel() {}
  }
}
</script>
