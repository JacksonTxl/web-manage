<template>
  <st-modal v-model="show" @ok="onSubmit" title="去发货" size="small">
    <st-form :form="form">
      <st-form-item label="物流公司" required>
        <a-input
          placeholder="请输入物流公司"
          v-decorator="decorators.expressCompany"
        />
      </st-form-item>
      <st-form-item label="物流单号" required>
        <a-input
          placeholder="请输入物流单号"
          v-decorator="decorators.expressNumber"
        />
      </st-form-item>
    </st-form>
  </st-modal>
</template>

<script>
import { ruleOptions } from './deliver-good.config'
import { DeliverGoodService } from './deliver-good.service'
export default {
  name: 'modalStoreDeliverGood',
  props: ['id'],
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      show: false,
      form,
      decorators
    }
  },
  serviceInject() {
    return { deliverGoodService: DeliverGoodService }
  },
  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        this.deliverGoodService
          .sendOption({
            express_company: values.expressCompany,
            express_number: values.expressNumber,
            id: this.id
          })
          .subscribe(res => {
            this.show = false
            this.$emit('success')
          })
      })
    }
  }
}
</script>
