<template>
  <div class="time-picker" @mouseup="onMouseup" @mounseover="onMouseOver" @mousedown="onMouseDown">
    <template  v-for="i in 25">
      <item @change="onChange"  @down="onDown" :checkArr="checkArr" :views="views" :isDrag="isDrag" :isEnter="isEnter" :key="i" :time="i - 1"></item>
    </template>

  </div>
</template>

<script>
import item from './time-picker-item'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'StTimePicker',
  model: {
    prop: 'values',
    event: 'change'
  },
  data() {
    return {
      isDrag: false,
      isEnter: false,
      checkArr: [],
      views: []
    }
  },
  components: {
    item
  },
  props: {
    values: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    checkArr(n) {
      this.views = this.rangeTime(n).views
      this.$emit('change', this.rangeTime(n).values)
    }
  },
  methods: {
    formatTime(val) {
      return val < 10 ? `0${val}:00` : `${val}:00`
    },
    rangeTime(checkArr) {
      let values = []
      let start = -1
      let end = 0
      let rangeArr = []
      let views = []
      let ca = cloneDeep(checkArr)
      ca[ca.length] = false
      for (let i = 0; i < ca.length; i++) {
        if (ca[i] && start === -1) {
          start = i - 1
        }
        if (start !== -1 && ca[i]) {
          end = i
        }
        if (!ca[i] && start !== -1 && end) {
          rangeArr.push({ start_time: `${this.formatTime(start)}`, end_time: `${this.formatTime(end)}` })
          const view = `#${start}#start---#${end}#end`
          views.push(view)
          start = -1
        }
      }
      return { values: rangeArr, views }
    },
    onMouseDown() {
      this.isDrag = true
    },
    onMouseOver() {
      this.isDrag = false
    },
    onDown(isEnter) {
      this.isEnter = isEnter
    },
    onChange(val) {
      this.$set(this.checkArr, val.time, val.isActive)
    },
    onMouseup() {
      this.isDrag = false
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.views = this.values.map(item => {
        const start = +item.start_time.split(':00:00')[0]
        const end = +item.end_time.split(':00:00')[0]
        console.log(start, end)
        for (let i = 0; i < 25; i++) {
          if (i > start && i <= end) {
            console.log('charr', i)
            this.$set(this.checkArr, i, true)
          }
        }
        return `#${start}#start---#${end}#end`
      })
      /* jslint evil: true */
      document.onselectstart = () => 'event.returnValue=false'
    })
  }
}
</script>

<style lang="less" scoped>
.time-picker{
  display: flex
}

</style>
