<template>
  <a-slider v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </a-slider>
</template>

<script>
export default {
  mounted() {},
  beforeDestroy() {}
}
</script>
