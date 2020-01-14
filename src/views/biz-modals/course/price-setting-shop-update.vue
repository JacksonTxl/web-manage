<template>
  <st-modal
    class="modal-price-setting-shop-update"
    :title="'设置课程定价'"
    @ok="onOk"
    okText="完成"
    width="878px"
    v-model="show"
  >
    <set-price :value="priceList" @change="onPriceGradientChange"></set-price>
  </st-modal>
</template>

<script>
import { ListService } from '../../pages/shop/product/course/manage/personal/list.service'
import SetPrice from '@/views/fragments/course/set-price'
import { MessageService } from '@/services/message.service'
export default {
  name: 'PriceSettingShopUpdate',
  serviceInject() {
    return {
      listService: ListService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      priceList: this.listService.priceGradient$
    }
  },
  props: {
    id: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      show: false,
      priceGradient: []
    }
  },
  components: {
    SetPrice
  },
  methods: {
    onOk() {
      let validFlag = false
      this.priceGradient.forEach(gradient => {
        if (gradient.prices.length <= 0) {
          validFlag = true
          return
        }
        const arr = gradient.prices.filter(
          item =>
            !item.transfer_num ||
            !item.min_sale ||
            (!item.sell_price && item.sell_price != 0)
        )
        if (arr.length > 0) {
          validFlag = true
          return
        }
      })
      if (validFlag) {
        this.messageService.warn({ content: '请输入正确的售卖定价信息' })
        return
      }
      this.listService
        .settingCoursePrice({
          id: this.id,
          params: { price_gradient: this.priceGradient }
        })
        .subscribe(res => {
          this.show = false
          this.$router.reload()
        })
    },
    onPriceGradientChange(val) {
      this.priceGradient = val
    }
  }
}
</script>
