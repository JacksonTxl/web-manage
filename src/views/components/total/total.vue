<template>
  <div :class="b()">
    <div v-if="hasTitle" :class="b('title')">
      <slot name="title">
        <span class="tip">本次筛选</span>
        <st-t3 class="total-t3">合计</st-t3>
      </slot>
    </div>
    <div :class="b('content')" :style="{ width: !hasTitle ? '100%' : '' }">
      <div :class="b('swiper')">
        <swiper :options="sliderOptions">
          <swiper-slide
            v-for="(item, index) in showData"
            :class="{ 'st-total-item__active': item.slotName }"
            :key="index"
          >
            <slot :name="item.slotName">
              <div :class="b('swiper-slide')">
                <span :class="b('swiper-slide-label')">{{ item.label }}</span>
                <i-count-up
                  :class="b('swiper-slide-value')"
                  :endVal="+item.value"
                  :options="{ prefix: `<b>${item.unit}</b>`, decimalPlaces: 1 }"
                  v-if="+item.value"
                />
                <span v-else :class="b('swiper-slide-value')">
                  --
                </span>
              </div>
            </slot>
          </swiper-slide>
        </swiper>
        <div
          v-if="showData.length > 6"
          class="swiper-button-prev"
          slot="button-prev"
        >
          <st-icon type="arrow-left" class="arrow-left" />
        </div>
        <div
          v-if="showData.length > 6"
          class="swiper-button-next"
          slot="button-next"
        >
          <st-icon type="arrow-right1" class="arrow-right1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'StTotal',
  bem: {
    b: 'st-total'
  },
  components: {
    swiper,
    swiperSlide
  },
  props: {
    indexs: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Object,
      default: () => {}
    },
    hasTitle: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showData() {
      let templateData = []
      for (let item in this.dataSource) {
        this.indexs.forEach(ele => {
          if (ele.dataIndex === item) {
            templateData.push({
              label: ele.titleTotal || ele.title,
              value: this.dataSource[item],
              unit: ele.unit || '',
              slotName: ele.scopedSlots ? ele.scopedSlots.customRender : ''
            })
          }
        })
      }
      return templateData
    }
  },
  data() {
    return {
      sliderOptions: {
        autoplay: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        slidesPerView: 6,
        centeredSlides: false,
        normalizeSlideIndex: false
      }
    }
  }
}
</script>
