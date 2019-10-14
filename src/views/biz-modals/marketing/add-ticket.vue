<template>
  <st-modal :title="modalTitle" width="500px" v-model="show">
    <div class="modal-marketing-add-ticket">
      <st-form :form="form" labelWidth="66px">
        <st-form-item label="票种类型" required>
          <a-radio-group
            @change="onChangeGetTicketType"
            v-model="ticketType"
            :defaultValue="1"
          >
            <a-radio :value="1">收费票</a-radio>
            <a-radio :value="2">免费票</a-radio>
          </a-radio-group>
        </st-form-item>
        <st-form-item label="票种名称" required>
          <a-input v-decorator="decorators.name"></a-input>
        </st-form-item>
        <st-form-item v-show="ticketType === 1" label="价格" required>
          <a-input-number
            min="0"
            v-decorator="decorators.ticket_price"
          ></a-input-number>
        </st-form-item>
        <st-form-item v-show="ticketType === 2" label="价格" required>
          <span>免费</span>
        </st-form-item>
        <st-form-item label="票数" required>
          <a-input-number
            min="1"
            v-decorator="decorators.name"
          ></a-input-number>
        </st-form-item>
        <st-form-item label="购买用户" required>
          <a-select></a-select>
        </st-form-item>
        <st-form-item label="购买限制" required>
          <span>单次购买，最少</span>
          <a-input-number
            min="0"
            v-decorator="decorators.name"
          ></a-input-number>
          <span>份，</span>
          <span>最多</span>
          <a-input-number
            min="0"
            v-decorator="decorators.name"
          ></a-input-number>
          <span>份</span>
        </st-form-item>
        <st-form-item
          class="form-bulk"
          v-show="ticketType === 1"
          label="团购优惠"
          required
        >
          <a-radio-group v-model="isBulk" :defaultValue="1">
            <a-radio :value="1">开启</a-radio>
            <a-radio :value="2">关闭</a-radio>
          </a-radio-group>
          <div v-if="isBulk === 1" class="popover">
            <div class="arrow"></div>
            <span>单次购买超过</span>
            <a-input-number class="input" min="0"></a-input-number>
            <span>张</span>
            <span>每张原价减</span>
            <a-input-number class="input" min="0"></a-input-number>
            <span>元</span>
          </div>
        </st-form-item>
        <st-form-item label="售卖时间">
          <a-radio-group :style="radioStyle" :defaultValue="1">
            <a-radio :value="1">指定时间</a-radio>
            <a-range-picker></a-range-picker>
            <a-radio :value="2">活动结束前均可售卖</a-radio>
          </a-radio-group>
        </st-form-item>
        <st-form-item label="备注说明">
          <st-textarea></st-textarea>
        </st-form-item>
      </st-form>
    </div>
    <template slot="footer">
      <st-button @click="show = false">取消</st-button>
      <st-button @click="onSubmit" type="primary">
        确定
      </st-button>
    </template>
  </st-modal>
</template>
<script>
import { ruleOptions } from './add-ticket.config'
import { PatternService } from '@/services/pattern.service'
export default {
  name: 'ModalAddTicket',
  bem: {
    bModal: 'modal-marketing-add-ticket'
  },
  serviceInject() {
    return {
      pattern: PatternService
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
      ticketType: 1,
      isBulk: 1,
      radioStyle: {
        display: 'block'
      }
    }
  },
  props: {
    modalTitle: {
      type: String,
      default: '票种信息设置'
    }
  },
  computed: {
    freeTicket() {
      return this.ticketType === 2
    }
  },
  methods: {
    onSubmit() {
      this.show = false
      const obj = {
        ticket_name: '早鸟票',
        ticket_price: 80,
        ticket_total_num: 80,
        crowd_name: 'vip'
      }
      this.$emit('submit', obj)
    },
    onChangeGetTicketType(e) {
      this.ticketType = e.target.value
      if (this.freeTicket) {
        this.form.setFieldsValue({ ticket_price: 0 })
      }
    }
  }
}
</script>
