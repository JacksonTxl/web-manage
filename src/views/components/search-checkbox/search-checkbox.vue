<template>
  <a-checkbox-group :options="options"></a-checkbox-group>
</template>

<script>
export default {
  name: 'StSearchCheckbox',
  props: {
    options: {
      type: Array,
      default: () => []
    }
  }
}
</script>
