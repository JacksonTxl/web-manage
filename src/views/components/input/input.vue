<template>
  <a-input
    class="st-input"
    :style="{ width }"
    :maxlength="maxLength"
    v-bind="$attrs"
    @input="onInput"
    v-on="$listeners"
  >
    <span v-if="maxLength > 0" class="st-input__suffix" slot="suffix">
      {{ valueLength }}/{{ maxLength }}
    </span>
  </a-input>
</template>

<script>
export default {
  name: 'StInput',
  model: {
    prop: 'value',
    event: 'change.value'
  },
  data() {
    return {
      dvalue: ''
    }
  },
  computed: {
    valueLength() {
      return this.$attrs.value.length || 0
    }
  },
  props: {
    maxLength: Number,
    width: {
      type: String,
      default: '100%'
    }
  },
  methods: {
    onInput() {
      if (this.$attrs.value.length > this.maxLength) {
        // this.dvalue = this.$attrs.value.substr(0, 15)
        // debugger
      }
    }
  }
}
</script>
