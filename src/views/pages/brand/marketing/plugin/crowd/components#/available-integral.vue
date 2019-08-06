<template>
  <div>
    <title-info v-model="titleData"></title-info>
    <div style="display: flex;align-items: center;">
      <span clas="mg-r16">积分范围</span>
      <input-number
        v-model="value.getData.available_scores"
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
        title: '可用积分',
        info: '可用积分在以下范围内的用户'
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
      this.$emit('dataChangge', this.value)
    }
  },
  mounted() {}
}
</script>
