<template>
  <add-ticket></add-ticket>
</template>

<script>
import { ruleOptions } from './form.config'
import { PatternService } from '@/services/pattern.service'
import AddTicket from './add-ticket'
export default {
  name: 'Step2Form',
  serviceInject() {
    return {
      pattern: PatternService
    }
  },
  data() {
    const that = this
    const form = this.$stForm.create({
      onValuesChange(props, values) {
        that.$emit('change', that.form.getFieldsValue())
      }
    })
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      formInfo: {},
      decorators
    }
  },
  components: {
    AddTicket
  }
}
</script>
