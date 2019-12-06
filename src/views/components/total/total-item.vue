<template>
  <div :class="b('swiper-slide')">
    <span :class="b('swiper-slide-label')">{{ item.label }}</span>
    <i-count-up
      :class="b('swiper-slide-value')"
      :endVal="+item.value"
      :options="{
        prefix: `<b>${item.unit}</b>`,
        decimalPlaces: item.value.toString().includes('.') ? 1 : 0
      }"
      v-if="!isNaN(item.value)"
    />
    <span v-else :class="b('swiper-slide-value')">
      --
    </span>
  </div>
</template>

<script>
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
  }
}
</script>

<style></style>
