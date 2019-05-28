<template>
  <st-form-item label="开卡方式" class="mgb-12" required>
    <a-radio-group v-decorator="value.open_type">
      <a-radio :value="1">即时开卡</a-radio>
      <a-radio :value="2">到店开卡</a-radio>
      <a-radio :value="3">指定日期开卡</a-radio>
    </a-radio-group>
  </st-form-item>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: ['value']
}
</script>
