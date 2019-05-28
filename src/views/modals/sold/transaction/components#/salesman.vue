<template>
  <st-form-item label="销售人员" required>
    <a-select placeholder="选择签单的工作人员" v-decorator="value.sell_name">
      <a-select-option value="jack">Jack</a-select-option>
      <a-select-option value="lucy">Lucy</a-select-option>
    </a-select>
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
