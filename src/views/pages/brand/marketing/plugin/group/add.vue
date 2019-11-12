<template>
  <st-panel app>
    <div slot="actions">
      <!-- <st-button
        :loading="loading.addMarketingCoupon || loading.editMarketingCoupon"
        type="primary"
        @click="onSubmit"
      >
        保 存
      </st-button> -->
      <st-button type="primary">
        保存
      </st-button>
    </div>
    <div>
      <st-form :form="form" labelWidth="118px">
        <st-form-item label="活动名称" required>
          <a-input
            v-decorator="decorators.group_name"
            maxlength="10"
            placeholder="请输入活动名称"
          ></a-input>
        </st-form-item>
      </st-form>
    </div>
  </st-panel>
</template>
<script>
import { ruleOptions } from './add.config'
export default {
  bem: {
    basic: 'brand-marketing-coupon-add'
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators
    }
  }
}
</script>
