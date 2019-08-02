<template>
  <div class="date-container">
    <st-button class="mg-r8" @click="onClickPre">
      <a-icon type="left" />
    </st-button>

    <span class="text-content">{{ rangeTime }}</span>

    <st-button class="mg-r8 mg-l8" @click="onClickNext">
      <a-icon type="right" />
    </st-button>
    <a-button @click="onClickToday">今</a-button>
  </div>
</template>
<script>
export default {
  name: 'date',
  data() {
    return {
      startTime: moment().format('YYYY-MM-DD')
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
  created() {
    let weekOfday = moment(this.start).format('E')
    this.startTime = moment(this.start)
      .subtract(weekOfday - 1, 'days')
      .format('YYYY-MM-DD')
  },
  watch: {
    start(n, o) {
      let weekOfday = moment(n).format('E')
      this.startTime = moment(n)
        .subtract(weekOfday - 1, 'days')
        .format('YYYY-MM-DD')
    }
  },
  computed: {
    isDay() {
      const start = this.$route.query.start_date
      const end = this.$route.query.end_date
      return start === end
    },
    endTime() {
      return this.isDay
        ? moment(this.startTime).format('YYYY-MM-DD')
        : moment(this.startTime)
            .add(6, 'days')
            .format('YYYY-MM-DD')
    },
    rangeTime() {
      let start = moment(this.startTime).format('LL')
      let end = moment(this.endTime).format('LL')
      return this.isDay
        ? moment(this.$route.query.start_date).format('LL')
        : `${start} ~ ${end}`
    }
  },
  methods: {
    onClickPre() {
      this.startTime = this.isDay
        ? moment(this.$route.query.start_date)
            .subtract(1, 'days')
            .format('YYYY-MM-DD')
        : moment(this.startTime)
            .subtract(7, 'days')
            .format('YYYY-MM-DD')
      this.$emit('pre', { start_date: this.startTime, end_date: this.endTime })
    },
    onClickNext() {
      this.startTime = this.isDay
        ? moment(this.$route.query.start_date)
            .add(1, 'days')
            .format('YYYY-MM-DD')
        : moment(this.startTime)
            .add(7, 'days')
            .format('YYYY-MM-DD')
      this.$emit('next', { start_date: this.startTime, end_date: this.endTime })
    },
    onClickToday() {
      let weekOfday = moment().format('E') // 计算今天是这周第几天
      this.startTime = this.isDay
        ? moment(this.$route.query.start_date).format('YYYY-MM-DD')
        : moment()
            .subtract(weekOfday - 1, 'days')
            .format('YYYY-MM-DD') // 周一日期
      this.$emit('today', {
        start_date: this.startTime,
        end_date: this.endTime
      })
    },
    getMatrix(n) {
      let weekOfday = moment(this.start).format('E')
      let date = moment(this.start)
        .subtract(weekOfday - n, 'days')
        .format('YYYY-MM-DD')
      const sortedList = this.cardList
        .filter(item => item.start_date === date)
        .map(item => {
          if (moment(item.end_date) > moment(item.start_date)) {
            item.overload = 1
          }
          item.start = toTen(item.start_time)
          item.end = toTen(item.end_time)
          return item
        })
        .sort((a, b) => {
          return a.start - b.start
        })

      const timeMatrix = []
      let prevStart
      let prevEnd
      let group = []
      let groupIndex = 0

      sortedList.forEach(item => {
        if (prevStart === undefined) {
          prevStart = item.start
          prevEnd = item.end
        } else {
          if (item.start < prevEnd) {
            if (item.end > prevEnd) {
              prevEnd = item.end
            }
          } else {
            // 以当前item标记开始位和结束位
            prevStart = item.start
            prevEnd = item.end
            // 添加分组
            group = []
            groupIndex++
          }
        }
        group.push(item)

        timeMatrix[groupIndex] = group
      })
      return timeMatrix
    },
    itemStyle(item) {
      return {
        top: `${(item.start / 24) * 100}%`,
        height: `${((item.end - item.start) / 24) * 100}%`
      }
    }
  }
}
</script>
