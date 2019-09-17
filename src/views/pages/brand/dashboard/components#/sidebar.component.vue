<template>
  <div :class="sidebar()">
    <div>
      <a
        href="https://mp.weixin.qq.com/s/LHPD08fe4RdEztp9V0IZXg"
        target="_blank"
      >
        <img width="280px" height="186px" :src="pic" alt="" />
      </a>
    </div>
    <st-container class="bg-white mg-t16 pluginbox" type="2">
      <st-t3 :class="b('title')">热门营销插件</st-t3>
      <plug-in
        title="优惠券"
        sub="扫码领券，拉新转化"
        :img="coupon"
        href="/brand/marketing/plugin/coupon/list"
      ></plug-in>
      <plug-in
        title="邀请有礼"
        sub="客户自发传播，社交裂变"
        :img="invite"
        href="/brand/marketing/plugin/invitation/index/data"
      ></plug-in>
      <plug-in
        title="幸运大转盘"
        sub="百分比抽奖，回馈新老客户必备福利"
        :img="slyder"
      ></plug-in>
    </st-container>
    <st-container class="book bg-white mg-t16" type="2">
      <div class="book-img">
        <img :src="book" alt="" />
      </div>

      <div class="book-content  mg-l24">
        <div class="book-content-t">2018中国健身行业数据报告</div>
        <div class="font-number">¥599</div>
        <st-button ghost pill type="primary" @click="download" class="mg-t8">
          立即购买
        </st-button>
      </div>
    </st-container>
    <st-container class="book bg-white mg-t16" type="2">
      <plug-in
        title="多功能人脸识别一体机"
        sub="AI技术加持，玩转大数据"
        :img="ai"
        href="https://www.styd.cn/default/product_iot_face"
      ></plug-in>
    </st-container>
    <st-container class="link bg-white mg-t16" type="2">
      <st-t3 class="link__phone font-number">400-962-8988</st-t3>
      <div class="link__time">服务时间：09:00 - 18:00</div>
      <st-hr></st-hr>
      <div class="link__qr-code">
        <div class="image-box">
          <img class="image" :src="qrcode" alt="" />
        </div>

        <span class="link__span">扫码关注三体官方微信公众号</span>
      </div>
    </st-container>
  </div>
</template>
<script>
import PlugIn from '@/views/biz-components/dashboard/plug-in'
import pic from '@/assets/img/shop/dashboard/pic.png'
import book from '@/assets/img/shop/dashboard/book.png'
import coupon from '@/assets/img/brand/dashboard/coupon.png'
import invite from '@/assets/img/brand/dashboard/invite.png'
import slyder from '@/assets/img/brand/dashboard/slyder.png'
import ai from '@/assets/img/brand/dashboard/ai.png'
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
      coupon: coupon,
      invite: invite,
      slyder: slyder,
      ai: ai,
      qrcode: qrcode
    }
  },
  components: {
    PlugIn
  },
  methods: {
    download() {
      window.open(
        'https://www.styd.cn/m/378564/training/info/1008082?act=preview&is_shared=1',
        '_blank'
      )
    }
  }
}
</script>
