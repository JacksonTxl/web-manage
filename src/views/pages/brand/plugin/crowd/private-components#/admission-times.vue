
<template>
  <div>
    <title-info v-model="titleData" style="margin-bottom:44px"></title-info>
    <div style="display: flex;align-items: center;margin-bottom: 24px;">
      <span style="margin-right:16px">剩余次数</span>
      <st-input-number v-model="inputnumber1" :float="true" :min="1" style="width:130px">
        <template slot="addonAfter">次</template>
      </st-input-number>
      <div style="padding:0 10px">~</div>
      <st-input-number
        v-model="inputnumber2"
        :float="true"
        :min="inputnumber1?inputnumber1:1 "
        style="width:130px"
      >
        <template slot="addonAfter">次</template>
      </st-input-number>
    </div>
    <div style="display: flex;align-items: center;">
      <span style="margin-right:16px">时间范围</span>
      <a-range-picker @change="onChange" style="margin-right:8px"/>
      <a-radio-group @change="onChange" v-model="radioValue">
        <a-radio-button value="a">近7天</a-radio-button>
        <a-radio-button value="b">近30天</a-radio-button>
        <a-radio-button value="c">近90天</a-radio-button>
      </a-radio-group>
    </div>
  </div>
</template>
<script>
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
    titleInfo
  },
  data() {
    return {
      titleData: {
        title: '入场次数',
        info: '会员卡剩余次数在以下范围的用户'
      },
      inputnumber2: '',
      inputnumber1: '',
      radioValue: ''
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
