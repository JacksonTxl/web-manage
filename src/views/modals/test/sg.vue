<template>
  <st-modal title="modal-sg" v-model="show" @ok="onOk">
    this is test modal
    {{ a }}
  </st-modal>
</template>

<script>
import { UserService } from '@/services/user.service'
import { SgService } from './sg.service'
export default {
  data() {
    return {
      show: false
    }
  },
  serviceProviders() {
    return [SgService]
  },
  serviceInject() {
    return {
      sgService: SgService
    }
  },
  rxState() {
    return {
      a: this.sgService.a$
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
