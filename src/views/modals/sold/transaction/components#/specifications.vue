<template>
  <st-form-item label="规格" class="mgb-12">
    <a-radio-group v-decorator="value.test_time">
      <a-radio :value="1">10天/120元</a-radio>
      <a-radio :value="2">20天/240元</a-radio>
      <a-radio :value="3">30天/350元</a-radio>
      <a-radio :value="4">40天/450元</a-radio>
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
