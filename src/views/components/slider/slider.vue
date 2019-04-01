<template>
  <div>
    <div class="slider" v-for="(item,index) in setSlider.infoList" :key="index">
      <span class="slider__title">{{setSlider.infoList[index].title}}</span>
      <a-slider
        range
        :min="0"
        :max="24"
        :step="0.5"
        :tipFormatter="formatter"
        :tooltipVisible="true"
        :disabled="setSlider.disabled"
        v-model="setSlider.infoList[index].value"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ['getSlider'],
  data() {
    return {
      setSlider: []
    }
  },
  mounted() {
    this.setSlider = this.getSlider
    console.log(this.getSlider, 11111)
  },
  methods: {
    formatter(value) {
      if (value % 1 === 0) {
        return `${value}:00`
      } else {
        return `${parseInt(value)}:30`
      }
    }
  },
  created() {},
  watch: {}
}
</script>
