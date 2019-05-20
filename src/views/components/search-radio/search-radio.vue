<template>
  <div :class="radio()">
    <a-radio-group :value="radioChecked" @change="onChange">
        <a-radio v-for="(item,index) in list" :key="index" :value="item.value">
          <div :class="radio('label')">
            <span class="text">{{item.label}}--{{item.value}}</span>
          </div>
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
    list: {
      type: Array,
      required: true
    },
    checked: {
      type: Number || String,
      default() {
        return ''
      }
    }
  }
}
</script>
