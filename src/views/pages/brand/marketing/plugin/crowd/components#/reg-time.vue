<template>
  <div>
    <title-info v-model="titleData"></title-info>
    <span class="mg-r16">时间范围</span>
    <time-day v-model="value.getData.register_time"></time-day>
  </div>
</template>
<script>
import timeDay from './time-day'
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
    timeDay
  },
  data() {
    return {
      titleData: {
        title: '注册时间',
        info: '选择自然日内，注册的用户'
      }
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
