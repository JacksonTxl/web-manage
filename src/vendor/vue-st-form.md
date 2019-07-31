## vue-st-form

包装 ant-design-vue 的 this.\$form.createForm(this)
支持

- 错误抓取
- validator 可以直接使用 Promise 获取 return 错误信息
- 方便的 decorator 构造
- 自动滚动到错误表单条目

```html
<template>
  <st-form :form="form" labelWidth="118px">
    <st-form-item label="优惠券名称" required>
      <a-input
        :disabled="isEditMode"
        v-decorator="decorators.coupon_name"
        maxlength="10"
        placeholder="请输入优惠券名称"
        :class="basic('input')"
      ></a-input>
    </st-form-item>
    <a-form-item :class="basic('wrap-input')">
      <a-radio :value="2">
        满
        <st-input-number
          :class="basic('radio-input')"
          :disabled="isEditMode"
          v-decorator="decorators.full_price"
        ></st-input-number
        >元使用
      </a-radio>
    </a-form-item>
  </st-form>
</template>

<script>
  export default {
    data() {
      const form = this.$stForm.create()
      const decorators = form.decorators({
        coupon_name: {
          rules: [{ validator: this.couponNameValidator }]
        },
        full_price: { rules: [{ validator: this.fullPriceValidator }] }
      })
      return {
        form,
        decorators
      }
    },
    methods: {
      // 优惠券名称 rule,value,values为当前校验的其它字段值对象
      couponNameValidator(rule, value, values) {
        if (!value) {
          return '请填写优惠券名称'
        }
        if (value.length > 10) {
          return '优惠券名称长度不能超过10，请重新输入'
        }
      },
      // 满多少使用
      fullPriceValidator(rule, value, values) {
        let use_type = +values.use_type
        let couponPirce = +values.price || 0

        if (use_type === 2) {
          if (!value) {
            return '请填写使用条件' // 直接放回字符串 错误信息
          }
          if (+value <= 0) {
            return '满减门槛不能小于0'
          }
          if (couponPirce > +value) {
            return '满减门槛不能低于优惠券面额'
          }
        }
      }
    }
  }
</script>
```

```js

validator(rule,value,values){
  return '错误'  // 返回错误信息
  return false // 返回 显示 "{key}字段验证未通过"
  // 返回undeinfed 或者不返回 代表校验通过
  return Promise.reject(new Error('异步错误信息')) // 返回异步错误信息
}

```

手动校验
```js
// 返回promise 校验成功时resolve
this.form.validate().then(values=>{

})


```
