<template>
  <div>
    <title-info v-model="titleData"></title-info>
    <div style="display: flex;align-items: center;">
      <span style="margin-right:16px">年龄范围</span>
      <input-number
        v-model="value.getData.base_age"
        :company="'岁'"
        :minMax="{ min: 1, max: 100 }"
      ></input-number>
    </div>
  </div>
</template>
<script>
import inputNumber from './input-number.vue'
import titleInfo from './title-info.vue'
export default {
  model: {
    type: 'value',
    event: 'dataChangge'
  },
  props: {
    value: Object
  },
  components: {
    titleInfo,
    inputNumber
  },
  data() {
    return {
      titleData: {
        title: '年龄',
        info: '在以下年龄范围内的用户'
      }
    }
  },
  methods: {
    selectionFun(item) {
      this.value.selectionData = item
    },
    onChange(date, dateString) {
      console.log(date, dateString)
      this.$emit('dataChangge', this.value)
    }
  },
  mounted() {}
}
</script>
