<template>
  <st-modal title="推广" width="500px" v-model="show">
    推广活动报名
  </st-modal>
</template>
<script>
export default {
  name: 'ModalAddTicket',
  bem: {
    bModal: 'modal-marketing-add-ticket'
  },
  data() {
    return {
      show: false
    }
  }
}
</script>
