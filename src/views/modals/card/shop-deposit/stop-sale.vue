<template>
    <st-modal
    title="会员卡停售"
    v-model="show"
    wrapClassName="modal-card-shop-stop-sale"
    width="484px">
        <div :class="stopSale()">
            <div :class="stopSale('warn-text')" class="mg-b24">
                <st-icon color="#1890FF" style="line-height:22px;flex:none;margin-top:4px;" size="14px" type="help"/>
                <p>
                    注：停止售卖会员卡，将自动下架在门店售卖的本储值卡；已购买本储值卡的会员仍旧享有该会员卡权益。
                </p>
            </div>
            <div :class="stopSale('card-name')" class="mg-b24">
                <st-tag type="deposit-card" style="margin-right:8px;"/>
                <span>{{cardName}}</span>
            </div>
            <div :class="stopSale('num')" class="mg-b24">
                <p class="mg-b16">
                    <span class="label ">当前上架门店（家）：</span>
                    <span class="value">{{info.shelf_shop_num}}</span>
                    <span class="description">（不含已下架门店）</span>
                </p>
                <p class="mg-b0">
                    <span class="label ">当前有效卡数（张）：</span>
                    <span class="value">{{info.valid_card_num}}</span>
                    <span class="description">（不含已过期卡）</span>
                </p>
            </div>
            <st-form :form='form' :class="stopSale('form')" labelGutter="0">
                <st-form-item label="停售原因" labelWidth="68px" class="mg-b0" required></st-form-item>
                <st-form-item label=" " labelWidth="0px">
                    <st-textarea :maxlength="300" @change="onReasonChange" v-model="reason" placeholder="请输入内容"/>
                </st-form-item>
            </st-form>
        </div>
        <footer slot="footer" :class="stopSale('footer')">
            <a-button  @click="show=false">取消</a-button>
            <a-button type="danger" :disabled="reasonIsNone" v-if="reasonIsNone">确认停售</a-button>
            <a-popconfirm
            v-else
            @confirm="onStop"
            title="确认停售该储值卡"
            >
                <a-button type="danger" :loading="loading.setStopSale">确认停售</a-button>
            </a-popconfirm>
        </footer>
    </st-modal>
</template>
<script>
import { StopSaleService } from './stop-sale.service'
export default {
  name: 'ModalCardShopDepositStopSale',
  bem: {
    stopSale: 'modal-card-shop-stop-sale'
  },
  serviceInject() {
    return {
      stopSaleService: StopSaleService
    }
  },
  rxState() {
    return {
      loading: this.stopSaleService.loading$,
      info: this.stopSaleService.info$
    }
  },
  props: ['id', 'cardName'],
  data() {
    return {
      form: this.$form.createForm(this),
      show: false,
      reason: '',
      // 停售原因是否有填写
      reasonIsNone: true
    }
  },
  methods: {
    onReasonChange(data) {
      this.reasonIsNone = data.target.value.trim() === ''
    },
    onStop() {
      this.stopSaleService.setStopSale({
        reason: this.reason
      }, this.id).subscribe(() => {
        this.show = false
        this.$emit('success')
      })
    }
  },
  mounted() {
    this.stopSaleService.getStopSaleInfo(this.id).subscribe()
  }
}
</script>
