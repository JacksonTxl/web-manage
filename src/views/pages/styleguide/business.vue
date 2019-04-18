<template>
  <div>
    <h3>业务组件</h3>
    <h4>业务标签类</h4>
    <section flex="cross:center">
      <st-tag type="coach-personal"/>
      <st-tag type="coach-team"/>
      <st-tag type="role-staff"/>
      <st-tag type="role-saler"/>
      <st-tag type="shop-opening"/>
      <st-tag type="shop-trial"/>
      <st-tag type="shop-presale"/>
      <st-tag type="shop-close"/>
      <st-tag type="period-card"/>
      <st-tag type="number-card"/>
      <st-tag type="deposite-card"/>
      <st-t3 style="display:inline-block">上海旗舰店</st-t3>
    </section>
    <section class="mg-t48">
      <st-form :form="form" @submit="save">
        <a-row :gutter="8">
          <a-col :lg="10">
            <st-form-item label="城市选择" required>
              <st-region-cascader
                @change="onChangeGetRegionValues"
                v-decorator="basicInfoRuleList.usernameRule1"
              ></st-region-cascader>
            </st-form-item>
            <st-form-item label="姓名" required>
              <a-input v-decorator="basicInfoRuleList.usernameRule"></a-input>
            </st-form-item>
            <st-form-item class="mg-l24" labelOffset>
              <st-button type="primary" ghost html-type="submit">保存</st-button>
            </st-form-item>
          </a-col>
        </a-row>
      </st-form>
    </section>

    <h3 class="mg-t48">st-image-upload</h3>
    <p>
      [sizeLimit] 自定义图片大小m
      [numLimit] 最多啊上传图片数量
      [placeholder] 自定义文字
      支持图片裁剪，裁剪选项，自定义图片filter,自定义操作区，更多参数参看st-image-upload.vue
    </p>
    <section class="sg-app-content">
      <st-panel>
        <image-upload-demo></image-upload-demo>
      </st-panel>
    </section>
  </div>
</template>

<script>
import ImageUploadDemo from './business#/image-upload.vue'
export default {
  name: 'ZlxTest',
  components: {
    ImageUploadDemo
  },
  data() {
    return {
      basicInfoRuleList: {
        usernameRule1: [
          'regions',
          { rules: [{ type: 'array', required: true, message: '请填写地址' }] }
        ],
        usernameRule: [
          'staff_name',
          { rules: [{ required: true, message: '请填写姓名' }] }
        ] // 姓名
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
    this.$nextTick().then(() => {
      this.form.setFieldsValue({
        regions: [1, 1, 398],
        staff_name: 'sss'
      })
    })
  }
}
</script>
