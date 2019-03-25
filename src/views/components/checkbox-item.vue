<template>
  <a-button class="checked" @click="check" :disabled="disabled">
    {{label}}
    <slot v-if="label===''"></slot>
  </a-button>
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Number]
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      stChecked: false
    }
  },
  methods: {
    check() {
      this.stChecked = !this.stChecked
      this.$emit('change', this.stChecked)
    }
  },
  created() {
    this.stChecked = this.checked
  },
  mounted() {

  }
}
</script>
<style lang="less" scoped>
.checked{
  color: $primary;
}
</style>
