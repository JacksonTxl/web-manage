<template>
  <div class="st-slider">
    <a-row class="st-slider__title-box" v-if="setSlider.infoList[0].week">
      <a-col :span="2">时间段</a-col>
      <a-col :span="18">
        <ul class="st-slider__title-box-time">
          <li class="st-slider__title-box-time-comment">00:00</li>
          <li class="st-slider__title-box-time-06 st-slider__title-box-time-comment">06:00</li>
          <li class="st-slider__title-box-time-12 st-slider__title-box-time-comment">12:00</li>
          <li class="st-slider__title-box-time-18 st-slider__title-box-time-comment">18:00</li>
          <li class="st-slider__title-box-time-24 st-slider__title-box-time-comment">24:00</li>
        </ul>
      </a-col>
      <a-col :span="4" class="st-slider__title-box-operate">操作</a-col>
    </a-row>
    <div class="slider" v-for="(item,index) in setSlider.infoList" :key="index">
      <a-row>
        <a-col :span="2">
          <span class="slider__title">{{setSlider.infoList[index].title}}</span>
        </a-col>
        <a-col :span="18">
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
        </a-col>
        <a-col :span="4">
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
        </a-col>
      </a-row>
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
