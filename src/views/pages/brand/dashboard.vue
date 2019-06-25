<template>
  <div :class="b()" >
    <a-row :gutter="24">
      <a-col :class="b('content')" :span="18">
        <a-row :gutter="16" :class="bCount()">
          <a-col :span="6" :class="bCount('item')">
            <div :class="bCount('box')">
              <count-card></count-card>
            </div>
          </a-col>
          <a-col :span="6" :class="bCount('item')">
            <div :class="bCount('box')">
              <count-card></count-card>
            </div>
          </a-col>
          <a-col :span="6" :class="bCount('item')">
            <div :class="bCount('box')">
              <count-card></count-card>
            </div>
          </a-col>
          <a-col :span="6" :class="bCount('item')">
            <div :class="bCount('box')">
              <count-card></count-card>
            </div>
          </a-col>
        </a-row>
        <a-row class="mg-t16 bg-white" >
          <a-col :span="24">
            <dashboard-tabs>
              <template v-slot:user>
                <h1>Here might be a page title</h1>
              </template>
              <template v-slot:marketing>
                <h1>Here might be a page title</h1>
              </template>
            </dashboard-tabs>
          </a-col>
        </a-row>
        <a-row :gutter="16" class="mg-t16">
          <a-col :span="12">
            <st-container class="bg-white" type="2">
              <st-t3>客单价</st-t3>
            </st-container>
          </a-col>
          <a-col :span="12">
            <st-container class="bg-white" type="2">
              <st-t3>用户活跃分析</st-t3>

            </st-container>
          </a-col>
        </a-row>
      </a-col>
      <a-col :class="b('adv')" :span="6">
        <st-panel app :class="bCount('box')">
          <img width="280px" height="186px" src="https://file.digitaling.com/eImg/uimages/20170814/1502707757253062.jpg" alt="">
        </st-panel>
        <st-container class="bg-white mg-t16" type="2">
          <st-t3>热门营销插件</st-t3>
          <plug-in></plug-in>
          <plug-in></plug-in>
          <plug-in></plug-in>
        </st-container>
        <st-container class="bg-white mg-t16" type="2">
          <div class="adv-book">
            <img src="" alt="">
          </div>

          <div class="content">
            <span>2018中国健身行业数据报告</span>
            <a href="javascript:;">¥499</a>
            <st-button ghost pill type="primary">免费下载电子版</st-button>
          </div>
        </st-container>
        <st-container class="aiot bg-white mg-t16" type="2">
          <div class="aiot__img">
            <img src="" alt="">
          </div>
          <div class="aiot__content">
            <st-t3>多功能人脸识别一体机</st-t3>
            <p>AI技术加持，玩转大数据</p>
          </div>
        </st-container>
        <st-container class="link bg-white mg-t16" type="2">
          <st-t3 class="link__phone">400-962-8988</st-t3>
          <div class="link__time">服务时间：09:00 - 18:00</div>
          <div class="link__qr-code mg-t8">
            <div class="image-box">
              <img class="image" src="#" alt="">
            </div>

            <span>扫码关注三体官方微信公众号</span>
          </div>
        </st-container>
      </a-col>
    </a-row>

  </div>
</template>

<script>
import DashboardTabs from '@/views/pages/brand/dashboard#/tabs'
import CountCard from '@/views/pages/brand/dashboard#/count-card'
import PlugIn from '@/views/pages/brand/dashboard#/plug-in'
export default {
  name: 'Dashboard',
  bem: {
    b: 'page-dashboard',
    bCount: 'page-dashboard-count',
    bAdv: 'page-dashboard-adv'
  },
  data() {
    return {
      gutter: 24
    }
  },
  components: {
    DashboardTabs,
    CountCard,
    PlugIn
  }
}
</script>

<style lang="scss" scoped>

</style>
