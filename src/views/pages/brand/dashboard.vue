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
                <div class="page-dashboard__chart-figure-primary">
                  <ICountUp :endVal="9999"/>
                </div>
                <div class="page-dashboard__chart-figure-secondary">
                  <span class="color-text-light">本周</span><span class="color-text mg-l8"><ICountUp :endVal="9999"/></span>
                </div>
              </st-panel>
            </a-col>
            <a-col :span="8">
              <st-panel initial class="page-dashboard__chart">
                <h3 class="page-dashboard__chart-title">本月营收（元）</h3>
                <div class="page-dashboard__chart-figure-primary"><ICountUp :endVal="9999"/></div>
                <div class="page-dashboard__chart-figure-secondary">
                  <span class="color-text-light">本周</span><span class="color-text mg-l8"><ICountUp :endVal="9999"/></span>
                </div>
              </st-panel>
            </a-col>
            <a-col :span="8">
              <st-panel initial class="page-dashboard__chart">
                <h3 class="page-dashboard__chart-title">本月消课数（节）</h3>
                <div class="page-dashboard__chart-figure-primary"><ICountUp :endVal="9999"/></div>
                <div class="page-dashboard__chart-figure-secondary">
                  <span class="color-text-light">本周</span><span class="color-text mg-l8"><ICountUp :endVal="9999"/></span>
                </div>
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
                  <div class="page-dashboard__shop-img" :style="`background-image: url('${shop.image_url}')`">
                    <h4 class="page-dashboard__shop-name">{{shop.shop_name}}</h4>
                    <div class="page-dashboard__shop-status">
                      <st-tag type="shop-trial" />
                    </div>
                  </div>
                  <div class="page-dashboard__shop-info">
                    <div class="page-dashboard__shop-address">
                      {{shop.address}}
                    </div>
                    <div class="page-dashboard__shop-tel">{{shop.shop_tel}}</div>
                    <div class="mg-t24">
                      <label class="page-dashboard__shop-label">会员</label>
                      <span>{{shop.members}}人</span>
                      <label class="page-dashboard__shop-label mg-l40">员工</label>
                      <span>{{shop.staffs}}人</span>
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
                <div class="page-dashboard__add-shop cursor-pointer">
                  <div class="page-dashboard__placeholder"></div>
                  <div class="page-dashboard__add-shop-content ta-c">
                    <div class="page-dashboard__add-shop-icon"><st-icon type="add"></st-icon></div>
                    <div class="page-dashboard__add-shop-text">添加门店</div>
                  </div>
                </div>
              </st-panel>
            </a-col>
          </a-row>
          <p class="ta-c mg-t24">
            <a-pagination showSizeChanger :defaultCurrent="page.current_page"
              :total="page.total_counts" @change="onPageChange"/>
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
          <a href="#" class="page-dashboard__link-item">
            在线咨询
            <span class="page-dashboard__link-icon page-dashboard__link-icon--wechat">
              <st-icon type="wechat"></st-icon>
            </span>
          </a>
          <a href="#" class="page-dashboard__link-item">
            最新功能
            <span class="page-dashboard__link-icon">
              <st-icon type="arrow-right-double"></st-icon>
            </span>
          </a>
          <a href="#" class="page-dashboard__link-item">
            帮助中心
            <span class="page-dashboard__link-icon">
              <st-icon type="arrow-right-double"></st-icon>
            </span>
          </a>
          <st-button block pill type="primary" icon="add" size="large">添加门店</st-button>
        </section>
      </a-col>
      <!-- right end -->
    </a-row>

  </div>
</template>
<script>
import { imgFilter } from '@/filters/resource.filters'
import { DashboardService } from './dashboard.service'
export default {
  serviceInject() {
    return {
      dashboardService: DashboardService
    }
  },
  data() {
    return {
      shopList: [],
      page: {}
    }
  },
  filters: {
    imgFilter
  },
  subscriptions() {
    const shopList = this.dashboardService.shopInfo$
    const page = this.dashboardService.page$
    return {
      shopList,
      page
    }
  },
  created() {
    this.shopList = this.shopListHandler(this.shopList)
  },
  methods: {
    shopListHandler(list) {
      return list.map(item => {
        item.image_url = imgFilter(item.image_url, {
          w: 640,
          h: 360
        })
        return item
      })
    },
    onPageChange(pageNumber) {
      console.log(pageNumber)
    }
  }
}

</script>
