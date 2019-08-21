<template>
  <span>
    <a-radio-group
      @change="onChangeRadio"
      v-model="radioValue"
      style="margin-right: 8px"
    >
      <a-radio-button :value="7">近7天</a-radio-button>
      <a-radio-button :value="30">近30天</a-radio-button>
      <a-radio-button :value="90">近90天</a-radio-button>
      <a-radio-button :value="-1">自定义</a-radio-button>
    </a-radio-group>
    <a-range-picker
      v-if="radioValue === -1"
      @change="onChange"
      :format="format || 'YYYY-MM-DD'"
      :value="value.min ? [moment(value.min), moment(value.max)] : []"
      class="mg-r8"
      :allowClear="true"
      :disabledDate="disabledDate"
    />
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
    format: String,
    disabledDateFlag: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      radioValue: 7,
      radioText: '近7天'
    }
  },
  created() {
    if (this.value) {
      this.radioValue = this.value.value
    }
  },
  methods: {
    moment,
    onChangeRadio(data) {
      if (this.radioValue === 7) {
        this.radioText = '近7天'
      } else if (this.radioValue === 30) {
        this.radioText = '近30天'
      } else if (this.radioValue === 90) {
        this.radioText = '近90天'
      } else if (this.radioValue === -1) {
        this.radioText = '自定义'
      } else {
        this.radioText = ''
      }
      this.value.min = ''
      this.value.max = ''
      this.value.name = this.radioText
      this.value.value = this.radioValue
    },
    onChange(data, str) {
      this.value.min = str[0]
      this.value.max = str[1]
    },
    disabledDate(endDate) {
      if (this.disabledDateFlag) {
        return (
          endDate.format('YYYY-MM-DD') >
          moment()
            .subtract(1, 'd')
            .format('YYYY-MM-DD')
        )
      }
      return false
    }
  }
}
</script>
