<template>
  <st-form-item label="购买赠送" labelGutter="12px">
    <st-input-number :max="99999" :float="true" placeholder="请输入赠送的天数/次数">
      <!-- <template slot="addonAfter">元</template> -->
    </st-input-number>
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
