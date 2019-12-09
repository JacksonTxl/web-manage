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
        <swiper :options="sliderOptions" ref="swiperTotal">
          <swiper-slide
            v-for="(item, index) in showData"
            :class="{ 'st-total-item__active': item.slotName }"
            :key="index"
          >
            <slot :name="item.slotName" v-bind:item="item">
              <st-total-item :item="item"></st-total-item>
            </slot>
          </swiper-slide>
          <div
            v-if="showData.length > 6"
            class="swiper-total-button-prev swiper-button-prev"
            slot="button-prev"
          >
            <st-icon type="arrow-left" class="arrow-left" />
          </div>
          <div
            v-if="showData.length > 6"
            class="swiper-total-button-next swiper-button-next"
            slot="button-next"
          >
            <st-icon type="arrow-right1" class="arrow-right1" />
          </div>
        </swiper>
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
          nextEl: '.swiper-total-button-next',
          prevEl: '.swiper-total-button-prev'
        },
        slidesPerView: 6,
        centeredSlides: false,
        normalizeSlideIndex: false
      }
    }
  }
}
</script>
