<template>
  <div :class="coupon()">
    <span>{{ name }}</span>
    <st-icon
      v-if="$options._parentListeners && $options._parentListeners.close"
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
  mounted() {
    console.log(this.$options._parentListeners)
  },
  methods: {
    onClose() {
      this.$emit('close')
    }
  }
}
</script>
