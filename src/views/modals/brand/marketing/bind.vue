<template>
  <st-modal
    :title="title"
    v-model="show"
    width="400px"
    :footer="null"
  >
    <div :class="basic()">
      <img src="~@/assets/img/icon_weapp_grey.png" :class="activeClass"/>
      <p>{{message}}</p>
      <div>
        <st-button block pill type="primary" icon="download" size="large" @click="bindMini">
          去绑定小程序
        </st-button>
      </div>
    </div>
  </st-modal>
</template>
<script>
export default {
  name: 'BrandMarketingBind',
  bem: {
    basic: 'brand-marketing-bind'
  },
  data() {
    return {
      show: false,
      title: '小程序码',
      message: '您尚未绑定小程序',
      button: '去绑定小程序',
      activeClass: 'poster'
    }
  },
  methods: {
    bindMini() {
      this.show = false
      this.$router.push({
        name: 'brand-setting-mina-index'
      })
    }
  }
}
</script>
