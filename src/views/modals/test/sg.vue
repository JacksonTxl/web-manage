<template>
  <st-modal title="modal-sg" v-model="show" @ok="onOk">
    this is test modal
    {{ a }}

    <st-form :form="form">
      <st-form-item>
        <a-input v-decorator="decorators.name" placeholder="name"></a-input>
      </st-form-item>
    </st-form>
  </st-modal>
</template>

<script>
import { UserService } from '@/services/user.service'
import { SgService } from './sg.service'

export default {
  serviceProviders() {
    return [SgService]
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators({
      name: {
        rules: [{ required: true, message: '必填' }]
      }
    })
    return {
      form,
      decorators,
      show: false
    }
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
  mounted() {
    this.form.setFieldsValue({
      name: '333'
    })
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
