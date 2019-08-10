<template>
  <div :class="bCardremainingNumber()">
    <title-info v-model="titleData"></title-info>
    <div :class="bCardremainingNumber('content')">
      <span class="mg-r16">剩余次数</span>
      <input-number
        v-model="value.getData.member_card_remain_times"
        :company="'次'"
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
    bCardremainingNumber: 'crowd-component-card-remaining-number'
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
        title: '会员卡剩余次数',
        info: '会员卡剩余次数在以下范围的用户'
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
