<template>
  <div>
    <h1>Login Page</h1>

    <a-form :form='form'>
      <a-form-item label='Note'
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }">
        <a-input v-decorator="[
          'note',
          {rules: [{ required: true, message: '请输入note' }]}
        ]" />
      </a-form-item>
      <a-form-item label="Gender"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }">
        <a-select v-decorator="[
          'gender',
          {rules: [{ required: true, message: 'Please select your gender!' }]}
        ]"
          placeholder="Select a option and change input text above">
          <a-select-option value="male">
            male
          </a-select-option>
          <a-select-option value="female">
            female
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary"
          html-type="submit">
          Submit
        </a-button>
      </a-form-item>

    </a-form>

  </div>
</template>

<script lang='ts'>
import { loginService } from './login.service'

export default {
  data() {
    return {
      form: this.$form.createForm(this)
    }
  }
}
</script>
