<template>
  <div>
    <st-form :form="form">
      <st-form-item label="测试">
        {{decorators.name}}
        <a-input v-decorator="decorators.name" autocomplete="off"></a-input>
      </st-form-item>
      <st-form-item label="age" style="margin-top:600px">
        <a-input v-decorator="decorators.age" autocomplete="off"></a-input>
      </st-form-item>
      {{decorators.age}}
      <st-form-item>
        <st-button @click="onSubmit">123</st-button>
      </st-form-item>
    </st-form>
  </div>
</template>

<script>
export default {
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators({
      name: {
        rules: [{ validator: this.nameValidator }],
        initialValue: '123'
      },
      age: {
        rules: [{ validator: this.ageValidator }],
        initialValue: '6'
      }
    })

    return {
      form,
      decorators
    }
  },
  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        '.'.join(',')
        console.log(values)
      })
    },
    nameValidator(rule, value, values) {
      if (!value) {
        return '请输入名称'
      }
    },
    ageValidator(rule, value, values) {
      return Promise.resolve()
    }
  }
}
</script>
