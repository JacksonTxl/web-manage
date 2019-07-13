
<template>
  <span>
    <a-range-picker
      @change="onChange"
      :format="format || 'YYYY-MM-DD'"
      :value="value.min ? [moment(value.min), moment(value.max)] : []"
      style="margin-right:8px"
      :allowClear="true"
    />
    <!-- <a-range-picker v-else @change="onChange" style="margin-right:8px" :allowClear="true"/> -->
    <a-radio-group @change="onChangeRadio" v-model="radioValue">
      <a-radio-button :value="7">近7天</a-radio-button>
      <a-radio-button :value="30">近30天</a-radio-button>
      <a-radio-button :value="90">近90天</a-radio-button>
    </a-radio-group>
  </span>
</template>
<script>
import moment from 'moment'
export default {
  model: {
    type: 'value',
    event: 'dataChangge'
  },
  props: {
    value: Object,
    format: String
  },
  data() {
    return {
      dateFormat: 'YYYY-MM-DD',
      timeData: {
        min: '',
        max: ''
      },
      titleData: {
        title: '生日',
        info: '选择自然日内，过生日的用户'
      },
      radioValue: '',
      radioText: ''
    }
  },
  created() {
    if (this.value) {
      this.timeData.min = this.value.min
      this.timeData.max = this.value.max
      this.radioValue = this.value.value
    }
  },
  methods: {
    moment,
    onChangeRadio(data) {
      let dayTime = new Date().getTime()
      let pastTime = dayTime - this.radioValue * 24 * 60 * 60 * 1000
      this.timeData = {
        min: this.filterTime(pastTime),
        max: this.filterTime(dayTime)
      }
      this.value.min = this.timeData.min
      this.value.max = this.timeData.max
      this.value.value = this.radioValue
      if (this.radioValue === 7) {
        this.radioText = '近7天'
      } else if (this.radioValue === 30) {
        this.radioText = '近30天'
      } else if (this.radioValue === 90) {
        this.radioText = '近90天'
      } else {
        this.radioValue = ''
        this.radioText = ''
      }
      this.value.name = this.radioText
      this.filterTime(dayTime)
    },
    onChange(data, str) {
      let obj = {
        min: str[0],
        max: str[1]
      }
      if (obj.max === this.filterTime(new Date().getTime())) {
        let flagTime = moment(data[1]).diff(moment(data[0]), 'days')
        if (flagTime === 7) {
          this.radioValue = 7
          this.radioText = '近7天'
        } else if (flagTime === 30) {
          this.radioValue = 30
          this.radioText = '近30天'
        } else if (flagTime === 90) {
          this.radioValue = 90
          this.radioText = '近90天'
        } else {
          this.radioValue = ''
          this.radioText = ''
        }
      } else {
        this.radioValue = ''
        this.radioText = ''
      }
      this.timeData = obj
      this.value.min = str[0]
      this.value.max = str[1]
      this.value.value = this.radioValue
      this.value.name = this.radioText
    },
    filterTime(dateTime) {
      let dateTime1 = new Date(dateTime)
      let Year = dateTime1.getFullYear()
      let Month = dateTime1.getMonth() + 1
      let Dates = dateTime1.getDate()
      Month = Month > 9 ? Month : '0' + Month
      Dates = Dates > 9 ? Dates : '0' + Dates
      return `${Year}-${Month}-${Dates}`
    }
  },
  mounted() {}
}
</script>
