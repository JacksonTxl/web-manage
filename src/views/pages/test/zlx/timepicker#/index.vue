<template>
  <div class="time-picker" @mouseup="onMouseup" @mounseover="onMouseOver"  @mouseleave="onMounseLeave" @mousedown="onMouseDown">
    <template  v-for="i in 25">
      <item @change="onChange"  @down="onDown"  :views="views" :isDrag="isDrag" :isEnter="isEnter" :key="i" :time="i - 1"></item>
    </template>

  </div>
</template>

<script>
import item from './time-picker-item'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'TimePicker',
  data() {
    return {
      isDrag: false,
      isEnter: false,
      checkArr: [],
      values: [],
      views: []
    }
  },
  components: {
    item
  },
  watch: {
    checkArr(n) {
      this.values = this.rangeTime(n).values
      this.views = this.rangeTime(n).views
    }
  },
  methods: {
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
          rangeArr.push(`${start} - ${end}`)
          const view = `#${start}#start---#${end}#end`
          views.push(view)
          start = -1
        }
      }
      return { values: rangeArr, views }
    },
    onMouseDown() {
      console.log('fa onMousedown')
      this.isDrag = true
    },
    onMouseOver() {
      this.isDrag = false
    },
    onDown(isEnter) {
      this.isEnter = isEnter
    },
    onMounseLeave() {
      console.log('onMounseLeave')
    },
    onChange(val) {
      this.$set(this.checkArr, val.time, val.isActive)
    },
    onMouseup() {
      console.log('fa onMouseup')
      this.isDrag = false
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      window.addEventListener('mouseup', () => {
        console.log('onMouseupdddd')
        this.isDrag = false
      })
    })
  }
}
</script>

<style lang="less" scoped>
.time-picker{
  display: flex
}

</style>
