
<template>
  <div style="display: inherit;">
    <st-input-number v-model="value.min" :float="true" :min="minMax.min" style="width:130px" >
      <!-- @change="onChangeMin" -->
      <template slot="addonAfter">{{company}}</template>
    </st-input-number>
    <div style="padding:0 10px">~</div>
    <st-input-number
      v-model="value.max"
      :float="true"
      :min="value.min ?(value.min -0):1 "
      :max="minMax.max"
      style="width:130px"
    >
      <template slot="addonAfter">{{company}}</template>
    </st-input-number>
  </div>
</template>
<script>
export default {
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
