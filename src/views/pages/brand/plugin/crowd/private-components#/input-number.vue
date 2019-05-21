
<template>
  <div style="display: inherit;">
    <st-input-number v-model="value.min" :float="true" :min="1" style="width:130px">
      <template slot="addonAfter">{{company}}</template>
    </st-input-number>
    <div style="padding:0 10px">~</div>
    <st-input-number
      v-model="value.max"
      :float="true"
      :min="value.min?(value.min -0):1 "
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
    }
  },
  mounted() {}
}
</script>
