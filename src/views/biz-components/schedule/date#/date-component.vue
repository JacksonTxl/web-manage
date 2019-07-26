<template>
  <div class="date-container">
    <st-button
      class="mg-r8"
      @click="onClickPre"
    >
      <a-icon type="left"/>
    </st-button>

    <span class="text-content">{{rangeTime}}</span>

    <st-button
    class="mg-r8  mg-l8"

    @click="onClickNext">
      <a-icon type="right"/>
    </st-button>
    <a-button @click="onClickToday">今</a-button>
  </div>
</template>
<script>
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
      default: moment().format('YYYY-MM-DD')
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
      return moment(this.startTime).add(6, 'days').format('YYYY-MM-DD')
    },
    rangeTime() {
      let start = moment(this.startTime).format('LL')
      let end = moment(this.endTime).format('LL')
      return `${start} ~ ${end}`
    }
  },
  methods: {
    onClickPre() {
      this.startTime = moment(this.startTime).subtract(7, 'days').format('YYYY-MM-DD')
      this.$emit('pre', { start_time: this.startTime, end_time: this.endTime })
    },
    onClickNext() {
      this.startTime = moment(this.startTime).add(7, 'days').format('YYYY-MM-DD')
      this.$emit('next', { start_time: this.startTime, end_time: this.endTime })
    },
    onClickToday() {
      let weekOfday = moment().format('E')// 计算今天是这周第几天
      this.startTime = moment().subtract(weekOfday - 1, 'days').format('YYYY-MM-DD')// 周一日期
      this.$emit('today', { start_time: this.startTime, end_time: this.endTime })
    }
  }
}
</script>
