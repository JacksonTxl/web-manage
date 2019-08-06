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
export default {
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators({
      'cardData.user_name': {
        rules: [{ required: true, message: 'ceshi' }]
      }
    })
    console.log(decorators.cardData.user_name)
    return {
      form,
      decorators
    }
  },
  methods: {
    onConfirm() {}
  }
}
</script>
