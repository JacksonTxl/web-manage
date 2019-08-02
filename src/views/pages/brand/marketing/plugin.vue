<template>
  <div :class="basic()">
    <div :class="basic('left')">
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
              <ICountUp
                class="font-number"
                :endVal="+info.num.register_num"
                v-if="info.num.register_num"
              />
              <span v-else>--</span>
            </li>
            <li>
              <p>
                交易人数
                <img src="~@/assets/img/brand/marketing/deals.svg" />
              </p>
              <ICountUp
                class="font-number"
                :endVal="+info.num.people_num"
                v-if="info.num.people_num"
              />
              <span v-else>--</span>
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
                :endVal="+info.num.spend_amount"
                :options="{ prefix: '<b>￥</b>' }"
                v-if="info.num.spend_amount"
              />
              <span v-else>--</span>
            </li>
          </ul>
        </section>
      </div>
      <div :class="basic('play')">
        <header>
          <label>营销玩法</label>
          <label>拉新、促进成单</label>
        </header>
        <section>
          <ul>
            <li
              v-for="(item, index) in info.marketing"
              :key="index"
              @click="goToPlugin(item.plugin_type)"
            >
              <img
                v-if="item.plugin_type === '4'"
                src="~@/assets/img/brand/marketing/people.svg"
              />
              <img
                v-if="item.plugin_type === '1'"
                src="~@/assets/img/brand/marketing/coupon.svg"
              />
              <img
                v-if="item.plugin_type === '2'"
                src="~@/assets/img/brand/marketing/invite.svg"
              />
              <img
                v-if="item.plugin_type === '3'"
                src="~@/assets/img/brand/marketing/slyder.svg"
              />
              <div>
                <p>{{ item.plugin_name }}</p>
                <p>{{ item.plugin_text }}</p>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
    <div :class="basic('right')">
      <header>
        <label>运营玩法</label>
        <label>案例分享</label>
      </header>
      <section>
        <ul>
          <li
            v-for="(item, index) in info.operation"
            :key="index"
            @click="goLink(item.link)"
          >
            <img :src="item.thumb" />
            <p>{{ item.title }}</p>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
import { PluginService } from './plugin.service'
export default {
  name: 'BrandMarketingPlugin',
  bem: {
    basic: 'brand-marketing-plugin'
  },
  serviceInject() {
    return {
      pluginService: PluginService
    }
  },
  rxState() {
    return {
      info: this.pluginService.info$
    }
  },
  created() {
    this.getInfo()
  },
  data() {
    return {}
  },
  components: {},
  methods: {
    goLink(url) {
      window.open(url)
    },
    getInfo() {
      this.pluginService.getInfo().subscribe()
    },
    // filterTypeImg(value) {
    //   let typeName='people';
    //   switch(value) {
    //     case 0:
    //       typeName = 'people';
    //       break;
    //     case 1:
    //       typeName = 'coupon';
    //       break;
    //     case 2:
    //       typeName = 'invite';
    //       break;
    //     case 3:
    //       typeName = 'slyder';
    //       break;
    //   }
    //   return expand;
    // }
    goToPlugin(type) {
      const map = {
        1: 'brand-marketing-plugin-coupon-list',
        2: 'brand-marketing-plugin-invitation-index-data',
        4: 'brand-marketing-plugin-crowd-index'
      }
      if (map.hasOwnProperty(type)) {
        this.$router.push({
          name: map[type]
        })
      }
    }
  }
}
</script>
