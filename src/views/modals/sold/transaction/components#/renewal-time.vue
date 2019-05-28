<template>
  <st-form-item label="续租时间" labelGutter="12px">
    <div style="display: flex;justify-content: space-between;">
      <div>2019-06-23 14:46</div>
      <div>至</div>
      <div>
        <a-date-picker
          v-decorator="value.sell_name"
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="选择结束日期"
          @change="onChange"
          @ok="onOk"
        />
      </div>
    </div>
  </st-form-item>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: ['value'],
  methods: {
    onChange(value, dateString) {
      console.log('Selected Time: ', value)
      console.log('Formatted Selected Time: ', dateString)
    },
    onOk(value) {
      console.log('onOk: ', value)
    }
  }
}
</script>
