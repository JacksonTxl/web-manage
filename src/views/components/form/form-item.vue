<template>
  <a-form-item v-bind='$attrs'
    v-on="$listeners">
    <slot></slot>
  </a-form-item>
</template>

<script>
export default {
  name: 'StFormItem'
}
</script>
