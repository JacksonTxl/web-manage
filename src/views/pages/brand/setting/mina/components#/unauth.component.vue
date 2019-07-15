<template>
  <div :class="b()">
    <st-panel>
      <div :class="b('shadowbox')">
        <img src="~@/assets/img/icon_weapp.png" />
        <st-t4>已拥有小程序账号</st-t4>
        <p>将小程序扫码授权给三体云动，三体云动会自动帮助您生成用户端。</p>
        <st-button @click="doAuth">去授权</st-button>
      </div>
      <div :class="b('shadowbox')">
        <img src="~@/assets/img/icon_weapp_grey.png" />
        <st-t4>还没有小程序账号</st-t4>
        <p>点击下方按钮前往微信公众平台注册（目前仅支持「企业」类型主体）；注册成功后授权给三体云动即可。</p>
        <st-button type="secondary" @click="onReg">去官方注册</st-button>
      </div>
    </st-panel>
  </div>
</template>
<script>
export default {
  name: 'UnAuthComponent',
  props: {
    url: String
  },
  bem: {
    b: 'unAuth-component'
  },
  methods: {
    doAuth() {
      window.location.href = this.url
    },
    onReg() {
      window.location.href = 'https://mp.weixin.qq.com/'
    }
  }
}

</script>
