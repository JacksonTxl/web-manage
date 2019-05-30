<template>
  <st-form-item label="到期时间" labelGutter="12px">2020-06-23 14:46 根据购买数量自动计算</st-form-item>
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
