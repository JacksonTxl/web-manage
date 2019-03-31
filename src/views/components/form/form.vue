<template>
  <a-form v-bind="$attrs"
    v-on="$listeners"
    class="st-form">
    <slot></slot>
  </a-form>
</template>

<script>
export default {
  name: 'StForm'
}
</script>
