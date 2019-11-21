<template>
  <div class="st-range-picker">
    <a-date-picker
      :disabled="startOptions.disabled"
      :disabledDate="disabledStartDate"
      :showTime="startOptions.showTime"
      :placeholder="startOptions.placeholder"
      :format="startOptions.format"
      v-model="startValue"
      @openChange="handleStartOpenChange"
    />
    &nbsp;~&nbsp;
    <a-date-picker
      :disabled="endOptions.disabled"
      :disabledDate="disabledEndDate"
      :showTime="endOptions.showTime"
      :placeholder="endOptions.placeholder"
      :format="endOptions.format"
      v-model="endValue"
      :open="endOpen"
      @openChange="handleEndOpenChange"
    />
  </div>
</template>

<script>
export default {
  name: 'StRangePicker2',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    /**
     * 模型值，使用[YYYY-MM-DD,YYYY-MM-DD]
     */
    value: {
      type: Array
    },
    disabledDays: {
      type: [Number, String],
      default: 0
    },
    options: {
      type: Object,
      default: () => ({
        start: {
          showTime: false,
          disabledBegin: '2019-07-03',
          placeholder: '开始日期',
          disabled: false,
          format: 'YYYY-MM-DD'
        },
        end: {
          showTime: false,
          placeholder: '结束日期',
          disabled: false,
          format: 'YYYY-MM-DD'
        }
      })
    }
  },
  data() {
    return {
      endOpen: false
    }
  },
  computed: {
    startOptions() {
      return this.options.start
    },
    endOptions() {
      return this.options.end
    },
    startValue: {
      get() {
        if (!this.value || !this.value[0]) {
          return null
        }
        return moment(this.value[0])
      },
      set(newVal) {
        this.$emit('change', [newVal, this.endValue])
      }
    },
    endValue: {
      get() {
        if (!this.value || !this.value[1]) {
          return null
        }
        return moment(this.value[1])
      },
      set(newVal) {
        this.$emit('change', [this.startValue, newVal])
      }
    }
  },
  methods: {
    disabledStartDate(newStartValue) {
      if (!newStartValue || !this.endValue) {
        return false
      }
      if (this.startOptions.disabledBegin) {
        return (
          newStartValue.valueOf() <
          moment(this.startOptions.disabledBegin).valueOf()
        )
      }
      return newStartValue.valueOf() > this.endValue.valueOf()
    },
    disabledEndDate(newEndValue) {
      if (!newEndValue || !this.startValue) {
        return false
      }
      if (+this.disabledDays > 0) {
        return (
          moment(this.startValue)
            .add(+this.disabledDays, 'days')
            .valueOf() < newEndValue.valueOf() ||
          moment(this.startValue).valueOf() > newEndValue.valueOf()
        )
      }
      return moment(this.startValue).valueOf() > newEndValue.valueOf()
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open
    }
  }
}
</script>
