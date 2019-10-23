<template>
  <st-modal title="小票预览" v-model="show" size="small">
    <template slot="footer">
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" @click="save">
        打印
      </a-button>
    </template>
    <div :class="b()" id="print">
      <div :class="b('section')">
        <div :class="b('section-item')">
          <span>打印时间:</span>
          <span>{{ info.print_time }}</span>
        </div>
        <h1>
          {{ info.shop_name }}
        </h1>
      </div>
      <div :class="b('section')">
        <h4>{{ info.course_info }}</h4>
        <div :class="b('section-item')">
          <span>上课教练:</span>
          <span>{{ info.coach_name }}</span>
        </div>
        <div :class="b('section-item')">
          <span>上课会员:</span>
          <span>{{ info.member_info }}</span>
        </div>
        <div :class="b('section-item')">
          <span>上课时间:</span>
          <span>{{ info.coach_start_time }}</span>
        </div>
      </div>
      <div :class="b('section')">
        <div :class="b('section-item')">
          <span>本次消费:</span>
          <span>{{ info.consume }}</span>
        </div>
        <div :class="b('section-item')">
          <span>消费类型:</span>
          <span>{{ info.consume_type }}</span>
        </div>
        <div>
          <span>剩余额度/总额度:</span>
          <span>{{ info.consume_type }}</span>
        </div>
      </div>
      <div :class="b('section')">
        <div :class="b('section-item')">
          <span>合同号:</span>
          <span>{{ info.contract_number }}</span>
        </div>
        <div :class="b('section-item')">
          <span>合同号有效期:</span>
          <span>{{ info.contract_validity_time }}</span>
        </div>
      </div>
      <div :class="b('section')">
        <span>会员签字:</span>
      </div>
      <div :class="b('section')">
        <span>会员签字:</span>
      </div>
      <div :class="b('section')">
        <span>会员签字:</span>
      </div>
    </div>
  </st-modal>
</template>
<script>
import moment from 'moment'
import { TicketPreviewService } from './print.service'
import avatar from '@/assets/img/avatar_default_contract.png'
import { cloneDeep } from 'lodash-es'
export default {
  bem: {
    b: 'reception-print'
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
  props: {
    id: Number
  },
  data() {
    return {
      show: false
    }
  },
  created() {
    this.getPrintInfo(this.id)
  },
  methods: {
    getPrintInfo(id) {
      this.ticketPreviewService.getPrintInfo(id).subscribe()
    },
    save() {
      let bdhtml = window.document.body.innerHTML
      let jubuData = document.getElementById('print').innerHTML
      //把获取的 局部div内容赋给body标签, 相当于重置了 body里的内容
      window.document.body.innerHTML = cloneDeep(jubuData)
      //调用打印功能
      window.print()
      window.document.body.innerHTML = bdhtml //重新给页面内容赋值；
    },
    handleCancel() {}
  }
}
</script>
