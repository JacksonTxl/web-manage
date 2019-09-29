<template>
  <st-form :form="form">
    <st-form-item label="活动标题" required>
      <a-input v-decorator="decorators.name"></a-input>
    </st-form-item>
    <st-form-item label="活动时间" required>
      <a-input v-decorator="decorators.count"></a-input>
    </st-form-item>
    <st-form-item label="活动地点" required>
      <a-input v-decorator="decorators.address"></a-input>
    </st-form-item>
    <!-- <st-form-item label="活动海报" required>
      <a-input></a-input>
    </st-form-item>
    <st-form-item label="活动人数" required>
      <a-input></a-input>
    </st-form-item>
    <st-form-item label="活动详情" required>
      <a-input></a-input>
    </st-form-item> -->
  </st-form>
</template>

<script>
import { ruleOptions } from './form.config'
import { PatternService } from '@/services/pattern.service'
export default {
  name: 'Step1Form',
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
  }
}
</script>
