
<template>
  <div>
    <title-info v-model="titleData" style="margin-bottom:44px"></title-info>
    <div style="display: flex;align-items: center;">
      <span style="margin-right:16px">积分范围</span>
      <st-input-number v-model="inputnumber1" :float="true" :min="1" style="width:130px">
        <template slot="addonAfter">个</template>
      </st-input-number>
      <div style="padding:0 10px">~</div>
      <st-input-number
        v-model="inputnumber2"
        :float="true"
        :min="inputnumber1?inputnumber1:1 "
        style="width:130px"
      >
        <template slot="addonAfter">个</template>
      </st-input-number>
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
