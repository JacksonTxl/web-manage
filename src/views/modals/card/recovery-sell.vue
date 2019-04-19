<template>
  <a-modal
    class="modal-card-recovery-sell"
    title="会员卡恢复售卖"
    @ok="save"
    v-model="show"
    :footer="null"
  >
    <section>
      <div class="modal-card-recovery-sell-tips">
        <a-icon class="icon" type="exclamation-circle"/>注：仅恢复会员卡为可售卖状态，该会员卡需要重新上架至门店。
      </div>
      <div class="modal-card-recovery-sell-type-box">
        <span class="modal-card-recovery-sell-type">{{a.card_type.name}}</span>
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
        <a-popconfirm title="确认停售该会员卡?" @confirm="onDelete(a)">
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
    this.salesTimeTips = new Date(this.time.current_time) > new Date(this.a.end_time)
    this.times = [this.a.start_time, this.a.end_time]
  },
  methods: {
    moment,
    save(e) {
      e.preventDefault()
    },
    onChange(date, dateString) {
      this.times = dateString
      console.log(date, dateString)
    },
    disabledDate(current) {
      return current && current < new Date(this.time.current_time) - 8.64e7
    },
    onDelete(a) {
      let self = this
      self.show = false
      let data = {
        card_id: self.a.id,
        start_time: self.times[0],
        end_time: self.times[1]
      }
      self.salesTimeTips = fasle
      self.aService.setListInfo(data).subscribe(state => {
        console.log('done', state)
        self.$emit('done', true)
      })
    }
  }
}
</script>
