
<template>
  <div>
    <title-info v-model="titleData" style="margin-bottom:44px"></title-info>
    <span style="margin-right:16px">时间范围</span>
    <time-day v-model="value.getData.member_expiring"></time-day>
  </div>
</template>
<script>
import titleInfo from './title-info.vue'
import timeDay from './time-day'
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
        title: '会员卡即将到期',
        info: '选择自然日内，会员卡即将到期的用户'
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
