<template>
  <div :class="bPage()">
    <st-panel app>
      <div :class="bPage('header')">
        <st-input-search
          placeholder="可输入姓名、手机号、卡号"
          style="width: 300px;"
          @search="checkin"
        />
      </div>
      <div :class="bPage('shadow')"></div>
      <div :class="bPage('content')">
        <img
          src="~@/assets/img/brand/marketing/lottery/checkin.png"
          alt="checkin"
        />
        <div :class="bPage('step')">
          <div :class="bPage('step-item')">
            <div :class="bPage('step-circle')">
              1
            </div>
            <div :class="bPage('step-text')">
              <st-t2>搜索卡劵</st-t2>
              <div>核销员输入由客户提供的奖品券号</div>
            </div>
          </div>
          <div :class="bPage('step-item')">
            <div :class="bPage('step-circle')">
              2
            </div>
            <div :class="bPage('step-text')">
              <st-t2>搜索卡劵</st-t2>
              <div>核销员输入由客户提供的奖品券号</div>
            </div>
          </div>
          <div :class="bPage('step-item')">
            <div :class="bPage('step-circle')">
              3
            </div>
            <div :class="bPage('step-text')">
              <st-t2>搜索卡劵</st-t2>
              <div>核销员输入由客户提供的奖品券号</div>
            </div>
          </div>
        </div>
      </div>
      <div :class="bPage('content')">
        <st-table></st-table>
        <st-button type="primary">核销</st-button>
      </div>
    </st-panel>
  </div>
</template>
<script>
import { CheckinService } from './checkin.service'

export default {
  name: 'PluginLotteryCheckin',
  data() {
    return {}
  },
  bem: {
    bPage: 'brand-marketing-plugin-lottery-checkin'
  },
  serviceInject() {
    return {
      checkinService: CheckinService
    }
  },
  rxState() {
    return {
      list: this.checkinService.list$
    }
  },
  methods: {
    checkin() {
      return this.checkinService.checkin()
    }
  }
}
</script>
