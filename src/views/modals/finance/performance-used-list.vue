<template>
  <a-modal title="查看应用员工" v-model="show" @ok="handleSubmit"></a-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
export default {
  serviceInject() {
    return {
      //   service: AddTemplateService,
      message: MessageService
    }
  },
  props: {
    id: Number
  },
  data() {
    return {
      //   form: this.$form.createForm(this),
      show: false
    }
  },
  methods: {

    handleSubmit(e) {}
  }
}
</script>
