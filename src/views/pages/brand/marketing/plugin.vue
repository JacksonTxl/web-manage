<template>
  <div :class="basic()">
    <st-panel-layout :class="basic('main')">
      <div :class="basic('effect')">
        <div :class="basic('effect-updata')">
          <st-t2>
            <div>
              营销效果
              <st-help-tooltip id="MDYXCJ001" />
            </div>
          </st-t2>
          // NOTE: 崔庆修复
          <!-- <st-refresh-btn :action="refresh"></st-refresh-btn> -->
        </div>
        <section>
          <ul v-if="num">
            <li>
              <p>
                注册人数
                <img src="~@/assets/img/brand/marketing/register.svg" />
              </p>
              <span class="font-number">{{ num.register_num }}</span>
            </li>
            <li>
              <p>
                交易人数
                <img src="~@/assets/img/brand/marketing/deals.svg" />
              </p>
              <span class="font-number">{{ num.trade_num }}</span>
            </li>
            <li>
              <p>
                订单总金额
                <img src="~@/assets/img/brand/marketing/money.svg" />
              </p>
              <ICountUp
                class="font-number"
                :endVal="+num.order_amount"
                :options="{ prefix: '<b>￥</b>' }"
                v-if="num.order_amount"
              />
              <span v-else>--</span>
            </li>
            <li>
              <p>
                营销支出金额
                <img src="~@/assets/img/brand/marketing/expend.svg" />
              </p>
              <ICountUp
                class="font-number"
                :endVal="+num.expend_amount"
                :options="{ prefix: '<b>￥</b>' }"
                v-if="num.expend_amount"
              />
              <span v-else>--</span>
            </li>
          </ul>
        </section>
      </div>

      <st-panel
        app
        initial
        :class="section()"
        class="brand-marketing-section--play"
      >
        <div :class="section('hd')">
          <st-t2 :class="section('title')">营销玩法</st-t2>
          <label :class="section('label')">拉新、促进成单</label>
        </div>
        <div :class="section('bd')">
          <a-row :gutter="16">
            <a-col
              :xxl="6"
              :xl="8"
              :span="12"
              v-for="(item, index) in pluginList"
              :key="index"
              @click="goToPlugin(item.redirect_url, item.plugin_type)"
            >
              <div :class="card()">
                <img
                  :class="card('img')"
                  :src="
                    `https://styd-frontend.oss-cn-shanghai.aliyuncs.com/` +
                      item.icon
                  "
                />
                <div :class="card('content')">
                  <st-t3 :class="card('title')">{{ item.plugin_name }}</st-t3>
                  <p :class="card('desc')">{{ item.plugin_text }}</p>
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
      </st-panel>
    </st-panel-layout>

    <section :class="sider()">
      <header>
        <st-t3 :class="sider('title')">运营玩法</st-t3>
        <label :class="sider('label')">案例分享</label>
      </header>
      <div :class="sider('bd')">
        <ul :class="sider('list')">
          <li
            v-for="(item, index) in operation"
            :key="index"
            @click="goLink(item.link)"
          >
            <img :src="item.thumb | imgFilter({ w: 208, h: 117 })" />
            <p>{{ item.title }}</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
import { PluginService } from './plugin.service'
export default {
  name: 'BrandMarketingPlugin',
  bem: {
    basic: 'brand-marketing-plugin',
    sider: 'brand-marketing-sider',
    section: 'brand-marketing-section',
    card: 'brand-marketing-card'
  },
  serviceInject() {
    return {
      pluginService: PluginService
    }
  },
  rxState() {
    return {
      info: this.pluginService.info$,
      operation: this.pluginService.operation$,
      num: this.pluginService.num$,
      pluginList: this.pluginService.pluginList$
    }
  },
  methods: {
    goLink(url) {
      window.open(url)
    },
    getInfo() {
      this.pluginService.getInfo().subscribe()
    },
    goToPlugin(route) {
      this.$router.push({ name: route })
    },
    refresh() {
      return this.pluginService.getMarktingNumInfo()
    }
  }
}
</script>
