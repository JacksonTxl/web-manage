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
          <a-input v-decorator="decorators.ticket_name"></a-input>
        </st-form-item>
        <st-form-item v-show="ticketType === 1" label="价格" required>
          <a-input-number
            :min="0"
            v-decorator="decorators.ticket_price"
          ></a-input-number>
        </st-form-item>
        <st-form-item v-show="ticketType === 2" label="价格" required>
          <span>免费</span>
        </st-form-item>
        <st-form-item label="票数" required>
          <a-input-number
            :min="1"
            v-decorator="decorators.ticket_total_num"
          ></a-input-number>
        </st-form-item>
        <st-form-item label="购买用户" required>
          <a-select
            v-decorator="decorators.crowd_id"
            :options="crowdIdOptions"
          ></a-select>
        </st-form-item>
        <st-form-item label="购买限制" required>
          <span>单次购买，最少</span>
          <a-input-number
            :min="0"
            v-decorator="decorators.buy_limit_min"
          ></a-input-number>
          <span>份，</span>
          <span>最多</span>
          <a-input-number
            :min="0"
            v-decorator="decorators.buy_limit_max"
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
            <a-input-number
              v-decorator="decorators.group_buy_min"
              class="input"
              :min="0"
            ></a-input-number>
            <span>张</span>
            <span>每张原价减</span>
            <a-input-number
              v-decorator="decorators.reduce_price"
              class="input"
              :min="0"
            ></a-input-number>
            <span>元</span>
          </div>
        </st-form-item>
        <st-form-item label="售卖时间">
          <a-radio-group
            :style="radioStyle"
            v-decorator="decorators.buy_time_limit"
          >
            <a-radio :value="1">指定时间</a-radio>
            <a-range-picker v-decorator="decorators.buy_time"></a-range-picker>
            <a-radio :value="2">活动结束前均可售卖</a-radio>
          </a-radio-group>
        </st-form-item>
        <st-form-item label="备注说明">
          <st-textarea v-decorator="decorators.ticket_remark"></st-textarea>
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
      // TODO: 用户人群暂未开启，前端静态填写 为全部用户 id 为 0
      crowdIdOptions: [{ label: '全部用户', value: 0 }],
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
  mounted() {
    this.form.setFieldsValue({ crowd_id: 0 })
  },
  methods: {
    getCrowdName(crowdId) {
      let crowdName = ''
      this.crowdIdOptions.forEach(item => {
        crowdName = item.value === crowdId ? item.label : ''
      })
      return crowdName
    },
    formatData(values) {
      const {
        ticket_name,
        ticket_price,
        crowd_id,
        ticket_total_num,
        buy_limit_min,
        buy_limit_max,
        group_buy_min,
        reduce_price,
        buy_time_limit,
        buy_time,
        ticket_remark
      } = values
      const buy_start_time = ''
      const buy_end_time = ''
      if (buy_time_limit === 2) {
        const buy_start_time = buy_time[0].format('YYYY-MM-DD HH:mm')
        const buy_end_time = buy_time[1].format('YYYY-MM-DD HH:mm')
      }
      const form = {
        ticket_name,
        ticket_price,
        crowd_id,
        ticket_total_num,
        buy_limit_min,
        buy_limit_max,
        is_group_buy: this.isBulk,
        group_buy_min,
        reduce_price,
        buy_time_limit,
        buy_start_time,
        buy_end_time,
        ticket_remark
      }
      console.log(form)
      return form
    },
    getShowData(values) {
      const {
        ticket_name,
        ticket_price,
        crowd_id,
        ticket_total_num,
        group_buy_min,
        reduce_price
      } = values
      const crowd_name = this.getCrowdName(crowd_id)
      return {
        ticket_name,
        ticket_price,
        ticket_total_num,
        crowd_name,
        group_buy_min,
        reduce_price
      }
    },
    onSubmit() {
      this.form.validate().then(values => {
        this.show = false
        // 返回表格显示数据
        this.$emit('show', this.getShowData(values))
        // 提交给后台字段
        this.$emit('submit', this.formatData(values))
      })
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
