<template>
  <st-form-item
    label="商品价格"
    class="global-form-item-text"
    labelGutter="12px"
  >
    120元
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
