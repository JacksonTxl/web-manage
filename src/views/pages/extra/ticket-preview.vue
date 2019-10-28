<template>
  <div :class="b()" id="print">
    <div :class="b('section')">
      <div>
        <span class="mg-b16">打印时间:</span>
        <span>{{ info.print_time }}</span>
      </div>
      <h1>
        {{ info.shop_name }}
      </h1>
    </div>
    <div :class="b('section')">
      <h4>{{ info.course_info }}</h4>
      <div :class="b('section-item')">
        <span class="mg-b8">上课教练:</span>
        <span>{{ info.coach_name }}</span>
      </div>
      <div :class="b('section-item')">
        <span class="mg-b8">上课会员:</span>
        <span>{{ info.member_info }}</span>
      </div>
      <div :class="b('section-item')">
        <span class="mg-b8">上课时间:</span>
        <span>{{ info.coach_start_time }}</span>
      </div>
    </div>
    <div :class="b('section')">
      <div :class="b('section-item')">
        <span class="mg-b8">本次消费:</span>
        <span>{{ info.consume }}</span>
      </div>
      <div :class="b('section-item')">
        <span class="mg-b8">消费类型:</span>
        <span>{{ info.consume_type }}</span>
      </div>
      <div :class="b('section-item')">
        <span
          class="mg-b8"
          v-if="info.ticket_type.code === TICKET_TYPE.PERSONAL"
        >
          剩余课时/总课时:
        </span>
        <span
          class="mg-b8"
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
        <span class="mg-b8">合同号:</span>
        <span>{{ info.contract_number }}</span>
      </div>
      <div :class="b('section-item')">
        <span class="mg-b8">合同号有效期:</span>
        <span>{{ info.contract_validity_time }}</span>
      </div>
    </div>
    <div :class="b('section')">
      <div class="mg-t24">会员签字:</div>
    </div>
    <div :class="b('section')">
      <div class="mg-t24">教练签字:</div>
    </div>
    <div :class="b('section')">
      <div class="mg-t24">前台签字:</div>
    </div>
    <div>
      <div class="mg-t16 text-center">********感谢您的惠顾！********</div>
    </div>
  </div>
</template>
<script>
import { dateFilter } from '@/filters/date.filters'
import moment from 'moment'
import { TicketPreviewService } from './ticket-preview.service'
import avatar from '@/assets/img/avatar_default_contract.png'
import { TICKET_TYPE } from '@/constants/front/reserve'
export default {
  bem: {
    b: 'extra-ticket-preview'
  },
  serviceInject() {
    return {
      ticketPreviewService: TicketPreviewService
    }
  },
  rxState() {
    return {
      info: this.ticketPreviewService.info$
    }
  },
  filters: { dateFilter },
  data() {
    return {
      TICKET_TYPE,
      avatar: avatar
    }
  },
  created() {
    let html = document.querySelector('html')
    html.className += 'ticket-print'
    this.getPrintInfo(this.$route.query.id)
  },
  methods: {
    getPrintInfo(id) {
      this.ticketPreviewService.getPrintInfo(id).subscribe()
    },
    save() {},
    handleCancel() {}
  }
}
</script>
