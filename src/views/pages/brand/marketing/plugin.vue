<template>
  <div :class="basic()">
    <div :class="basic('main')">
      <div :class="basic('effect')">
        <header>
          营销效果
        </header>
        <section>
          <ul v-if="info.num">
            <li>
              <p>
                注册人数
                <img src="~@/assets/img/brand/marketing/register.svg" />
              </p>
              <span class="font-number">{{ info.num.register_num }}</span>
            </li>
            <li>
              <p>
                交易人数
                <img src="~@/assets/img/brand/marketing/deals.svg" />
              </p>
              <span class="font-number">{{ info.num.trade_num }}</span>
            </li>
            <li>
              <p>
                订单总金额
                <img src="~@/assets/img/brand/marketing/money.svg" />
              </p>
              <ICountUp
                class="font-number"
                :endVal="+info.num.order_amount"
                :options="{ prefix: '<b>￥</b>' }"
                v-if="info.num.order_amount"
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
                :endVal="+info.num.expend_amount"
                :options="{ prefix: '<b>￥</b>' }"
                v-if="info.num.expend_amount"
              />
              <span v-else>--</span>
            </li>
          </ul>
        </section>
      </div>

      <section :class="section()" class="brand-marketing-section--play">
        <div :class="section('hd')">
          <st-t2 :class="section('title')">营销玩法</st-t2>
          <label :class="section('label')">拉新、促进成单</label>
        </div>
        <div :class="section('bd')">
          <a-row :gutter="16">
            <a-col
              :xxl="6"
              :xl="8"
              :xs="12"
              v-for="(item, index) in pluginList"
              :key="index"
              @click="goToPlugin(item.route)"
            >
              <div :class="card()">
                <img :class="card('img')" :src="item.img" />
                <div :class="card('content')">
                  <st-t3 :class="card('title')">{{ item.plugin_name }}</st-t3>
                  <p :class="card('desc')">{{ item.plugin_text }}</p>
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
      </section>
    </div>

    <section :class="sider()">
      <header>
        <st-t3 :class="sider('title')">运营玩法</st-t3>
        <label :class="sider('label')">案例分享</label>
      </header>
      <div :class="sider('bd')">
        <ul :class="sider('list')">
          <li
            v-for="(item, index) in info.operation"
            :key="index"
            @click="goLink(item.link)"
          >
            <img :src="item.thumb | imgFilter({ w: 280 })" />
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
      this.$route.push({ name: route })
    }
  }
}
</script>
