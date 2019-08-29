<template>
  <a-input-search class="st-input-search" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </a-input-search>
</template>

<script>
export default {
  name: 'StInputSearch',
  model: {
    prop: 'value',
    event: 'change.value'
  }
}
</script>
