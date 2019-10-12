<template>
  <st-modal
    title="添加票种"
    :footer="null"
    class="modal-brand-switch"
    v-model="show"
  >
    <st-form :form="form">
      <st-form-item label="票种类型" required>
        <a-input v-decorator="decorators.name"></a-input>
      </st-form-item>
      <st-form-item label="票种名称" required>
        <a-input v-decorator="decorators.name"></a-input>
      </st-form-item>
      <st-form-item label="价格" required>
        <a-input v-decorator="decorators.name"></a-input>
      </st-form-item>
      <st-form-item label="票数" required>
        <a-input v-decorator="decorators.name"></a-input>
      </st-form-item>
      <st-form-item label="购买用户" required>
        <a-input v-decorator="decorators.name"></a-input>
      </st-form-item>
      <st-form-item label="购买限制" required>
        <a-input v-decorator="decorators.name"></a-input>
      </st-form-item>
      <st-form-item label="团购优惠" required>
        <a-input v-decorator="decorators.name"></a-input>
      </st-form-item>
      <st-form-item label="售卖时间" required>
        <a-input v-decorator="decorators.name"></a-input>
      </st-form-item>
      <st-form-item label="备注说明" required>
        <a-input v-decorator="decorators.name"></a-input>
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
export default {
  data() {
    return {
      show: false
    }
  }
}
</script>
