<template>
  <div style="padding: 30px">
    <st-form :form="form" @submit="save">
      <st-form-item label="系统权限" required>
        <st-region-cascader v-decorator="basicInfoRuleList.usernameRule1"></st-region-cascader>
      </st-form-item>
      <st-form-item label="姓名"  required>
        <a-input v-decorator="basicInfoRuleList.usernameRule"></a-input>
      </st-form-item>
      <st-form-item  class="mg-l24" labelOffset>
          <st-button type="primary"
            ghost html-type="submit">保存</st-button>
        </st-form-item>
    </st-form>
    <input type="text" v-model="sd">
    <zlxFull v-model="sd"></zlxFull>
    {{sd}}
  </div>
</template>

<script>
import zlxFull from './zlxFull'
export default {
  name: 'ZlxTest',
  data() {
    return {
      sd: [{ h: 9 }],
      basicInfoRuleList: {
        usernameRule1: ['stff_name', { rules: [{ required: true, message: '请填写地址' }] }],
        usernameRule: ['staff_name', { rules: [{ required: true, message: '请填写姓名' }] }]// 姓名
      },
      form: this.$form.createForm(this)
    }
  },
  mounted() {
    this.sd = [{ a: 9 }]
  },
  created() {
    this.sd = [{ c: 8 }]
  },
  components: {
    zlxFull
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$emit('save', {
            data: values
          })
        }
      })
    }
  }
}
</script>
