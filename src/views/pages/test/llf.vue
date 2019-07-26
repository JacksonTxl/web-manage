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
    return {
      form: this.$stForm.create(),
      decorators: this.$stForm.createDecorators({
        name: {
          validator: this.nameValidator
        },
        age: {
          validator: this.ageValidator
        }
      })
    }
  },

  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        console.log(values)
      })
    },
    nameValidator(rule, value, values) {
      if (!value) {
        return '请输入名称'
      }
      console.log(rule, value, values)
    },
    ageValidator(rule, value, values) {
      if (!value) {
        return '请输入年龄'
      }
      console.log(rule, value, values)
    }
  }
}
</script>
