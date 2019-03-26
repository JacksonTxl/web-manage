<template>
  <a-button
    class="st-checkbox-button-item"
    :class="{select: stSelect}"
    @click="check"
    :disabled="stDisabled"
  >
    {{stLabelComputed}}{{stDisabled}}
    <slot v-if="stLabelComputed===''"></slot>
  </a-button>
</template>
<script>
export default {
  name: 'StCheckboxButtonItem',
  inject: {
    groupProvide: 'groupProvide',
    emitGroup: 'emitGroup',
    initGroup: 'initGroup'
  },
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    stValueComputed() {
      return this.value
    },
    stDisabledComputed() {
      return this.disabled
    },
    stLabelComputed() {
      return this.label
    },
    stGroupValueComputed() {
      return this.groupProvide.groupValue.value
    },
    stGroupDisabledComputed() {
      return this.groupProvide.groupValue.disabled
    }
  },
  watch: {
    stGroupValueComputed: {
      handler(newVal, oldVal) {
        this.init()
      },
      deep: true
    },
    stGroupDisabledComputed: {
      handler(newVal, oldVal) {
        this.init()
      },
      deep: true
    },
    stValueComputed: {
      handler(newVal, oldVal) {
        this.init()
      },
      deep: true
    },
    stDisabledComputed: {
      handler(newVal, oldVal) {
        this.init()
      },
      deep: true
    },
    stLabelComputed: {
      handler(newVal, oldVal) {
        this.init()
      },
      deep: true
    }
  },
  data() {
    return {
      stSelect: false,
      stDisabled: false
    }
  },
  methods: {
    check() {
      this.stSelect = !this.stSelect
      this.$emit('change', this.stSelect)
      this.emitGroup({ key: this.stValueComputed, value: this.stSelect })
    },
    init() {
      this.stSelect = this.stGroupValueComputed.includes(this.value)
      this.stDisabled = this.stDisabledComputed || this.stGroupDisabledComputed
    }
  },
  created() {
    this.init()
    this.initGroup(this.stValueComputed)
  }
}
</script>
