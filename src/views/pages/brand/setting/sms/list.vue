<template>
  <div :class="bPage()">
    <div slot="title">
      <st-input-search
        @search="onSingleSearch('search',query.search,{keyword:true})"
        v-model="query.search"
        class="mg-b24"
        style="width: 290px;"
        placeholder="请输入姓名或手机号查找"
      ></st-input-search>
    </div>
    <div slot="prepend" class="mg-b24">
      <st-search-panel>
        <div :class="bSelect()">
          <span :class="bSelect('label')">通知对象:</span>
          <st-search-radio :class="bSelect('val')" v-model="query.notify_type" :list="notifyType" />
        </div>
        <div :class="bSelect()">
          <span :class="bSelect('label')">发送状态：</span>
          <st-search-radio :class="bSelect('val')" v-model="query.send_status" :list="sendStatus" />
        </div>
        <div :class="bSelect()">
          <span :class="bSelect('label')">发送时间：</span>
          <div :class="bSelect('val')">
            <!-- <a-date-picker
              format="YYYY-MM-DD"
              placeholder="开始日期"
              :showToday="false"
              v-model="start_date"
              @change="startdatePickerChange"
            />&nbsp;~&nbsp;
            <a-date-picker
              format="YYYY-MM-DD"
              placeholder="结束日期"
              :showToday="false"
              @change="enddatePickerChange"
            /> -->
             <st-range-picker :value="selectTime"></st-range-picker>
          </div>
        </div>
        <div slot="button">
          <st-button type="primary" @click="onSearchList">查询</st-button>
          <st-button class="mgl-8" @click="onSearhReset">重置</st-button>
        </div>
      </st-search-panel>
    </div>

    <st-table
      :page="page"
      :loading="loading.getSmsList"
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
      listService: ListService,
      userService: UserService
    }
  },
  rxState() {
    const user = this.userService
    return {
      query: this.routeService.query$,
      loading: this.listService.loading$,
      page: this.listService.page$,
      list: this.listService.list$,
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
      selectTime: {
        startTime: {
          showTime: false,
          disabledBegin: null,
          placeholder: '开始日期',
          disabled: false,
          value: null,
          format: 'YYYY-MM-DD',
          change: ($event) => { }
        },
        endTime: {
          showTime: false,
          placeholder: '结束日期',
          disabled: false,
          value: null,
          format: 'YYYY-MM-DD',
          change: ($event) => {}
        }
      },
      orderStatusList: [],
      payStatusList: [],
      start_date: null,
      end_date: null
    }
  },
  created() {},
  methods: {
    onSearchList() {
      this.query.start_time = this.selectTime.startTime.value ? `${this.selectTime.startTime.value.format('YYYY-MM-DD')}` : ''
      this.query.end_time = this.selectTime.endTime.value ? `${this.selectTime.endTime.value.format('YYYY-MM-DD')}` : ''
      this.onSearch({ ...this.query })
    },

    startdatePickerChange(date, dateString) {
      this.query.start_time = dateString
    },
    enddatePickerChange(date, dateString) {
      this.query.end_time = dateString
    }
  }
}
</script>
