<template>
  <div :class="radio()">
    <a-radio-group :value="radioChecked" @change="onChange">
      <a-radio
        v-for="(item, index) in options"
        :key="index"
        :value="item.value"
      >
        <span :class="radio('label')">
          <span :class="radio('label-text')">{{ item.label }}</span>
        </span>
      </a-radio>
    </a-radio-group>
  </div>
</template>
<script>
export default {
  name: 'StSearchRadio',
  bem: {
    radio: 'st-search-radio'
  },
  data() {
    return {
      radioChecked: null
    }
  },
  model: {
    prop: 'checked',
    event: 'change'
  },
  watch: {
    checked(newVal) {
      this.radioChecked = newVal
    }
  },
  created() {
    this.radioChecked = this.checked
  },
  methods: {
    onChange(data) {
      this.radioChecked = data.target.value
      this.$emit('change', this.radioChecked)
    }
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    checked: {
      type: Number || String,
      default() {
        return 0
      }
    }
  }
}
</script>
