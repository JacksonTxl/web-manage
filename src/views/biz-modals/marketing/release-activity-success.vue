<template>
  <st-modal title="推广" width="500px" v-model="show">
    <div>
      <st-t2>发布成功</st-t2>
      <p>更多曝光推广，获得更多客户与订单</p>
      <ul>
        <li><a href="">分享海报</a></li>
        <li><a href="">设置小程序海报</a></li>
        <li><a href="">小程序码</a></li>
      </ul>
    </div>
  </st-modal>
</template>
<script>
export default {
  name: 'ReleaseActivity',
  bem: {
    bModal: 'modal-marketing-release-activity'
  },
  data() {
    return {
      show: false
    }
  }
}
</script>
