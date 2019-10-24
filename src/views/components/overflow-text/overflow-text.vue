<template>
  <a-popover
    :title="title"
    class="st-overflow-text"
    placement="topLeft"
    overlayClassName="st-overflow-text__overlay"
    :style="{ maxWidth }"
  >
    <slot></slot>
    <template slot="content">
      <slot></slot>
    </template>
  </a-popover>
</template>
<script>
export default {
  name: 'StOverflowText',
  props: {
    title: {
      type: String
    },
    maxWidth: {
      type: String,
      default: '1000px'
    }
  }
}
</script>
