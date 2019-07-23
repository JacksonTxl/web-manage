<template>
  <div class="sms">
    <div class="sms__head">
      <st-input-search @search="onSearchKeyWords" v-model="query.search" placeholder="请输入姓名或手机号查找"></st-input-search>
      <st-search-panel>
        <div >
          <span style="width:90px;">通知对象:</span>
          <st-search-radio v-model="query.send_status" :list="orderStatusList" />
        </div>
        <div >
          <span style="width:90px;">发送状态：</span>
          <st-search-radio v-model="query.send_status" :list="payStatusList" />
        </div>
        <div >
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
    <st-form-table class="mg-t8">
      <thead>
        <tr>
          <th>发送时间</th>
          <th>状态</th>
          <th>通知对象</th>
          <th>短信模板</th>
          <th>姓名</th>
          <th>手机号</th>
          <th>内容</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in resData.list" :key="index">
          <td>{{item.created_time}}</td>
          <td>{{item.send_status}}</td>
          <td>通知对象</td>
          <td>短信模版</td>
          <td>{{item.updated_time}}</td>
          <td>{{item.member_name}}</td>
          <td>{{item.mobile}}</td>
          <td>{{item.content}}</td>
        </tr>
      </tbody>
    </st-form-table>
  </div>
</template>
<script>
import { RouteService } from '@/services/route.service'

import { SmsService } from './sms.service'
export default {
  serviceInject() {
    return {
      routeService: RouteService,
      SmsService: SmsService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      authTabs: this.SmsService.authTabs$
    }
  },
  data() {
    return {
      resData: {
        list: [
          {
            created_time: '12212'
          }
        ]
      }
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
    }
  }
}
</script>
