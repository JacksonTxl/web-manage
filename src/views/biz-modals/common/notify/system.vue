<template>
  <st-modal
    :wrapClassName="b()"
    v-model="show"
    @ok="onOk"
    @cancel="onCancel"
    @change="onCancel"
    width="640px"
    :footer="null"
  >
    <div :class="b('info')">
      fdwefeaf{{ info }}
      <st-t3>标题</st-t3>
      <div :class="b('content')">内容</div>
      <st-button type="primary" @click="onOk">我知道了</st-button>
    </div>
  </st-modal>
</template>

<script>
export default {
  name: 'ModalNoticeSystem',
  bem: {
    b: 'modal-notice-system'
  },
  data() {
    return {
      show: false
    }
  },
  props: {
    info: Object
  },
  methods: {
    onOk() {
      this.show = false
      this.$emit('success')
    },
    onCancel() {
      this.show = false
      this.$emit('success')
      console.log(info)
    }
  }
}
</script>
