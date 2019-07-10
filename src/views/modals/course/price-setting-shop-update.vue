<template>
  <st-modal
    class="modal-price-setting-shop-update"
    :title="'设置课程定价'"
    @ok="onOk"
    okText="完成"
    width="878px"
    v-model='show'>
    <set-price :value="priceList" @change="onPriceGradientChange"></set-price>
  </st-modal>
</template>

<script>
import SetPrice from '@/views/fragments/course/set-price'
export default {
  name: 'PriceSettingShopUpdate',
  props: {
    priceList: {
      type: Array,
      default: () => []
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
      // this.
    },
    onPriceGradientChange(val) {
      this.priceGradient = val
    }
  }
}
</script>
