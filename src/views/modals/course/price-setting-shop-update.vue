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
import { ListService } from '../../pages/shop/product/course/manage/personal/list.service'
import SetPrice from '@/views/fragments/course/set-price'
export default {
  name: 'PriceSettingShopUpdate',
  serviceInject() {
    return {
      listService: ListService
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
      this.listService.settingCoursePrice({ id: this.id, params: { price_gradient: this.priceGradient } }).subscribe(res => {
        this.show = false
        this.$router.push({ force: true })
      })
    },
    onPriceGradientChange(val) {
      this.priceGradient = val
    }
  }
}
</script>
