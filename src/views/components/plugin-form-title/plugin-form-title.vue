<template>
  <h3 :class="b()">
    <slot></slot>
    <span :class="b('sub-title')"><slot name="sub-title"></slot></span>
  </h3>
</template>

<script>
export default {
  name: 'StPluginFormTitle',
  props: {},
  bem: {
    b: 'st-plugin-form-title'
  }
}
</script>
