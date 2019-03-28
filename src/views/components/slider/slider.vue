<template>
  <div class="slider">
    <span class="slider__title">周一</span>
    <a-slider
      range
      :min="0"
      :max="23"
      :defaultValue="[9, 13]"
      :tipFormatter="formatter"
      :tooltipVisible="true"
      :disabled="true"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    formatter(value) {
      return `${value}:00`
    }
  }
}
</script>
