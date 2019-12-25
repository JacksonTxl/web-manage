<template>
  <div class="st-no-data">
    <img width="90" :src="img" />
    <p class="st-no-data__text">{{ text }}</p>
  </div>
</template>
<script>
export default {
  name: 'StNoData',
  props: {
    type: {
      type: [Number, String],
      default: '1'
    },
    text: {
      type: String,
      default: '暂无数据'
    }
  },
  computed: {
    img() {
      return {
        '1':
          'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/no-data.png'
      }[this.type]
    }
  }
}
</script>
