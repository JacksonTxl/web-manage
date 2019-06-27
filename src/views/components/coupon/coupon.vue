<template>
    <div :class="coupon()">
        <span class="mg-r8">{{name}}</span>
        <st-icon @click="onClose" class="cursor-pointer" type="anticon:close" />
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
