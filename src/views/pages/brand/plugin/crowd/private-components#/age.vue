
<template>
  <div>
    <title-info v-model="titleData" style="margin-bottom:44px"></title-info>
    <div style="display: flex;align-items: center;">
      <span style="margin-right:16px">年龄范围</span>
      <st-input-number
        v-model="value.getData.base_age.min"
        :float="true"
        :min="0"
        style="width:130px"
      >
        <template slot="addonAfter">岁</template>
      </st-input-number>
      <div style="padding:0 10px">~</div>
      <st-input-number
        v-model="value.getData.base_age.max"
        :float="true"
        :min="value.getData.base_age.min?(value.getData.base_age.min-0):0 "
        style="width:130px"
      >
        <template slot="addonAfter">岁</template>
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
        title: '年龄',
        info: '在以下年龄范围内的用户'
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
