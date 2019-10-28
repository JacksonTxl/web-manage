<template>
  <div :class="coupon()">
    <span>{{ name }}</span>
    <!-- NOTE: 注释 -->
    <!-- v-if="$options._parentListeners && $options._parentListeners.close" -->
    <st-icon
      @click="onClose"
      class="mg-l8 cursor-pointer"
      type="anticon:close"
    />
  </div>
</template>
<script>
export default {
  name: 'StCoupon',
  bem: {
    coupon: 'st-coupon'
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    onClose() {
      this.$emit('close')
    }
  }
}
</script>
