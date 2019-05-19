
<template>
  <div>
    <title-info v-model="titleData" style="margin-bottom:44px"></title-info>
    <span style="margin-right:16px">选择性别</span>
    <a-radio-group name="radioGroup">
      <a-radio :value="1">男</a-radio>
      <a-radio :value="2">女</a-radio>
    </a-radio-group>
  </div>
</template>
<script>
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
    titleInfo
  },
  data() {
    return {
      titleData: {
        title: '性别',
        info: '满足一下性别属性的用户'
      },
      radioValue: ''
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
