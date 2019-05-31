<template>
  <div class="date-container">
    <a-button
      class="mg-r8"
      style="width: 32px; display:inline-flex;align-items: center; justify-content: center;"
      @click="onClickPre"
    >
      <a-icon type="left"/>
    </a-button>

    <span class="text-cont">{{rangeTime}}</span>

    <a-button
    class="mg-r8  mg-l8"
    style="width: 32px; display:inline-flex;align-items: center; justify-content: center;"
    @click="onClickNext">
      <a-icon type="right"/>
    </a-button>
    <a-button style="width: 32px; display:inline-flex;align-items: center; justify-content: center;" @click="onClickToday">今</a-button>
  </div>
</template>
<script>
const ADD_WEEK_DAY = 24 * 3600 * 8 * 1000
const MINUS_WEEK_DAY = 24 * 3600 * 7 * 1000
const WEEK_DAY_INIT = 24 * 3600 * 6 * 1000
export default {
  name: 'date',
  data(vm) {
    return {
      startTime: vm.start
    }
  },
  props: {
    start: {
      type: String,
      default: ''
    },
    end: {
      type: String,
      default: ''
    }
  },
  watch: {
    start(n, o) {
      this.startTime = n
    }
  },
  computed: {
    endTime() {
      return moment(moment(this.startTime).valueOf() + WEEK_DAY_INIT).format('YYYY-MM-DD').valueOf()
    },
    rangeTime() {
      return `${this.startTime} ~ ${this.endTime}`
    }
  },
  methods: {
    onClickPre() {
      this.startTime = moment(moment(this.startTime).valueOf() - MINUS_WEEK_DAY).format('YYYY-MM-DD').valueOf()
      this.$emit('pre', { start_time: this.startTime, end_time: this.endTime })
    },
    onClickNext() {
      this.startTime = moment(moment(this.endTime).valueOf() + ADD_WEEK_DAY).format('YYYY-MM-DD').valueOf()
      this.$emit('next', { start_time: this.startTime, end_time: this.endTime })
    },
    onClickToday() {
      this.$emit('today')
    }
  }
}
</script>
