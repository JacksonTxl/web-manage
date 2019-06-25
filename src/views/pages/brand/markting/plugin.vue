<template>
  <div :class="basic()">
    <div :class="basic('left')">
      <div :class="basic('effect')">
        <header>
          营销效果<img src="~@/assets/img/brand/markting/tip.svg" />
        </header>
        <section>
          <ul>
            <li>
              <p>注册人数<img src="~@/assets/img/brand/markting/register.svg" /></p>
              <ICountUp :endVal="10231"/>
            </li>
            <li>
              <p>交易人数<img src="~@/assets/img/brand/markting/deals.svg" /></p>
              <ICountUp :endVal="231"/>
            </li>
            <li>
              <p>订单总金额<img src="~@/assets/img/brand/markting/money.svg" /></p>
              <ICountUp :endVal="128864" :options="{prefix: '￥'}"/>
            </li>
            <li>
              <p>营销支出金额<img src="~@/assets/img/brand/markting/expend.svg" /></p>
              <ICountUp :endVal="846" :options="{prefix: '￥'}"/>
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
            <li>
              <img src="~@/assets/img/brand/markting/people.svg">
              <div>
                <p>精细化人群</p>
                <p>多维度用户分层，精准营销</p>
              </div>
            </li>
            <li>
              <img src="~@/assets/img/brand/markting/coupon.svg">
              <div>
                <p>优惠券</p>
                <p>优惠抵扣购课费用</p>
              </div>
            </li>
            <li>
              <img src="~@/assets/img/brand/markting/invite.svg">
              <div>
                <p>邀请有礼</p>
                <p>有偿激励员工推广</p>
              </div>
            </li>
            <li>
              <img src="~@/assets/img/brand/markting/slyder.svg">
              <div>
                <p>幸运大转盘</p>
                <p>可发布会员福利，会员参与抽奖</p>
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
          <li>
            <img />
            <p>凭什么它在淡季做活动能卖出30万++</p>
          </li>
          <li>
            <img />
            <p>凭什么它在淡季做活动能卖出30万++</p>
          </li>
          <li>
            <img />
            <p>凭什么它在淡季做活动能卖出30万++</p>
          </li>
          <li>
            <img />
            <p>凭什么它在淡季做活动能卖出30万++</p>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
import { PluginService } from './plugin.service'
export default {
  name: 'BrandMarktingPlugin',
  bem: {
    basic: 'brand-markting-plugin'
  },
  serviceInject() {
    return {
      pluginService: PluginService
    }
  },
  rxState() {
    return {
      info: this.pluginService.info$,
      auth: this.pluginService.auth$
    }
  },
  data() {
    return {
    }
  },
  components: {
  },
  methods: {

  }
}
</script>
