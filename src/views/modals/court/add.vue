<template>
  <a-modal title="创建场地" v-model="show" wrapClassName="modal-court-add" :footer="null">
    <st-form labelWidth="68px" labelGutter="16px">
      <st-form-item label="场地名称" required>
        <a-input placeholder="请输入场地名称，不超过20个字"></a-input>
      </st-form-item>
      <st-form-item labelFix>
        <a-checkbox>是否VIP区域</a-checkbox>
      </st-form-item>
      <st-form-item label="容纳人数">
        <a-input placeholder="请输入最大容纳人数，不填无限制"></a-input>
      </st-form-item>
    </st-form>
    <div class="ta-c">
      <st-button type="primary">保存</st-button>
    </div>
  </a-modal>
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
