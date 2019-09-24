<template>
  <st-alert class="biz-card-form-banner" v-if="isShelf">
    {{
      shelfNumber
    }}家门店售卖中，若需修改会员卡全部信息，请先统一下架该卡后进行编辑
  </st-alert>
</template>

<script>
// 表单上的提示信息
export default {
  props: {
    // 门店上架会员卡数量
    shelfNumber: {
      type: Number,
      default: 0,
      required: true
    }
  },
  computed: {
    isShelf() {
      return this.shelfNumber > 0
    }
  }
}
</script>
