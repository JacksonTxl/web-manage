<template>
  <div class="st-pop-container">
    <div class="st-pop-container__tri-1" :style="{ left: offset }"></div>
    <div class="st-pop-container__tri-2" :style="{ left: offset }"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'StPopContainer',
  props: {
    /**
     *  头部三角形偏移量 可以任何css单位
     */
    offset: {
      type: String,
      default: '0px'
    }
  }
}
</script>
