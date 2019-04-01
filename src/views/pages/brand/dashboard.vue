<template>
  <div>
    <a-row :gutter="24" class="page-dashboard">
      <!-- left -->
      <a-col :span="19">
        <!-- 统计图表 -->
        <section>
          <a-row :gutter="24">
            <a-col :span="8">
              <st-panel initial class="page-dashboard__chart">
                <h3 class="page-dashboard__chart-title">2月用户数（人）</h3>
              </st-panel>
            </a-col>
            <a-col :span="8">
              <st-panel initial class="page-dashboard__chart">
                <h3 class="page-dashboard__chart-title">本月营收（元）</h3>
              </st-panel>
            </a-col>
            <a-col :span="8">
              <st-panel initial class="page-dashboard__chart">
                <h3 class="page-dashboard__chart-title">本月消课数（节）</h3>
              </st-panel>
            </a-col>
          </a-row>
        </section>
        <!-- 统计图表 end -->
        <section class="mg-t16">
          <a-row :gutter="24">
            <a-col :span="8" v-for="(shop, index) in shopList" :key="index">
              <st-panel initial>
                <div class="page-dashboard__shop">
                  <div class="page-dashboard__shop-img" :style="`background-image: url('${shop.shop_img}')`">
                    <h4 class="page-dashboard__shop-name">{{shop.shop_name}}</h4>
                    <div class="page-dashboard__shop-status">
                      <st-tag type="shop-trial" />
                    </div>
                  </div>
                  <div class="page-dashboard__shop-info">
                    <div class="page-dashboard__shop-address">{{shop.shop_address}}</div>
                    <div class="page-dashboard__shop-tel">{{shop.shop_tel}}</div>
                    <div>
                      <label class="page-dashboard__shop-label">会员</label>
                      <span>{{shop.shop_member_num}}人</span>
                      <label class="page-dashboard__shop-label mg-l40">员工</label>
                      <span>{{shop.shop_staff_num}}人</span>
                    </div>
                  </div>
                  <div class="page-dashboard__action">
                    <a-row>
                      <a-col :span="16">
                        <a href="#" class="st-link-secondary">查看</a>
                        <a href="#" class="mg-l24 st-link-secondary">编辑</a>
                        <a href="#" class="mg-l24 st-link-secondary">更改状态</a>
                      </a-col>
                      <a-col :span="8" class="text-right">
                        <st-button pill type="primary" size="small">进入门店</st-button>
                      </a-col>
                    </a-row>
                  </div>
                </div>
              </st-panel>
            </a-col>
            <a-col :span="8">
              <st-panel initial>
                <div class="page-dashboard__placeholder"></div>
                <div class="page-dashboard__add-shop">
                  <p class="page-dashboard__add-shop-text">添加门店</p>
                </div>
              </st-panel>
            </a-col>
          </a-row>
          <p class="centered mg-t24">
            <a-pagination showSizeChanger :defaultCurrent="1" :total="500" @change="onPageChange" />
          </p>
        </section>
      </a-col>
      <!-- left end -->
      <!-- right -->
      <a-col :span="5">
        <section>
          <st-panel initial>
            <a href="#">
              <img class="full-width" src="https://pic3-s.styd.cn/o_1d78oa7b95lp1l291etkv7h1fk7m.jpg?imageView2/1/w/300/h/170/interlace/1" alt="广告位">
            </a>
          </st-panel>
        </section>
        <section class="mg-t16">
          <st-panel initial>
            <a href="#">
              <img class="full-width" src="https://pic3-s.styd.cn/o_1d78oa7b95lp1l291etkv7h1fk7m.jpg?imageView2/1/w/300/h/170/interlace/1" alt="广告位">
            </a>
          </st-panel>
        </section>
        <section class="mg-t16">
          <a href="#" class="page-dashboard__link-item">在线咨询</a>
          <a href="#" class="page-dashboard__link-item">成功案例</a>
          <a href="#" class="page-dashboard__link-item">最新功能</a>
          <a href="#" class="page-dashboard__link-item">评价与反馈</a>
          <a href="#" class="page-dashboard__link-item">帮助中心</a>
          <st-button block pill type="primary" icon="plus" size="large">添加门店</st-button>
        </section>
      </a-col>
      <!-- right end -->
    </a-row>

  </div>
</template>
<script>
import { imgFilter } from '@/filters/resource.filters'
export default {
  data() {
    return {
      shopList: []
    }
  },
  created() {
    this.getShopList()
  },
  methods: {
    getShopList() {
      const shopList = [{
        shop_id: 1000000,
        shop_img: 'o_1d78oa7b911lb6bq1ogh6v61nbkk.jpg',
        shop_name: '三体云动上海店',
        shop_address: '上海市徐汇区古美路1528号后鸿源中心',
        shop_tel: '022-28282828',
        shop_member_num: 100,
        shop_staff_num: 10
      }, {
        shop_id: 1000001,
        shop_img: 'o_1d78oa7b9kuj135b1ipq1cvf1k0rl.jpg',
        shop_name: '三体云动北京店',
        shop_address: 'xxxxxxxxx',
        shop_tel: '010-28282828',
        shop_member_num: 200,
        shop_staff_num: 18
      }]
      shopList.map(shop => {
        shop.shop_img = imgFilter(shop.shop_img, { w: 500, h: 300 })
        return shop
      })
      this.shopList = shopList
    },
    onPageChange() {

    }
  }
}
</script>
