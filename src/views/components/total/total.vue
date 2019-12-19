<template>
  <div :class="b()">
    <div v-if="hasTitle" :class="b('title')">
      <slot name="title">
        <span :class="b('tip')">本次筛选</span>
        <st-t3 :class="b('t3')">合计</st-t3>
      </slot>
    </div>
    <div :class="b('content-wapper')">
      <div :class="[b('content'), !hasTitle ? b('content--full') : '']">
        <div
          v-if="showData.length > 6"
          class="swiper-total-button-prev swiper-button-prev"
          slot="button-prev"
        >
          <st-icon type="arrow-left" class="arrow-left" />
        </div>
        <div :class="b('item')">
          <swiper :options="sliderOptions" ref="swiperTotal">
            <swiper-slide
              v-for="(item, index) in showData"
              :class="{ 'st-total-item__active': item.slotName }"
              :key="index"
            >
              <slot :name="item.slotName" v-bind="item">
                <st-total-item
                  :unit="item.unit"
                  :label="item.label"
                  :value="item.value"
                ></st-total-item>
              </slot>
            </swiper-slide>
          </swiper>
        </div>

        <div
          v-if="showData.length > 6"
          class="swiper-total-button-next swiper-button-next"
          slot="button-next"
        >
          <st-icon type="arrow-right" class="arrow-right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import moment from 'moment'
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
    },
    timestamp() {
      return moment().valueOf()
    },
    prevClass() {
      return `swiper-${this.timestamp}-button-next`
    },
    nextClass() {
      return `swiper-${this.timestamp}-button-prev`
    },
    navigationButtons() {
      return {
        nextEl: `.${this.nextClass}`,
        prevEl: `.${this.prevClass}`
      }
    },
    sliderOptions() {
      return {
        autoplay: false,
        navigation: { ...this.navigationButtons },
        // Default parameters
        slidesPerView: 6,
        breakpoints: {
          // when window width is >= 1280px
          1440: {
            slidesPerView: 4
          }
        },
        centeredSlides: false,
        normalizeSlideIndex: false
      }
    }
  }
}
</script>
