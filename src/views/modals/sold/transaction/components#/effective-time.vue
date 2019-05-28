<template>
  <st-form-item label="有效时间" labelGutter="12px">2019-03-08 14:20 至 2020-03-07 14:20</st-form-item>
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
