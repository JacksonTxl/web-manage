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
      <a-popover
        placement="bottomRight"
        trigger="click"
        class="slider-copy-bottom"
        v-if="item.week"
      >
        <template slot="content">
          <a-checkbox-group
            @change="onChange"
            v-for=" (weekInfo,index) in item.week"
            :key="index"
            class="slider-copy"
          >
            <a-checkbox :value="weekInfo.key" :disabled="weekInfo.disabled">{{weekInfo.key}}</a-checkbox>
          </a-checkbox-group>
        </template>
        <span>复制到</span>
      </a-popover>
    </div>
  </div>
</template>
<script>
export default {
  props: ['getSlider'],
  data() {
    return {
      setSlider: [],
      value: []
    }
  },
  mounted() {
    this.setSlider = this.getSlider
  },
  methods: {
    onChange(checkedValues) {
      console.log('checked = ', checkedValues)
      console.log('value = ', this.value)
    },
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
