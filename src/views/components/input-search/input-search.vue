<template>
  <a-input-search
    class="st-input-search"
    :style="{ width }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </a-input-search>
</template>

<script>
export default {
  name: 'StInputSearch',
  model: {
    prop: 'value',
    event: 'change.value'
  },
  props: {
    width: {
      type: String,
      default: '290px'
    }
  }
}
</script>
