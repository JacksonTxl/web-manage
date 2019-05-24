<template>
  <div class="mg-y24 ta-c">
    <img
      width="150"
      :src="img"
    />
    <p class="mg-t16">{{text}}</p>
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
      return ({
        '1': 'https://static-s.styd.cn/201811161629/no-data.png'
      })[this.type]
    }
  }
}
</script>
