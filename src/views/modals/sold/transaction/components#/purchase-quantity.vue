<template>
  <st-form-item label="购买数量" labelGutter="12px">
    <st-input-number
      :max="99999.9"
      :float="true"
      v-decorator="value.num"
      placeholder="请输入购买的数量"
    >
      <template slot="addonAfter">
        节
      </template>
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
