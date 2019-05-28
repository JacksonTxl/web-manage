<template>
  <st-form-item label="减免金额" labelGutter="12px">
    <a-input v-decorator="value.reduce_amount"></a-input>
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
