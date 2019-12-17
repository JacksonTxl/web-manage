<template>
  <st-modal
    title="通知设置"
    :class="b()"
    v-model="show"
    width="370px"
    :footer="null"
  >
    <div :class="b('item')">
      <span>硬件入场通知弹窗</span>
      <st-switch v-model="notifyConfig.is_member_mobile"></st-switch>
    </div>
    <div :class="b('item')" class="mg-t24">
      <span>任务通知弹窗</span>
      <st-switch v-model="notifyConfig.is_member_mobile"></st-switch>
    </div>
  </st-modal>
</template>

<script>
export default {
  name: 'ModalNotifyConfig',
  bem: {
    b: 'modal-notify-config'
  },
  data() {
    return {
      show: false,
      notifyConfig: {}
    }
  }
}
</script>
