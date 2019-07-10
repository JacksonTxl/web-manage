<template>
  <st-modal
    class="modal-price-setting-shop-update"
    :title="' 查看课程定价'"
    @ok="onOk"
    okText="去编辑"
    width="878px"
    v-model='show'>
    <set-price :value="priceList"></set-price>
  </st-modal>
</template>

<script>
import SetPrice from '@/views/fragments/course/set-price'
export default {
  name: 'priceSettingShopUpdate',
  props: {
    priceList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      show: false
    }
  },
  components: {
    SetPrice
  },
  methods: {
    onOk() {
      console.log('isOk')
    }
  }
}
</script>
