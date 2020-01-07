<template>
  <st-panel :class="bPage()" app>
    <div :class="bPage('header')">
      <a-input-search
        style="width:722px;"
        placeholder="输入需要核销的兑换码"
        v-model="keyword"
        @search="getCheckinList"
        enterButton="搜索"
      />
    </div>
    <div :class="bPage('shadow')"></div>
    <st-panel app>
      <div v-if="isShowTable">
        <st-table
          :class="bPage('table')"
          :page="false"
          :loading="loading.getCheckinList"
          :columns="columns"
          :dataSource="list"
          rowKey="id"
        >
          <div slot="action" slot-scope="text, record">
            <st-table-actions>
              <st-button
                :disabled="record.code_status !== 0"
                type="primary"
                class="text-center mg-t24"
                @click="checkin"
              >
                核销
              </st-button>
            </st-table-actions>
          </div>
        </st-table>
      </div>
      <div :class="bPage('content')" v-else>
        <img
          :class="bPage('content-img')"
          src="~@/assets/img/brand/marketing/lottery/checkin.png"
          alt="checkin"
        />
        <div :class="bPage('step')">
          <a-steps direction="vertical" :current="4">
            <a-step
              title="搜索卡劵"
              description="核销员输入由客户提供的奖品券号"
            >
              <div slot="icon" :class="bPage('step-circle')">
                <span>1</span>
              </div>
            </a-step>
            <a-step title=" 校验" description="检查券信息是否对应有效">
              <div slot="icon" :class="bPage('step-circle')">
                2
              </div>
            </a-step>
            <a-step
              title="完成使用"
              description="校验无误后向客户进行减免或赠送礼品，并核销卡券"
            >
              <div slot="icon" :class="bPage('step-circle')">
                3
              </div>
            </a-step>
          </a-steps>
          <!-- <div :class="bPage('step-item')">
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
              <st-t4>校验</st-t4>
              <div :class="bPage('step-light')">
                检查券信息是否对应有效
              </div>
            </div>
          </div>
          <div :class="bPage('step-item')">
            <div :class="bPage('step-circle')">
              3
            </div>
            <div :class="bPage('step-text')">
              <st-t4>完成使用</st-t4>
              <div :class="bPage('step-light')">
                校验无误后向客户进行减免或赠送礼品，并核销卡券
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </st-panel>
  </st-panel>
</template>
<script>
import { CheckinService } from './checkin.service'
import { columns } from './checkin.config'
import { MessageService } from '@/services/message.service'

export default {
  name: 'PluginLotteryCheckin',
  data() {
    return {
      keyword: '',
      isShowTable: false
    }
  },
  bem: {
    bPage: 'page-brand-marketing-plugin-lottery-checkin'
  },
  serviceInject() {
    return {
      checkinService: CheckinService,
      message: MessageService
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
      if (!this.keyword) {
        this.message.warn({ content: '请输入核销码' })
        return
      }
      return this.checkinService.getCheckinList(this.keyword).subscribe(res => {
        this.isShowTable = true
      })
    },
    checkin() {
      return this.checkinService.checkin(this.keyword).subscribe(res => {
        this.message.success({ content: '核销成功' })
        this.getCheckinList()
      })
    }
  }
}
</script>
