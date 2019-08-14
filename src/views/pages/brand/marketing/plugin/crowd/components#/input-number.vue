<template>
  <div :class="bInputNumber()">
    <st-input-number
      v-model="value.min"
      :float="true"
      :min="minMax.min"
      :class="bInputNumber('input')"
    >
      <!-- @change="onChangeMin" -->
      <template slot="addonAfter">
        {{ company }}
      </template>
    </st-input-number>
    <div class="pd-x8">~</div>
    <st-input-number
      v-model="value.max"
      :float="true"
      :min="value.min ? value.min - 0 : 1"
      :max="minMax.max"
      :class="bInputNumber('input')"
    >
      <template slot="addonAfter">
        {{ company }}
      </template>
    </st-input-number>
  </div>
</template>
<script>
export default {
  bem: {
    bInputNumber: 'crowd-component-input-number'
  },
  model: {
    type: 'value',
    event: 'dataChangge'
  },
  props: {
    value: {
      type: Object
    },
    company: {
      type: String
    },
    minMax: {
      type: Object
    }
  },
  components: {},
  data() {
    return {
      inputnumber2: '',
      inputnumber1: ''
    }
  },
  methods: {
    selectionFun(item) {
      this.value.selectionData = item
    },
    onChange(date, dateString) {
      console.log(date, dateString)
      this.$emit('dataChangge', this.value)
    },
    onChangeMin() {
      if (this.value.min > this.value.max) {
        this.value.max = this.value.min
      }
    }
  },
  mounted() {}
}
</script>
