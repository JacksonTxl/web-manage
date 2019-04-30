<template>
  <a-modal
    class="modal-card-halt-the-sales"
    :title="flag? '储值卡停售':'会员卡停售'"
    @ok="save"
    v-model="show"
    :footer="null"
  >
    <section>
      <div class="modal-card-halt-the-sales-tips">
        <a-icon class="icon" type="exclamation-circle"/>
        注：停止售卖，将自动下架在门店售卖的本{{flag? '储值卡':'会员卡'}}；已购买{{flag? '储值卡':'会员卡'}}的会员仍然享有该{{flag? '储值卡':'会员卡'}}权益。
      </div>
      <div class="modal-card-halt-the-sales-type-box">
        <span class="modal-card-halt-the-sales-type">期限卡</span>
        {{flag? '储值卡':'会员卡'}}名称
      </div>
      <div class="modal-card-halt-the-sales-info-box">
        <span class>当前上架门店（家）：{{info.shelf_shop_num}}</span>
        <span class="modal-card-halt-the-sales-notes">(不含已下架门店)</span>
      </div>
      <div class="modal-card-halt-the-sales-info-box">
        <span>当前有效卡数（张）：{{info.valid_card_num}}</span>
        <span class="modal-card-halt-the-sales-notes">(不含已过期卡)</span>
      </div>
      <div class="modal-card-halt-the-sales-stop-reason">
        <div class="ant-form-item-required stop-info">停售原因</div>
        <a-textarea
          v-focus
          placeholder="请输入停售原因"
          maxlength="300"
          :rows="4"
          @blur="blurTextarea"
          v-model="textareaInfo"
        />
        <div v-if="showHide" style="color:#f5222d">请填写停售原因！</div>
      </div>
    </section>
    <section>
      <footer class="footer">
        <a-button class="cancel" @click="show=false">取消</a-button>
        <a-popconfirm
          :title="flag?'确认停售该储值卡?':'确认停售该会员卡?'"
          @confirm="onDelete(a)"
          v-if="textareaInfo.length > 0"
        >
          <a-button type="danger">确认停售</a-button>
        </a-popconfirm>
        <a-button type="danger" disabled v-else>确认停售</a-button>
      </footer>
    </section>
  </a-modal>
</template>
<script>
import { HaltTheSalesService } from './halt-the-sales.service'
export default {
  serviceInject() {
    return {
      aService: HaltTheSalesService
    }
  },
  name: 'haltTheSales',
  props: {
    a: {
      type: Number
    },
    flag: {
      type: Boolean
    },
    time: {
      type: Array
    }
  },
  data() {
    return {
      show: false,
      showHide: false,
      textareaInfo: '',
      form: this.$form.createForm(this),
      info: {
        shelf_shop: 0,
        valid_card: 0
      }
    }
  },
  created() {
    let self = this
    this.getListInfo({ card_id: self.a })
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    }
  },
  methods: {
    blurTextarea() {
      if (this.textareaInfo.length === 0) {
        this.showHide = true
      } else {
        this.showHide = false
      }
    },
    getListInfo(data) {
      let self = this
      if (self.time) {
        self.info.shelf_shop_num = self.time[0]
        self.info.valid_card_num = self.time[1]
      } else {
        this.aService.getListInfo(data).subscribe(state => {
          console.log(state)
          self.info = state.info
        })
      }
    },
    save(e) {
      e.preventDefault()
    },
    onDelete(a) {
      let self = this
      let data = {
        card_id: self.a,
        reason: self.textareaInfo
      }
      console.log('flag', self.flag)
      if (self.flag) {
        self.aService.setCardsDepositStopSell(data).subscribe(state => {
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
  },
  watch: {
    textareaInfo() {
      this.showHide = !(this.textareaInfo.length > 0)
    }
  }
}
</script>
