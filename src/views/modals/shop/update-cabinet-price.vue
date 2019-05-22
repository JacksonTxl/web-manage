<template>
  <st-modal
    title="批量修改价格"
    size="small"
    v-model="show"
    @ok="onSubmit"
    @cancel="onCancel"
  >
    <st-form :form="form" labelWidth="40px">
      <st-form-item label="价格" required>
        <a-input placeholder="请输入售卖价格">
          <div slot="addonAfter" style="width: 80px">
            <a-select class="full-width">
              <a-select-option value="1">元/天</a-select-option>
            </a-select>
          </div>
        </a-input>
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields().then(() => {
        const data = this.form.getFieldsValue()
      })
    },
    onCancel() {
      this.show = false
    }
  }
}
</script>
