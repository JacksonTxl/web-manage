<template>
  <st-modal
    title="通知设置"
    :class="b()"
    v-model="show"
    width="728px"
    :footer="null"
  >
    系统公告详情
  </st-modal>
</template>

<script>
export default {
  name: 'ModalNoticeDetail',
  bem: {
    b: 'modal-notice-detail'
  },
  data() {
    return {
      show: false,
      notifyConfig: {}
    }
  }
}
</script>
