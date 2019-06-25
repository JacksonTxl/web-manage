<template>
  <a-row :class="b()" :gutter="24">
    <a-col :class="bCount()" :lg="18">
      <st-panel title="概况">
        <div slot="actions">
          最近更新时间：2019-04-02 12:38  <st-icon type="switch"></st-icon>
        </div>
        <a-row :class="bCount('title')">
          <a-col :lg="3">

          </a-col>
          <a-col :lg="5">
            新增用户数(人)
          </a-col>
          <a-col :lg="5">
            营收额(万元)
          </a-col>
          <a-col :lg="5">
            总消课(节)
          </a-col>
          <a-col :lg="6">
            客流量(人)
          </a-col>
        </a-row>
        <a-row class="mg-t24 count1">
          <a-col :class="bCount('date')" :lg="3">
            今日
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            4,298
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            10,231
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            9,231
          </a-col>
          <a-col :class="bCount('count')" :lg="6">
            9,332
          </a-col>
        </a-row>
        <a-row class="mg-t32 count2">
          <a-col  :class="bCount('date')" :lg="3">
              昨日
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            3,897
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            9,956
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            10,056
          </a-col>
          <a-col :class="bCount('count')" :lg="6">
            10,908
          </a-col>
        </a-row>
        <a-row class="mg-t32 count3">
          <a-col  :class="bCount('date')" :lg="3">
            近7日
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            27,279
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            69,692
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            9,600
          </a-col>
          <a-col :class="bCount('count')" :lg="6">
            76,356
          </a-col>
        </a-row>
        <a-row class="mg-t32 count4">
          <a-col  :class="bCount('date')" :lg="3">
            近三十日
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            109,116
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            278,768
          </a-col>
          <a-col :class="bCount('count')" :lg="5">
            9,210
          </a-col>
          <a-col :class="bCount('count')" :lg="6">
            305,424
          </a-col>
        </a-row>
      </st-panel>
      <st-panel class="mg-t16" >
        <div slot="title">
          <div>
            <a-radio-group defaultValue="a" buttonStyle="solid">
              <a-radio-button value="a">今天</a-radio-button>
              <a-radio-button value="b">昨天</a-radio-button>
              <a-radio-button value="c">近30天</a-radio-button>
              <a-radio-button value="d">近90天</a-radio-button>
              <a-radio-button value="d">自定义</a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <a-row>
          <a-col :span="14">
            <st-t3>营销漏斗</st-t3>
          </a-col>
          <a-col :span="10">
            <st-t3>新增入会用户</st-t3>
          </a-col>
        </a-row>
      </st-panel>
      <st-panel class="mg-t16" >
        <div slot="title">
          <div>
            <a-radio-group defaultValue="a" buttonStyle="solid">
              <a-radio-button value="a">今天</a-radio-button>
              <a-radio-button value="b">昨天</a-radio-button>
              <a-radio-button value="c">近30天</a-radio-button>
              <a-radio-button value="d">近90天</a-radio-button>
              <a-radio-button value="d">自定义</a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <a-row>
          <a-col :span="14">
            <st-t3>上课分析</st-t3>
          </a-col>
          <a-col :span="10">
            <st-t3>售课消课</st-t3>
          </a-col>
        </a-row>
      </st-panel>
      <st-panel class="mg-t16" >
        <div slot="title">
          <div>
            <a-radio-group defaultValue="a" buttonStyle="solid">
              <a-radio-button value="a">今天</a-radio-button>
              <a-radio-button value="b">昨天</a-radio-button>
              <a-radio-button value="c">近30天</a-radio-button>
              <a-radio-button value="d">近90天</a-radio-button>
              <a-radio-button value="d">自定义</a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <a-row>
          <a-col :span="14">
            <st-t3>入场人数</st-t3>
          </a-col>
          <a-col :span="10">
            <st-t3>入场人数</st-t3>
          </a-col>
        </a-row>
      </st-panel>
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
      <st-container class="book bg-white mg-t16" type="2">
        <div class="book-img">
          <img src="" alt="">
        </div>

        <div class="book-content  mg-l24">
          <span>2018中国健身行业数据报告</span>
          <a href="javascript:;">¥499</a>
          <st-button ghost pill type="primary" class="mg-t8">免费下载电子版</st-button>
        </div>
      </st-container>
      <st-container class="aiot bg-white mg-t16" type="2">
        <div class="aiot__img">
          <img src="" alt="">
        </div>
        <div class="aiot__content mg-l24">
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

</template>
<script>
export default {
  name: 'Dashboard',
  bem: {
    b: 'page-shop-dashboard',
    bCount: 'page-shop-dashboard-count',
    bAdv: 'page-shop-dashboard-adv'
  },
  data() {
    return {
      gutter: 24
    }
  }
}
</script>
