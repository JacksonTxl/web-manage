<template>
  <div>
    <st-panel>
      <set-price @change="onPriceGradientChange"></set-price>
    </st-panel>
  </div>
</template>
<script>
import SetPrice from '@/views/fragments/course/set-price'
export default {
  components: {
    SetPrice
  },
  methods: {
    onPriceGradientChange(priceGradient) {
      console.log('price gradient changed', priceGradient)
    }
  }
}
</script>
