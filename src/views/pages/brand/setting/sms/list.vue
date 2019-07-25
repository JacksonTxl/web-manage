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
          <st-search-radio v-model="query.notify_type" :list="notifyType" />
        </div>
        <div :class="bSelect()">
          <span style="width:90px;">发送状态：</span>
          <st-search-radio v-model="query.send_status" :list="sendStatus" />
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
      :columns="columns"
      :dataSource="list"
      rowKey="id"
    >
      <template slot="send_status" slot-scope="text,record">{{record.send_status.name}}</template>
      <template slot="notify_type" slot-scope="text,record">{{record.notify_type.name}}</template>
      <template slot="notify_sub_type" slot-scope="text,record">{{record.notify_sub_type.name}}</template>
    </st-table>
  </div>
</template>
<script>
import { RouteService } from '@/services/route.service'
import { ListService } from './list.service'
import { columns } from './list.config.ts'
import { UserService } from '@/services/user.service'

import tableMixin from '@/mixins/table.mixin'
const pageName = 'page-setting-sms-list'

export default {
  mixins: [tableMixin],
  bem: {
    bPage: pageName,
    bSelect: `${pageName}-select`
  },
  serviceInject() {
    return {
      routeService: RouteService,
      ListService: ListService,
      userService: UserService
    }
  },
  rxState() {
    const user = this.userService
    return {
      query: this.routeService.query$,
      loading: this.ListService.loading$,
      page: this.ListService.page$,
      list: this.ListService.list$,
      settingEnums: user.settingEnums$
    }
  },
  computed: {
    columns,
    notifyType() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.settingEnums.notify_type) return list
      Object.entries(this.settingEnums.notify_type.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    },
    sendStatus() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.settingEnums.send_status) return list
      Object.entries(this.settingEnums.send_status.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
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
      },
      orderStatusList: [],
      payStatusList: []
    }
  },
  created() {
    this.onSearch()
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
