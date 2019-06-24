<template>
  <a-modal
    class="modal-card-halt-the-sales"
    :title="`${cardTypeText}停售`"
    @ok="save"
    v-model="show"
    :footer="null"
  >
    <section>
      <div class="modal-card-halt-the-sales-tips">
        <a-icon class="icon" type="exclamation-circle"/>
        注：停止售卖，将自动下架在门店售卖的本{{cardTypeText}}；已购买{{cardTypeText}}的会员仍然享有该{{cardTypeText}}权益。
      </div>
      <div class="modal-card-halt-the-sales-type-box">
        <span class="modal-card-halt-the-sales-type">期限卡</span>
        {{cardTypeText}}名称
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
          :title="`确认停售该${cardTypeText}`"
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
      haltTheSalesService: HaltTheSalesService
    }
  },
  name: 'ModalHaltTheSales',
  props: ['id', 'cardType', 'shopNum', 'cardNum'],
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
    this.getListInfo({ card_id: this.id })
  },
  methods: {
    blurTextarea() {
      this.showHide = this.textareaInfo.length === 0
    },
    getListInfo(data) {
      let self = this
      if (self.time) {
        self.info.shelf_shop_num = self.time[0]
        self.info.valid_card_num = self.time[1]
      } else {
        this.haltTheSalesService.getListInfo(data).subscribe(state => {
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
        card_id: self.id,
        reason: self.textareaInfo
      }
      if (self.flag) {
        self.haltTheSalesService.setCardsDepositStopSell(data).subscribe(state => {
          self.show = false
          self.$emit('done', true)
        })
      } else {
        self.haltTheSalesService.setListInfo(data).subscribe(state => {
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
