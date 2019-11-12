<template>
  <st-panel app class="shop-member-list">
    <div slot="title">
      <st-input-search
        placeholder="输入用户姓名、手机号"
        v-model="query.keyword"
        @search="onKeywordsSearch('keyword', $event)"
      />
    </div>
    <div slot="prepend">
      <st-search-panel @search="onSearchNative" @reset="onSearhReset">
        <st-search-panel-item label="用户级别：">
          <st-search-radio
            v-model="query.member_level"
            :options="memberLevel"
          />
        </st-search-panel-item>
        <st-search-panel-item label="来源方式：">
          <st-search-radio v-model="query.register_way" :options="sourceList" />
        </st-search-panel-item>
        <st-search-panel-item label="注册时间：">
          <st-range-picker
            :disabledDays="180"
            :value="selectTime"
          ></st-range-picker>
        </st-search-panel-item>
        <div slot="more">
          <st-search-panel-item label="入会时间：">
            <st-range-picker
              :disabledDays="180"
              :value="selectMemberTime"
            ></st-range-picker>
          </st-search-panel-item>
          <st-search-panel-item label="员工跟进：">
            <st-search-radio v-model="query.is_follow" :options="isFollow" />
          </st-search-panel-item>
        </div>
      </st-search-panel>
    </div>
    <!-- NOTE: 导出 -->
    <!-- <st-button v-if="auth.export" :disabled='isSelectedDisabled' class="shop-member-list-button">批量导出</st-button> -->
    <st-table
      :columns="columns"
      :loading="loading.getListInfo"
      :scroll="{ x: 1400 }"
      :alertSelection="{ onReset: onSelectionReset }"
      :rowSelection="{ selectedRowKeys, onChange: onSelectionChange }"
      rowKey="member_id"
      :page="page"
      @change="onTableChange"
      :dataSource="list"
    >
      <template slot="operate_object" slot-scope="text, record">
        <span v-if="text.length === 0">{{ record.object }}</span>
        <div v-else>
          <a-popover title="跟进内容">
            <template slot="content">
              <pre>{{ record.object }}</pre>
            </template>
            <a class="pop-object__text">{{ text }}</a>
          </a-popover>
        </div>
      </template>
    </st-table>
  </st-panel>
</template>
<script>
import moment from 'moment'
import { cloneDeep, filter } from 'lodash-es'
import { UserService } from '@/services/user.service'
import { FollowService } from './follow.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './list.config'
export default {
  name: 'memberList',
  mixins: [tableMixin],
  serviceInject() {
    return {
      followService: FollowService,
      userService: UserService,
      routeService: RouteService
    }
  },
  rxState() {
    const user = this.userService
    return {
      loading: this.followService.loading$,
      shopMemberEnums: user.shopMemberEnums$,
      reserveEnums: user.reserveEnums$,
      memberEnums: user.memberEnums$,
      auth: this.followService.auth$,
      query: this.routeService.query$,
      list: this.followService.list$,
      page: this.followService.page$
    }
  },
  data() {
    return {
      dateFormat: 'YYYY-MM-DD',
      expand: false,
      sourceRegisterList: [],
      consumption: [],
      selectDataList: [],
      selectedRowKeys: [],
      selectedRows: [],
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
      selectMemberTime: {
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
      }
    }
  },
  computed: {
    columns,
    memberLevel() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.shopMemberEnums.member_level) return list
      Object.entries(this.shopMemberEnums.member_level.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    },
    isFollow() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.memberEnums.is_follow) return list
      Object.entries(this.memberEnums.is_follow.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    },
    defaultRegValue() {
      if (!this.query.register_start_time) return []
      return [
        moment(this.query.register_start_time, this.dateFormat),
        moment(this.query.register_stop_time, this.dateFormat)
      ]
    },
    defaultBeMemberValue() {
      if (!this.query.be_member_start_time) return null
      return [
        moment(this.query.be_member_start_time, this.dateFormat),
        moment(this.query.be_member_stop_time, this.dateFormat)
      ]
    },
    sourceList() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.memberEnums.source_channel) return list
      Object.entries(this.memberEnums.source_channel.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    }
  },
  mounted() {
    this.sourceRegisters()
    this.setSearchData()
  },
  watch: {
    query(newVal) {
      this.setSearchData()
    }
  },

  methods: {
    refeshPage() {
      this.$router.reload()
    },
    sourceRegisters() {
      this.followService.getMemberSourceRegisters().subscribe(status => {
        this.sourceRegisterList = status
      })
    },
    // 查询
    onSearchNative() {
      this.query.register_start_time = this.selectTime.startTime.value
        ? `${this.selectTime.startTime.value.format('YYYY-MM-DD')}`
        : ''
      this.query.register_stop_time = this.selectTime.endTime.value
        ? `${this.selectTime.endTime.value.format('YYYY-MM-DD')}`
        : ''
      this.query.be_member_start_time = this.selectMemberTime.startTime.value
        ? `${this.selectMemberTime.startTime.value.format('YYYY-MM-DD')}`
        : ''
      this.query.be_member_stop_time = this.selectMemberTime.endTime.value
        ? `${this.selectMemberTime.endTime.value.format('YYYY-MM-DD')}`
        : ''
      this.onSearch()
    },
    // 设置searchData
    setSearchData() {
      this.selectTime.startTime.value = this.query.register_start_time
        ? cloneDeep(moment(this.query.register_start_time))
        : null
      this.selectTime.endTime.value = this.query.register_stop_time
        ? cloneDeep(moment(this.query.register_stop_time))
        : null
      this.selectMemberTime.startTime.value = this.query.be_member_start_time
        ? cloneDeep(moment(this.query.be_member_start_time))
        : null
      this.selectMemberTime.endTime.value = this.query.be_member_stop_time
        ? cloneDeep(moment(this.query.be_member_stop_time))
        : null
    },
    moment,
    handleReset() {
      let self = this
      for (let prop in self.form) {
        self.form[prop] = ''
      }
      this.$refs.stSeleter.handleResetItem()
      this.consumption = []
      this.$router.push({ query: {} })
    },
    toggle() {
      this.expand = !this.expand
    },
    onSelectionReset() {
      this.selectedRowKeys = []
      this.selectedRows = []
    },
    onSelectionChange(keys, selectedRows) {
      this.selectedRowKeys = keys
      this.selectedRows = selectedRows
      this.selectDataList = selectedRows.map(item => {
        return item.id
      })
    },
    queryFunc() {
      this.$router.push({ query: this.form })
    }
  }
}
</script>
