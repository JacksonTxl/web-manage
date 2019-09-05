<template>
  <a-switch class="st-switch" v-model="model" v-bind="$attrs">
    <slot></slot>
  </a-switch>
</template>

<script>
export default {
  name: 'StSwitch',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    model: {
      get() {
        return !!this.value
      },
      set(newVal) {
        this.$emit('change', newVal ? 1 : 0)
      }
    }
  }
}
</script>
