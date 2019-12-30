<template>
  <st-modal
    :class="b()"
    v-model="show"
    @ok="onOk"
    @cancel="onCancel"
    width="728px"
  >
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
      // this.show = false
      // this.$emit('success')
      console.log(info)
    }
  }
}
</script>
