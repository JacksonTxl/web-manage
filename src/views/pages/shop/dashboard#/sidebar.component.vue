<template>
    <div :class="sidebar()">
      <div>
        <a href="http://mp.weixin.qq.com/mp/homepage?__biz=MzI5NjA5MTU0NA==&hid=6&sn=fc366fb9920c736c4804ef7040becdad&scene=18#wechat_redirect" target="_blank">
        <img width="280px" height="186px" :src="pic"
          alt="">
          </a>
      </div>
      <st-container class="bg-white mg-t16" type="2">
        <st-t3 :class="b('title')">三体AIoT<a target="_blank" href="http://www.styd.cn/default/product_iot">查看更多<a-icon theme="filled" type="right-circle" /></a></st-t3>
        <plug-in title="多功能人脸识别一体机" sub="AI技术加持，玩转大数据" :img="ai1" ></plug-in>
        <plug-in title="智慧前台" sub="您的健身房前台贴心管家" :img="ai2"></plug-in>
        <plug-in title="智能门禁" sub="无论扫码还是刷卡，so easy" :img="ai3"></plug-in>
        <plug-in title="智能闸机" sub="请亮出你的身份" :img="ai4"></plug-in>
      </st-container>
      <st-container class="book bg-white mg-t16" type="2">
        <div class="book-img">
          <img :src="book" alt="">
        </div>

        <div class="book-content  mg-l24">
          <div class="book-content-t">2018中国健身行业数据报告</div>
          <div class="font-number">¥499</div>
          <st-button ghost pill type="primary" @click="download" class="mg-t8">免费下载电子版</st-button>
        </div>
      </st-container>
      <st-container class="link bg-white mg-t16" type="2">
        <st-t3 class="link__phone font-number">400-962-8988</st-t3>
        <div class="link__time">服务时间：09:00 - 18:00</div>
        <st-hr></st-hr>
        <div class="link__qr-code">
          <div class="image-box">
            <img class="image" :src="qrcode" alt="">
          </div>

          <span class="link__span">扫码关注三体官方微信公众号</span>
        </div>
      </st-container>
    </div>
</template>
<script>
import PlugIn from '@/views/pages/brand/dashboard#/plug-in'
import pic from '@/assets/img/shop/dashboard/pic.png'
import book from '@/assets/img/shop/dashboard/book.png'
import ai1 from '@/assets/img/shop/dashboard/ai1.png'
import ai2 from '@/assets/img/shop/dashboard/ai2.png'
import ai3 from '@/assets/img/shop/dashboard/ai3.png'
import ai4 from '@/assets/img/shop/dashboard/ai4.png'
import qrcode from '@/assets/img/shop/dashboard/qrcode.png'
export default {
  name: 'SidebarComponent',
  bem: {
    sidebar: 'page-shop-dashboard-sidebar',
    b: 'page-shop-dashboard-club'
  },
  data() {
    return {
      pic: pic,
      book: book,
      ai1: ai1,
      ai2: ai2,
      ai3: ai3,
      ai4: ai4,
      qrcode: qrcode
    }
  },
  components: {
    PlugIn
  },
  methods: {
    download() {
      window.open('https://pan.baidu.com/s/1HEmRnPxghuooXs8J0QWLWQ', '_blank')
    }
  }
}
</script>
