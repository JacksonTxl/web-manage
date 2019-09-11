<template>
  <div :class="bCard()">
    <section
      v-for="group in getMatrix(week)"
      :key="group.id"
      :class="[bCard('item-group'), bCard(`item-group--has-${group.length}`)]"
    >
      <div
        class="con-item"
        :class="[`item-${i}`, `${mbarClass(item)}`]"
        v-for="(item, i) in group"
        :key="i"
        @click="onClick(item)"
        :style="itemStyle(item)"
      >
        <div class="schedule-card__bar" :class="item | barClass"></div>

        <div :class="bCard('content')">
          <span class="time">
            <st-icon type="timer"></st-icon>
            {{ item.start_time }}-{{ item.end_time }}
          </span>
          <st-t3 class="course__name">{{ item.course_name }}</st-t3>
          <p class="course__coach">教练：{{ item.coach_name }}</p>
        </div>

        <div class="item__extra" :class="item | barClass">
          <div :class="bCard('content')">
            <div class="mg-b8 time">
              <st-icon type="timer"></st-icon>
              {{ item.start_time }}-{{ item.end_time }}
            </div>
            <st-t3 class="mg-b8 course__name">{{ item.course_name }}</st-t3>
            <p class="mg-b8 course__item">
              <span class="label">教练：</span>
              <span class="value">{{ item.coach_name }}</span>
            </p>
            <p v-if="item.court_name" class="mg-b8 course__item">
              <span class="label">场地：</span>
              <span class="value">{{ item.court_name }}</span>
            </p>
            <p v-if="item.member_name" class="course__item">
              <span class="label">会员：</span>
              <span class="value">{{ item.member_name }}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const toTen = time => {
  return time
    .split(':')
    .map((n, i) => {
      return {
        0: +n,
        1: +n / 60
      }[i]
    })
    .reduce((res, n) => res + n, 0)
}
export default {
  name: 'Card',
  bem: {
    bCard: 'schedule-card'
  },
  props: {
    cardList: {
      type: Array,
      default: () => {}
    },
    week: {
      type: Number,
      default: 99
    }
  },
  computed: {
    start() {
      return this.$route.query.start_date
    }
  },
  filters: {
    barClass(item) {
      const date = moment(`${item.start_date} ${item.start_time}`)
      const current = moment()
      if (date > current) {
        return 'after'
      } else if (date === current) {
        return 'current'
      } else if (date < current) {
        return 'before'
      }
    }
  },
  methods: {
    mbarClass(item) {
      const date = moment(`${item.start_date} ${item.start_time}`)
      const current = moment()
      if (date > current) {
        return 'after'
      } else if (date === current) {
        return 'current'
      } else if (date < current) {
        return 'before'
      }
    },
    onClick(val) {
      this.$emit('detail', val)
    },
    getMatrix(n) {
      let weekOfday = moment(this.start).format('E')
      let date = moment(this.start)
        .subtract(weekOfday - n, 'days')
        .format('YYYY-MM-DD')
      n === 0 && (date = this.start)
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
        top: `calc((100% - 40px) * ${item.start / 24} + 40px)`,
        height: `${((item.end - item.start) / 24) * 100}%`
      }
    }
  }
}
</script>
