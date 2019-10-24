<template>
  <div>
    <title-info v-model="titleData"></title-info>
    <span style="margin-right:16px">时间范围</span>
    <time-day-future v-model="value.getData.member_expiring"></time-day-future>
  </div>
</template>
<script>
import titleInfo from './title-info.vue'
import timeDayFuture from './time-day-future'
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
    timeDayFuture
  },
  data() {
    return {
      radioValue: ''
    }
  },
  computed: {
    titleData: vm => {
      return {
        title: `${vm.$c('member_card')}即将到期`,
        info: `选择自然日内，${vm.$c('member_card')}即将到期的用户`
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
