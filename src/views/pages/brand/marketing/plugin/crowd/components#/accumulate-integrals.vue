<template>
  <div :class="bAccumulateIntegrals()">
    <title-info v-model="titleData"></title-info>
    <div :class="bAccumulateIntegrals('content')">
      <span class="mg-r16">积分范围</span>
      <input-number
        v-model="value.getData.sum_scores"
        :company="'个'"
        :minMax="{ min: 0, max: 1000 }"
      ></input-number>
    </div>
  </div>
</template>
<script>
import inputNumber from './input-number.vue'
import titleInfo from './title-info.vue'
export default {
  bem: {
    bAccumulateIntegrals: 'crowd-component-accumulate-Integrals'
  },
  model: {
    type: 'value',
    event: 'dataChangge'
  },
  props: {
    value: Object
  },
  components: {
    titleInfo,
    inputNumber
  },
  data() {
    return {
      titleData: {
        title: '累计获得积分',
        info: '累计获得积分在以下范围内的用户'
      },
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
