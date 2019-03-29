<template>
  <div
    class="st-checkbox-facility-item"
    @click="check"
    :class="{select: stSelect,disabled: stDisabled}"
  >
    <div class="st-checkbox-facility-item-icon">
      <st-icon :type="stIconComputed" size="24px"></st-icon>
    </div>
    <p class="st-checkbox-facility-item-label">{{stLabelComputed}}</p>
  </div>
</template>
<script>
export default {
  name: 'StCheckboxFacilityItem',
  inject: {
    groupProvide: 'checkboxFacilityGroupProvide',
    emitGroup: 'emitCheckboxFacilityGroup',
    initGroup: 'initCheckboxFacilityGroup'
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    stIconComputed() {
      return this.icon
    },
    stLabelComputed() {
      return this.label
    },
    stValueComputed() {
      return this.value
    },
    stDisabledComputed() {
      return this.disabled
    },
    stGroupValueComputed() {
      return this.groupProvide.groupValue.value
    },
    stGroupDisabledComputed() {
      return this.groupProvide.groupValue.disabled
    }
  },
  watch: {
    stIconComputed: {
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
      if (this.stDisabled) return false
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
