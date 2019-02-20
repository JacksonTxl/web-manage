<template>
  <div>
    <h1>Login Page</h1>

    <a-form :form='form'
      @submit.prevent="handleSubmit">
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
          placeholder="Select a option and change input text above"
          @change="handleSelectChange">
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
import { loginBusiness } from './login.business'
// export default {
//   data() {
//     return {
//       mobile: '',
//       captcha: '',
//       form: this.$form.createForm(this)
//     }
//   },
//   beforeRouteEnter: loginBusiness.beforeRouteEnter.bind(loginBusiness),
//   subscriptions() {
//     return {}
//   },
//   mounted() {

//   }
// }

// @Component({
//   beforeRouteEnter: loginBusiness.beforeRouteEnter.bind(loginBusiness),
//   subscriptions() {
//     return {}
//   }
// })
// export default class LayoutLogin extends Vue {
//   mobile = ''
//   captcha = ''
//   password = ''
//   step = 1
//   form!: any
//   beforeCreate() {
//     this.form = this.$form.createForm(this)
//   }
//   created() {
//     console.log(this)
//   }
//   handleSubmit() {
//     this.form.validateFields((err: any, values: any) => {
//       if (!err) {
//         console.log('Received values of form: ', values)
//       }
//     })
//   }
//   handleSelectChange(value: string) {
//     console.log(value)
//     this.form.setFieldsValue({
//       note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
//     })
//   }
//   onGetCaptcha() {
//     if (!this.mobile) {
//       return
//     }
//     loginBusiness
//       .sendSmsCaptcha({
//         mobile: this.mobile
//       })
//       .subscribe(() => {
//         this.step = 2
//       })
//   }
//   onLogin() {
//     loginBusiness
//       .signIn({
//         mobile: this.mobile,
//         captcha: this.captcha,
//         password: this.password
//       })
//       .subscribe(() => {
//         this.step = 3
//       })
//   }
// }
</script>
