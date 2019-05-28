<template>
  <st-form-item label="单节价格" labelGutter="12px">
    <div style="display: flex;justify-content: space-between;" v-if="flag">
      <st-input-number
        style="width: 140px;"
        :max="99999.9"
        :float="true"
        v-decorator="value.num"
        placeholder="请输入课程的单价"
      ></st-input-number>
      <span>售卖价格区间：元/节～元/节</span>
    </div>
    <div v-else>元/节</div>
  </st-form-item>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    value: {
      type: Object
    },
    flag: {
      type: Boolean,
      default: true
    }
  }
}
</script>
