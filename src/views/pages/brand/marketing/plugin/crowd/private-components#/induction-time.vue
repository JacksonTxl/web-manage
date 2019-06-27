
<template>
  <div>
    <title-info v-model="titleData" style="margin-bottom:44px"></title-info>
    <span style="margin-right:16px">时间范围</span>
    <time-day v-model="value.getData.member_time"></time-day>
  </div>
</template>
<script>
import timeDay from './time-day'
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
    timeDay
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
