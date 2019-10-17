<template>
  <div :class="[rowcont(), className]">
    <st-plugin-form-title>
      {{ title }}
      <span slot="sub-title">{{ subTitle }}</span>
    </st-plugin-form-title>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'RowContainerComponent',
  props: {
    title: String,
    subTitle: String,
    className: String
  },
  bem: {
    rowcont: 'row-container-component'
  },
  methods: {}
}
</script>
