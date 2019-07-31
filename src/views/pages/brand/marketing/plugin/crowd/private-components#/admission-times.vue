
<template>
  <div>
    <title-info v-model="titleData" style="margin-bottom:44px"></title-info>
    <div style="display: flex;align-items: center;margin-bottom: 24px;">
      <span style="margin-right:16px">入场次数</span>
      <input-number
        v-model="value.getData.remain_enter_times.remain_times"
        :company="'次'"
        :minMax="{min:0,max:1000}"
      ></input-number>
    </div>
    <div style="display: flex;align-items: center;">
      <span style="margin-right:16px">时间范围</span>
      <time-day v-model="value.getData.remain_enter_times.select_time"></time-day>
    </div>
  </div>
</template>
<script>
import inputNumber from './input-number.vue'
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
    inputNumber,
    timeDay
  },
  data() {
    return {
      titleData: {
        title: '入场次数',
        info: '近期入场次数在以下范围的用户'
      },
      inputnumber2: '',
      inputnumber1: '',
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
