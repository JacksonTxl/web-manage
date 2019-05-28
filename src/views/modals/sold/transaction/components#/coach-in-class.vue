<template>
  <st-form-item label="上课教练" required>
    <a-select placeholder="请选择上课的教练" v-decorator="value.coach_in_class">
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
