<template>
  <section class="sg-section">
    <h3>st-range-picker</h3>
    <p>时间范围选择</p>
    <div>
      <st-range-picker
        :disabledDays="180"
        :value="selectTime"
      ></st-range-picker>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      selectTime: {
        startTime: {
          showTime: false,
          disabledBegin: null,
          placeholder: '开始日期',
          disabled: false,
          value: null,
          format: 'YYYY-MM-DD',
          change: $event => {}
        },
        endTime: {
          showTime: false,
          placeholder: '结束日期',
          disabled: false,
          value: null,
          format: 'YYYY-MM-DD',
          change: $event => {}
        }
      }
    }
  }
}
</script>
