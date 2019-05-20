
<template>
  <div>
    <title-info v-model="titleData" style="margin-bottom:44px"></title-info>
    <span style="margin-right:16px">时间范围</span>
    <a-range-picker @change="onChange" style="margin-right:8px"/>
    <a-radio-group @change="onChange" v-model="radioValue">
      <a-radio-button value="a">近7天</a-radio-button>
      <a-radio-button value="b">近30天</a-radio-button>
      <a-radio-button value="c">近90天</a-radio-button>
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
        title: '入会时间',
        info: '选择自然日内，注册的用户'
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
