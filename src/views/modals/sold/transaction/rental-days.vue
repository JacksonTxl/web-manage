<template>
  <st-form-item label="租赁天数" labelGutter="12px">
    <div>
      <a-col :span="3">30天</a-col>
      <a-col :span="21">
        <st-input-number placeholder="请输入天数">
          <template slot="addonAfter">天</template>
        </st-input-number>
      </a-col>
    </div>
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
