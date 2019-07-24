<template>
  <div :class="bPage()">
    <div slot="title">
      <st-input-search
        @search="onSearchKeyWords"
        v-model="query.search"
        class="mg-b24"
        style="width: 290px;"
        placeholder="请输入姓名或手机号查找"
      ></st-input-search>
    </div>
    <div slot="prepend" class="mg-b24">
      <st-search-panel>
        <div :class="bSelect()">
          <span style="width:90px;">通知对象:</span>
          <st-search-radio v-model="query.send_status" :list="orderStatusList" />
        </div>
        <div :class="bSelect()">
          <span style="width:90px;">发送状态：</span>
          <st-search-radio v-model="query.send_status" :list="payStatusList" />
        </div>
        <div :class="bSelect()">
          <span style="width:90px;">发送时间：</span>
          <a-date-picker
            format="YYYY-MM-DD"
            placeholder="开始日期"
            :showToday="false"
            v-model="query.start_time"
            @change="startdatePickerChange"
          />&nbsp;~&nbsp;
          <a-date-picker
            format="YYYY-MM-DD"
            placeholder="结束日期"
            :showToday="false"
            v-model="query.end_time"
            @change="enddatePickerChange"
          />
        </div>
        <div slot="button">
          <st-button type="primary" @click="onSearch">查询</st-button>
          <st-button class="mgl-8" @click="onSearhReset">重置</st-button>
        </div>
      </st-search-panel>
    </div>

    <st-table
      :page="page"
      @change="onTableChange"
      :loading="loading.getList"
      :columns="columns"
      :dataSource="resData.list"
      rowKey="id"
    ></st-table>
  </div>
</template>
<script>
import { RouteService } from '@/services/route.service'
import { PayService } from './pay.service'
import { columns } from './pay.config.ts'
import tableMixin from '@/mixins/table.mixin'
const pageName = 'page-setting-sms-pay'

export default {
  mixins: [tableMixin],
  bem: {
    bPage: pageName,
    bSelect: `${pageName}-select`
  },
  serviceInject() {
    return {
      routeService: RouteService,
      PayService: PayService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      authTabs: this.PayService.authTabs$,
      loading: this.PayService.loading$,
      page: this.PayService.page$
    }
  },
  computed: {
    columns
  },
  data() {
    return {
      resData: {
        list: [
          {
            created_time: '12212'
          }
        ]
      },
      orderStatusList: [],
      payStatusList: []
    }
  },
  methods: {
    getList() {},
    onSearchKeyWords() {
      this.$events.emit(
        `${this.$route.name}:onSingleSearch`,
        'search',
        this.query.search,
        { keyword: true }
      )
    },
    startdatePickerChange() {},
    enddatePickerChange() {}
  }
}
</script>
