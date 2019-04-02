<template>
  <div class="st-slider"  :class="setSlider.className ? setSlider.className : ''">
    <a-row class="st-slider__title-box" v-if="setSlider.infoList && setSlider.infoList[0].week">
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
            @visibleChange="visibleChange"
          >
            <template slot="content">
              <a-checkbox-group
                @change="onChange"
                class="slider-copy"
                v-for=" (weekInfo,index) in item.week"
                :key="index"
              >
                <a-checkbox :value="index" :disabled="weekInfo.disabled">{{weekInfo.key}}</a-checkbox>
              </a-checkbox-group>
            </template>
            <span @click="copyTo(index)">复制到</span>
          </a-popover>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    getSlider: {
      type: Object
    }
  },
  data() {
    return {
      setSlider: [],
      checkedValues: [],
      copyToIndex: null
    }
  },
  mounted() {
    this.setSlider = this.getSlider
  },
  methods: {
    // 复制到
    copyTo(index) {
      this.copyToIndex = index
      console.log(index)
    },
    // 多选
    onChange(checkedValues) {
      if (checkedValues.length > 0) {
        this.setSlider.infoList[checkedValues[0]].value = this.setSlider.infoList[this.copyToIndex].value
        this.setSlider = JSON.parse(JSON.stringify(this.setSlider))
      }
    },
    // tooltip格式处理
    formatter(value) {
      if (value % 1 === 0) {
        return `${value}:00`
      } else {
        return `${parseInt(value)}:30`
      }
    },
    // 气泡卡消失
    visibleChange(value) {
      console.log(value)
    }
  },
  created() {},
  watch: {
    'setSlider': {
      handler() {
        console.log('asdasd')
        this.$emit('change', this.setSlider)
      },
      deep: true
    }
  }
}
</script>
