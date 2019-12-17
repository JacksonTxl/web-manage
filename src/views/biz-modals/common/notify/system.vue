<template>
  <st-modal :class="b()" v-model="show" width="728px" :footer="null">
    系统公告
  </st-modal>
</template>

<script>
export default {
  name: 'ModalNotice',
  bem: {
    b: 'modal-notice'
  },
  data() {
    return {
      show: false,
      notifyConfig: {}
    }
  }
}
</script>
