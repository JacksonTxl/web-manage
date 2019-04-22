<template>
  <a-modal title="modal-sg" v-model="show" @ok="onOk">this is test modal</a-modal>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    onClick() {
      this.$emit('click')
    },
    onOk() {
      this.$emit('ok')
      this.show = false
    }
  }
}
</script>
