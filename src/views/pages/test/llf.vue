<template>
  <div>
    <st-form :form="form">
      {{ loading.init }}
      <router-link :to="{ query: { id: 1 } }">go 1</router-link>
      <router-link :to="{ query: { id: 2 } }">go 2</router-link>
      <st-form-item>
        <a-input v-decorator="decorators.cardData.user_name"></a-input>
      </st-form-item>
    </st-form>
  </div>
</template>

<script>
import { ruleOptions } from './llf.config'
import { LlfService } from './llf.service'
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
  serviceInject() {
    return {
      llf: LlfService
    }
  },
  rxState() {
    return {
      loading: this.llf.loading$
    }
  },
  methods: {
    onConfirm() {}
  }
}
</script>
