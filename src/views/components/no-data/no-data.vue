<template>
  <div class="mg-y24 ta-c">
    <img width="150" :src="img" />
    <p class="mg-t16">{{ text }}</p>
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
          'https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/placeholder-nodata.png'
      }[this.type]
    }
  }
}
</script>
