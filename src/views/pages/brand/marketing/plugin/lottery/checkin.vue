<template>
  <div :class="bPage()">
    <div :class="bPage('header')">
      <a-input-search
        style="width:722px"
        placeholder="输入需要核销的兑换码"
        v-model="keyword"
        @search="getCheckinList"
        enterButton="搜索"
      />
    </div>
    <div :class="bPage('shadow')"></div>
    <st-panel app>
      <div v-if="list.length > 0">
        <st-table
          :class="bPage('table')"
          :page="false"
          :loading="loading.getCheckinList"
          :columns="columns"
          :dataSource="list"
          rowKey="id"
        ></st-table>
        <div :class="bPage('checkin-btn')">
          <st-button
            type="primary"
            :disabled="list.code_status !== 1"
            class="text-center mg-t24"
            @click="checkin"
          >
            核销
          </st-button>
        </div>
      </div>
      <div :class="bPage('content')" v-else>
        <img
          :class="bPage('content-img')"
          src="~@/assets/img/brand/marketing/lottery/checkin.png"
          alt="checkin"
        />
        <div :class="bPage('step')">
          <div :class="bPage('step-item')">
            <div :class="bPage('step-circle')">
              1
            </div>
            <div :class="bPage('step-text')">
              <st-t4>搜索卡劵</st-t4>
              <div :class="bPage('step-light')">
                核销员输入由客户提供的奖品券号
              </div>
            </div>
          </div>
          <div :class="bPage('step-item')">
            <div :class="bPage('step-circle')">
              2
            </div>
            <div :class="bPage('step-text')">
              <st-t4>搜索卡劵</st-t4>
              <div :class="bPage('step-light')">
                核销员输入由客户提供的奖品券号
              </div>
            </div>
          </div>
          <div :class="bPage('step-item')">
            <div :class="bPage('step-circle')">
              3
            </div>
            <div :class="bPage('step-text')">
              <st-t4>搜索卡劵</st-t4>
              <div :class="bPage('step-light')">
                核销员输入由客户提供的奖品券号
              </div>
            </div>
          </div>
        </div>
      </div>
    </st-panel>
  </div>
</template>
<script>
import { CheckinService } from './checkin.service'
import { columns } from './checkin.config'
export default {
  name: 'PluginLotteryCheckin',
  data() {
    return {
      list: [],
      keyword: ''
    }
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
      list: this.checkinService.list$,
      loading: this.checkinService.loading$
    }
  },
  computed: { columns },
  methods: {
    getCheckinList() {
      return this.checkinService.getCheckinList(this.keyword).subscribe(res => {
        this.list = res.list
      })
    },
    checkin() {
      return this.checkinService.checkin(this.keyword).subscribe(res => {})
    }
  }
}
</script>
