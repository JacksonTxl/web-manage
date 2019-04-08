<template>
  <div>
    <h3>业务组件</h3>
    <h4>业务标签类</h4>
    <section flex="cross:center">
      <st-tag type="coach-personal" />
      <st-tag type="coach-team" />
      <st-tag type="role-staff" />
      <st-tag type="role-saler" />
      <st-tag type="shop-opening" />
      <st-tag type="shop-trial" />
      <st-tag type="shop-presale" />
      <st-tag type="shop-close" />
      <st-t3 style="display:inline-block">上海旗舰店</st-t3>
    </section>
    <section flex="cross:center" class="mg-t48">

      <st-form :form="form" @submit="save">
        <st-form-item  class="mg-l24" labelOffset>
          <a-input v-decorator="basicInfoRuleList.usernameRule2"></a-input>
        </st-form-item>
        <st-form-item  class="mg-l24" labelOffset>
          <a-input v-decorator="basicInfoRuleList.usernameRule3"></a-input>
        </st-form-item>
        <st-form-item  class="mg-l24" labelOffset>
          <a-input v-decorator="basicInfoRuleList.usernameRule4"></a-input>
        </st-form-item>
        <a-row :gutter="8">
          <a-col :lg="10">
            <st-form-item label="城市选择" required>
              <st-region-cascader
                :form.sync="form"
                :fileds="['a', 'bf', 'c']"
                @change="onChangeGetRegionValues"
                v-decorator="basicInfoRuleList.usernameRule1">
              </st-region-cascader>
            </st-form-item>
            <st-form-item label="姓名"  required>
              <a-input v-decorator="basicInfoRuleList.usernameRule"></a-input>
            </st-form-item>
            <st-form-item  class="mg-l24" labelOffset>
                <st-button type="primary"
                  ghost html-type="submit">保存</st-button>
            </st-form-item>
          </a-col>
        </a-row>

      </st-form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ZlxTest',
  data() {
    return {
      basicInfoRuleList: {
        usernameRulee: ['regions1', { rules: [{ type: 'array', required: true, message: '请填写地址' }] }],
        usernameRule2: ['a', { rules: [{ required: true, message: '请填写地址' }] }],
        usernameRule3: ['bf', { rules: [{ required: true, message: '请填写地址' }] }],
        usernameRule4: ['c', { rules: [{ required: true, message: '请填写地址' }] }],
        usernameRule1: ['regions', { rules: [{ type: 'array', required: true, message: '请填写地址' }] }],
        usernameRule: ['staff_name', { rules: [{ required: true, message: '请填写姓名' }] }]// 姓名
      },
      values: [],
      province: 0,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    onChangeGetRegionValues(value) {
      console.log(value)
    },
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
  },
  mounted() {
    // this.$nextTick().then(() => {
    //   setTimeout(() => {
    //     this.form.setFieldsValue({
    //       regions: [1, 1, 398],
    //       province: 1,
    //       city: 1,
    //       district: 398,
    //       staff_name: 'sss'
    //     })
    //   }, 300)
    // })
  }
}
</script>
