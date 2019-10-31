<template>
  <st-modal :title="modalTitle" v-model="show" width="568px">
    <div class="modal-marketing-add-ticket">
      <st-form :form="form">
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
          <a-input
            :disabled="isDisabled"
            v-decorator="decorators.ticket_name"
            placeholder="请输入票种名称"
          ></a-input>
        </st-form-item>
        <st-form-item v-show="ticketType === 1" label="价格" required>
          <st-input-number
            :disabled="isDisabled"
            class="input"
            :float="true"
            :min="0.1"
            :max="10000"
            v-decorator="decorators.ticket_price"
          ></st-input-number>
          <span class="mg-l4">元</span>
        </st-form-item>
        <st-form-item v-show="ticketType === 2" label="价格" required>
          <span>免费</span>
        </st-form-item>
        <st-form-item label="票数" required>
          <a-input-number
            class="input"
            :min="1"
            :max="9999"
            :step="1"
            :precision="0"
            v-decorator="decorators.ticket_total_num"
          ></a-input-number>
          <span class="mg-l4">张</span>
        </st-form-item>
        <st-form-item label="购买用户" required>
          <a-select
            style="width:100px"
            :disabled="isDisabled"
            v-decorator="decorators.crowd_id"
            :options="crowdIdOptions"
          ></a-select>
        </st-form-item>
        <a-row>
          <a-col :span="16">
            <st-form-item label="购买限制" required>
              <span>单次购买，最少</span>
              <a-input-number
                class="input mg-l4 mg-r4"
                :min="0"
                :max="99999"
                :disabled="isDisabled"
                :step="1"
                :precision="0"
                v-decorator="decorators.buy_limit_min"
              ></a-input-number>
              <span>份，</span>
            </st-form-item>
          </a-col>
          <a-col :span="8">
            <st-form-item class="st-form-item__row" labelWidth="0">
              <span>最多</span>
              <a-input-number
                class="input mg-l4 mg-r4"
                :min="0"
                :max="99999"
                :disabled="isDisabled"
                :step="1"
                :precision="0"
                v-decorator="decorators.buy_limit_max"
              ></a-input-number>
              <span>份</span>
            </st-form-item>
          </a-col>
        </a-row>

        <st-form-item
          class="mg-b0"
          v-show="ticketType === 1"
          label="团购优惠"
          required
        >
          <a-radio-group
            :disabled="isDisabled"
            :defaultValue="0"
            v-model="isBulk"
          >
            <a-radio :value="1">开启</a-radio>
            <a-radio :value="0">关闭</a-radio>
          </a-radio-group>
        </st-form-item>
        <div class="form-bulk" v-show="isBulk === 1">
          <st-pop-container offset="22px" class="mg-t8">
            <a-row>
              <a-col :span="11">
                <st-form-item class="st-form-item__row mg-b0" labelWidth="0">
                  <span>单次购买超过</span>
                  <a-input-number
                    v-decorator="decorators.group_buy_min"
                    class="input mg-l4 mg-r4"
                    :max="99999"
                    :disabled="isDisabled"
                    :step="1"
                    :precision="0"
                    :min="0"
                  ></a-input-number>
                  <span>张,</span>
                </st-form-item>
              </a-col>
              <a-col :span="13">
                <st-form-item class="st-form-item__row mg-b0" labelWidth="0">
                  <span class="mg-l4">每张原价减</span>
                  <st-input-number
                    v-decorator="decorators.reduce_price"
                    class="input mg-l4 mg-r4"
                    :disabled="isDisabled"
                    :float="true"
                    :min="0"
                    :max="10000"
                  ></st-input-number>
                  <span>元</span>
                </st-form-item>
              </a-col>
            </a-row>
          </st-pop-container>
        </div>

        <st-form-item
          label="售卖时间"
          :class="{ 'mg-b0': isShowSaleDatePicker }"
          required
        >
          <a-radio-group
            :style="radioStyle"
            @change="getCurSaleTimeType"
            :disabled="isDisabled"
            v-decorator="decorators.buy_time_limit"
          >
            <a-radio :value="1">指定时间</a-radio>
            <a-radio :value="0">活动结束前均可售卖</a-radio>
          </a-radio-group>
        </st-form-item>
        <st-form-item
          v-show="isShowSaleDatePicker || form.getFieldValue('buy_time_limit')"
          labelFix
        >
          <a-range-picker
            :disabledDate="disabledDate"
            class="mg-t8"
            :disabled="isDisabled"
            :showTime="{ format: 'HH:mm' }"
            format="YYYY-MM-DD HH:mm"
            v-decorator="decorators.buy_time"
          ></a-range-picker>
        </st-form-item>
        <st-form-item class="mg-b0" label="备注说明">
          <st-textarea
            :maxlength="100"
            :autosize="{ minRows: 2, maxRows: 6 }"
            v-decorator="decorators.ticket_remark"
            :disabled="isDisabled"
            placeholder="请输入备注说明"
          ></st-textarea>
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
import { MessageService } from '@/services/message.service'
import moment from 'moment'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'ModalAddTicket',
  bem: {
    bModal: 'modal-marketing-add-ticket'
  },
  serviceInject() {
    return {
      pattern: PatternService,
      messageService: MessageService
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
      },
      isShowSaleDatePicker: true
    }
  },
  props: {
    modalTitle: {
      type: String,
      default: '票种信息设置'
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    stepForm: {
      type: Object,
      default: () => {}
    },
    formData: {
      type: Object,
      default: () => {}
    },
    index: Number,
    isSetting: {
      type: Boolean,
      default: false
    },
    ticket: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    freeTicket() {
      return this.ticketType === 2
    },
    isDisabled() {
      return !!(
        this.ticket &&
        this.ticket.ticket_id &&
        this.formData.activity_status
      )
    }
  },
  mounted() {
    this.form.setFieldsValue({ crowd_id: 0 })
    if (!this.ticket) return
    this.$nextTick().then(() => {
      const {
        ticket_name,
        ticket_price,
        ticket_total_num,
        buy_limit_min,
        buy_limit_max,
        group_buy_min,
        buy_time_limit,
        is_group_buy,
        buy_start_time,
        buy_end_time,
        ticket_remark
      } = this.ticket
      this.ticketType = ticket_price > 0 ? 1 : 2
      const buy_time = [this.moment(buy_start_time), this.moment(buy_end_time)]
      this.isShowSaleDatePicker = buy_time_limit
      this.form.setFieldsValue({
        ticket_name,
        ticket_price,
        ticket_total_num,
        buy_limit_min,
        buy_limit_max,
        group_buy_min,
        buy_time_limit,
        buy_time,
        ticket_remark
      })
      this.isBulk = is_group_buy
    })
  },
  methods: {
    moment,
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
      let buy_start_time = ''
      let buy_end_time = ''
      if (buy_time_limit === 1 && buy_time) {
        buy_start_time = buy_time[0].format('YYYY-MM-DD HH:mm')
        buy_end_time = buy_time[1].format('YYYY-MM-DD HH:mm')
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
      return form
    },
    getShowData(values) {
      const {
        ticket_name,
        ticket_price,
        crowd_id,
        ticket_total_num,
        group_buy_min,
        buy_limit_min,
        buy_limit_max,
        reduce_price,
        buy_time_limit,
        ticket_remark,
        buy_time
      } = values
      let buy_start_time = ''
      let buy_end_time = ''
      if (buy_time_limit === 1) {
        buy_start_time = buy_time[0].format('YYYY-MM-DD HH:mm')
        buy_end_time = buy_time[1].format('YYYY-MM-DD HH:mm')
      } else {
        buy_start_time = this.stepForm.start_time
        buy_end_time = this.stepForm.end_time
      }
      return {
        ticket_name,
        ticket_price,
        ticket_total_num,
        crowd_id,
        group_buy_min,
        buy_limit_min,
        buy_limit_max,
        ticket_remark,
        buy_time_limit,
        is_group_buy: this.isBulk,
        buy_start_time,
        buy_end_time,
        reduce_price
      }
    },
    onSubmit() {
      this.form.validate().then(values => {
        if (values.buy_time_limit === 1 && !values.buy_time) {
          this.messageService.success({
            content: '请选择时间'
          })
          return
        }
        this.show = false
        // 返回表格显示数据
        this.$emit('show', {
          ticket: this.getShowData(values),
          index: this.index
        })
        // 提交给后台字段
        this.$emit('submit', {
          ticket: this.formatData(values),
          index: this.index
        })
      })
    },
    onChangeGetTicketType(e) {
      this.ticketType = e.target.value
      if (this.freeTicket) {
        this.form.setFieldsValue({ ticket_price: 0, is_group_buy: 0 })
        this.isBulk = 0
      }
    },
    getCurSaleTimeType(e) {
      this.isShowSaleDatePicker = e.target.value
    },
    disabledDate(current) {
      return (
        current && current.format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')
      )
    }
  }
}
</script>
