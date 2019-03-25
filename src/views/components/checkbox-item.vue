<template>
  <a-button class="checkbox-item" :class="{checked: stChecked}" @click="check" :disabled="disabled">
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
  computed: {
    stValue() {
      return this.value
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
