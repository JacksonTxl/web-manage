<template>
  <div>
    <title-info v-model="titleData"></title-info>
    <span class="mg-r16">时间范围</span>
    <time-day
      v-model="value.getData.base_birthday"
      format="MM-DD"
      :disabledDateFlag="false"
    ></time-day>
  </div>
</template>
<script>
import titleInfo from './title-info.vue'
import timeDay from './time-day'
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
    timeDay
  },
  data() {
    return {
      titleData: {
        title: '生日',
        info: '选择自然日内，过生日的用户'
      }
    }
  },
  created() {},
  methods: {},
  mounted() {}
}
</script>
