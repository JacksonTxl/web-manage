<template>
  <div>
    <st-form :form="form">
      <st-form-item>
        <a-input v-decorator="decorators.cardData.user_name"></a-input>
      </st-form-item>
    </st-form>
  </div>
</template>

<script>
import { ruleOptions } from './llf.config'
export default {
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)

    return {
      a: 1,
      form,
      decorators
    }
  },
  methods: {
    onConfirm() {}
  }
}
</script>
