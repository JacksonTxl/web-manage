<template>
  <swiper-slide>
    <slot :name="item.soltName">
      <div :class="b('swiper-slide')">
        <span :class="b('swiper-slide-label')">{{ item.label }}</span>
        <i-count-up
          :class="b('swiper-slide-value')"
          :endVal="+item.value"
          :options="{ prefix: '<b>￥</b>' }"
          v-if="+item.value"
        />
        <span v-else :class="b('swiper-slide-value')">
          --
        </span>
      </div>
    </slot>
  </swiper-slide>
</template>

<script>
import { swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'StTotalItem',
  bem: {
    b: 'st-total'
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    swiperSlide
  }
}
</script>
