<template>
  <st-modal
    title="重置"
    size="small"
    v-model="show"
    @ok="save"
    @cancel="cancel"
  >
    {{ text }}
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
export default {
  serviceInject() {
    return {
      messageService: MessageService
    }
  },
  data() {
    return {
      show: false
    }
  },
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  created() {},
  methods: {
    cancel() {
      this.$emit('cancel')
      this.show = false
    },
    save() {
      this.$emit('success')
      this.show = false
    }
  }
}
</script>
