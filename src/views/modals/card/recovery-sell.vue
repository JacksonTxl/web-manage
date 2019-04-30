<template>
  <a-modal
    class="modal-card-recovery-sell"
    :title="flag ?'储值卡恢复售卖':'会员卡恢复售卖'"
    @ok="save"
    v-model="show"
    :footer="null"
  >
    <section>
      <div class="modal-card-recovery-sell-tips">
        <a-icon class="icon" type="exclamation-circle"/>
        注：仅恢复{{flag ?'储值卡':'会员卡'}}为可售卖状态，该{{flag ?'储值卡':'会员卡'}}需要重新上架至门店。
      </div>
      <div class="modal-card-recovery-sell-type-box">
        <span class="modal-card-recovery-sell-type" v-if="a.card_type">{{a.card_type.name}}</span>
        {{a.card_name}}
      </div>
      <div class="supporting-sales-time-box">
        <div class="supporting-sales-time-title">支持售卖时间</div>
        <div class="supporting-sales-time">
          <a-range-picker
            @change="onChange"
            :disabledDate="disabledDate"
            :defaultValue="[moment(times[0], dateFormat), moment(times[1], dateFormat)]"
          />

          <span class="supporting-sales-time-tips" v-if="salesTimeTips">支持售卖时间已过，请重新设置</span>
        </div>
      </div>
    </section>
    <section>
      <footer class="footer">
        <a-button class="cancel">取消</a-button>
        <a-button type="danger" v-if="salesTimeTips" disabled>恢复售卖</a-button>
        <a-popconfirm title="确认停售该会员卡?" @confirm="onDelete(a)" v-else>
          <a-button type="danger">恢复售卖</a-button>
        </a-popconfirm>
      </footer>
    </section>
  </a-modal>
</template>
<script>
import moment from 'moment'
import { RecoverySellService } from './recovery-sell.service'
import { clone } from '../../../operators/clone'
export default {
  serviceInject() {
    return {
      aService: RecoverySellService
    }
  },
  name: 'recoverySell',
  props: {
    a: {
      type: Object
    },
    time: {
      type: Object
    },
    flag: {
      type: Boolean
    }
  },
  data() {
    return {
      show: false,
      salesTimeTips: false,
      form: this.$form.createForm(this),
      dateFormat: 'YYYY-MM-DD',
      times: []
    }
  },
  created() {
    this.salesTimeTips =
      new Date(this.time.current_time) > new Date(this.a.end_time)
    this.times = [this.a.start_time, this.a.end_time]
  },
  methods: {
    moment,
    save(e) {
      e.preventDefault()
    },
    onChange(date, dateString) {
      let self = this
      this.times = dateString
      self.salesTimeTips = false
      console.log(date, dateString)
    },
    disabledDate(current) {
      return current && current < new Date(this.time.current_time) - 8.64e7
    },
    onDelete(a) {
      let self = this

      let data = {
        card_id: self.a.id,
        start_time: self.times[0],
        end_time: self.times[1]
      }
      if (self.flag) {
        self.aService.setCardsDepositRestartSell(data).subscribe(state => {
          self.show = false
          self.$emit('done', true)
        })
      } else {
        self.aService.setListInfo(data).subscribe(state => {
          self.show = false
          self.$emit('done', true)
        })
      }
    }
  }
}
</script>
