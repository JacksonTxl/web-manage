<template>
  <a-checkbox :checked="checked" @change="onChange" v-bind="$attrs">
    <slot></slot>
  </a-checkbox>
</template>
<script>
import { merge } from 'lodash-es'
export default {
  name: 'StCheckbox',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Number
    }
  },
  computed: {
    checked: {
      get() {
        return !!this.value
      }
    }
  },
  methods: {
    onChange(event) {
      this.$emit('change', event.target.checked ? 1 : 0)
    }
  }
}
</script>
