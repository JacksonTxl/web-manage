<template>
  <div :class="bPage()">
    <st-input-search
      :class="bPage('input-search')"
      @search="onSingleSearch('search', $searchQuery.search, { keyword: true })"
      v-model="$searchQuery.search"
      placeholder="请输入姓名或手机号查找"
    ></st-input-search>
    <st-search-panel @search="onSearchList" @reset="onSearhReset">
      <st-search-panel-item label="通知对象：">
        <st-search-radio
          v-model="$searchQuery.notify_type"
          :options="notifyType"
        />
      </st-search-panel-item>
      <st-search-panel-item label="发送状态：">
        <st-search-radio
          v-model="$searchQuery.send_status"
          :options="sendStatus"
        />
      </st-search-panel-item>
      <st-search-panel-item label="发送时间：">
        <st-range-picker
          :disabledDays="180"
          v-model="selectTime"
        ></st-range-picker>
      </st-search-panel-item>
    </st-search-panel>

    <div class="pd-24">
      <st-table
        :page="page"
        :loading="loading.getSmsList"
        @change="onTableChange"
        :columns="columns"
        :dataSource="list"
        rowKey="id"
        :class="bPage('table')"
      >
        <template slot="send_status" slot-scope="text, record">
          {{ record.send_status.name }}
        </template>
        <template slot="notify_type" slot-scope="text, record">
          {{ record.notify_type.name }}
        </template>
        <template slot="notify_sub_type" slot-scope="text, record">
          {{ record.notify_sub_type.name }}
        </template>
      </st-table>
    </div>
  </div>
</template>
<script>
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
      listService: ListService
    }
  },
  rxState() {
    return {
      loading: this.listService.loading$,
      page: this.listService.page$,
      list: this.listService.list$,
      notifyType: this.listService.notifyType$,
      sendStatus: this.listService.sendStatus$
    }
  },
  computed: {
    columns
  },
  created() {
    let list = [{ value: -1, label: '全部' }]
    this.notifyType = list.concat(this.notifyType)
    this.sendStatus = list.concat(this.sendStatus)
  },
  mounted() {
    this.setSearchData()
  },
  watch: {
    query(newVal) {
      this.setSearchData()
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
          change: $event => {}
        },
        endTime: {
          showTime: false,
          placeholder: '结束日期',
          disabled: false,
          value: null,
          format: 'YYYY-MM-DD',
          change: $event => {}
        }
      },
      orderStatusList: [],
      payStatusList: [],
      start_date: null,
      end_date: null
    }
  },
  methods: {
    onSearchList() {
      this.$searchQuery.start_time = this.selectTime.startTime.value
        ? `${this.selectTime.startTime.value.format('YYYY-MM-DD')}`
        : ''
      this.$searchQuery.end_time = this.selectTime.endTime.value
        ? `${this.selectTime.endTime.value.format('YYYY-MM-DD')}`
        : ''
      this.onSearch({ ...this.$searchQuery })
    },
    setSearchData() {
      this.selectTime.startTime.value = this.$searchQuery.start_time
        ? cloneDeep(moment(this.$searchQuery.start_time))
        : null
      this.selectTime.endTime.value = this.$searchQuery.end_time
        ? cloneDeep(moment(this.$searchQuery.end_time))
        : null
    }
  }
}
</script>
