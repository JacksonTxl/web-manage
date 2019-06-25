<template>
  <div class="hour-picker" id="hour-picker" :class="{ 'hour-picker--drag': isDrag }">
    <div
      v-for="(item, i) in hours"
      :key="i"
      class="hour-picker-item"
      :class="{ 'hour-picker-item--active':  v[i] }"
      @mousedown="onMouseDown(i)"
      @mouseenter="onMouseEnter(i)"
    >
      <div :class="b('line', { milestone: i%6===0 })"></div>
      <div v-if="i===hours.length-1" :class="b('line', { 'milestone-last': true })"></div>
      <div :class="b('duration')">
        <i :class="b('duration-start')" v-show="v[i] && !v[i-1]"></i>
        <i :class="b('duration-end')" v-show="v[i] && !v[i+1]"></i>
      </div>
      <div :class="b('start')" v-show="v[i] && !v[i-1]">{{i}}:00</div>
      <div :class="b('end')" v-show="v[i] && !v[i+1]">{{i+1}}:00</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StHourPicker',
  bem: {
    b: 'hour-picker-item'
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      v: [],
      result: [],
      isDrag: false,
      bulletVal: 0
    }
  },
  created() {
    this.initV()
  },
  computed: {
    hours() {
      const hours = []
      for (let i = 0; i < 24; i++) {
        hours.push(i)
      }
      return hours
    }
  },
  mounted() {
    const picker = document.querySelector('#hour-picker')
    picker.addEventListener('mousedown', () => {
      this.isDrag = true
    })
    picker.addEventListener('mouseover', () => {
      this.isDrag = false
    })
    picker.addEventListener('mouseup', () => {
      this.isDrag = false
    })
  },
  methods: {
    onPick(i, bulletVal) {
      const v = [...this.v]
      if (typeof bulletVal !== 'undefined') {
        v[i] = bulletVal
      } else {
        v[i] = !v[i]
      }
      this.v = v
      this.result = this.dataFilter(v)
      this.$emit('input', this.result)
    },
    dataFilter(v) {
      let ret = []
      v.forEach((item, index) => {
        if (item) {
          ret.push(`${index}:00-${++index}:00`)
        }
      })
      ret = ret.join('*')
      for (let i = 1; i <= 23; i++) {
        ret = ret.replace(new RegExp(`-${i}:00\\*${i}:00-`, 'g'), '-')
      }
      ret = ret.split('*')
      return ret
    },
    initV() {
      const v = []
      const value = this.value
      value.forEach(item => {
        if (/-/.test(item)) {
          const temp = item.split('-')
          for (let i = parseInt(temp[0]); i < parseInt(temp[1]); i++) {
            v[i] = true
          }
        }
      })
      this.v = v
    },
    onMouseDown(i) {
      const bulletVal = !this.v[i]
      this.bulletVal = !!bulletVal
      this.onPick(i, bulletVal)
    },
    onMouseEnter(i) {
      if (this.isDrag) {
        this.onPick(i, this.bulletVal)
      }
    }
  }
}
</script>
