<template>
  <st-panel app class="shop-member-list">
    <div slot="title">
      <st-input-search
        placeholder="输入用户姓名、手机号"
        v-model="$searchQuery.keyword"
        @search="onKeywordsSearch('keyword', $event)"
      />
    </div>
    <div slot="prepend">
      <st-search-panel @search="onSearchNative" @reset="onSearhReset">
        <st-search-panel-item label="用户级别：">
          <st-search-radio
            v-model="$searchQuery.member_level"
            :options="memberLevel"
          />
        </st-search-panel-item>
        <st-search-panel-item label="跟进方式：">
          <st-search-radio
            v-model="$searchQuery.follow_way"
            :options="followWayList"
          />
        </st-search-panel-item>
        <st-search-panel-item label="跟进状态：">
          <st-search-radio
            v-model="$searchQuery.follow_status"
            :options="followStatusList"
          />
        </st-search-panel-item>
        <div slot="more">
          <st-search-panel-item label="跟进销售：">
            <a-select
              class="mg-r16"
              placeholder="请选择跟进销售"
              optionFilterProp="children"
              style="width: 200px"
              @change="onChangeSell"
              v-model="$searchQuery.follow_salesman_id"
            >
              <a-select-option
                :value="+staff.id"
                v-for="staff in staffList"
                :key="staff.id"
              >
                {{ staff.sale_name }}
              </a-select-option>
            </a-select>
          </st-search-panel-item>
          <st-search-panel-item label="跟进教练：">
            <a-select
              showSearch
              placeholder="请选择跟进教练"
              optionFilterProp="children"
              class="mg-r16"
              style="width: 200px"
              @change="onChangeCoach"
              v-model="$searchQuery.follow_coach_id"
            >
              <a-select-option
                :value="+coach.id"
                v-for="coach in coachList"
                :key="coach.id"
              >
                {{ coach.coach_name }}
              </a-select-option>
            </a-select>
          </st-search-panel-item>
          <st-search-panel-item label="录入人：">
            <a-select
              showSearch
              placeholder="请选择录入人"
              optionFilterProp="children"
              class="mg-r16"
              style="width: 200px"
              @change="onChangeOperator"
              v-model="$searchQuery.operator_id"
            >
              <a-select-option
                :value="+operator.id"
                v-for="operator in operatorList"
                :key="operator.id"
              >
                {{ operator.name }}
              </a-select-option>
            </a-select>
          </st-search-panel-item>
          <st-search-panel-item label="跟进情况：">
            <st-range-picker
              :disabledDays="180"
              :value="selectTime"
            ></st-range-picker>
          </st-search-panel-item>
          <st-search-panel-item label="跟进次数：">
            <a-input
              v-model="$searchQuery.follow_start_num"
              style="width:80px"
              type="number"
            />
            &nbsp;~&nbsp;
            <a-input
              v-model="$searchQuery.follow_end_num"
              style="width:80px"
              type="number"
            />
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
      rowKey="id"
      :page="page"
      @change="onTableChange"
      :dataSource="list"
    >
      <span slot="operator" slot-scope="text, record">
        {{ record.operator.label }}
      </span>
      <span slot="member" slot-scope="text, record">
        {{ record.member.label }}
      </span>
      <span slot="member_level" slot-scope="text, record">
        {{ record.member_level.label }}
      </span>
      <span slot="coach" slot-scope="text, record">
        {{ record.coach.label }}
      </span>
      <span slot="salesman" slot-scope="text, record">
        {{ record.salesman.label }}
      </span>
      <span slot="follow_way" slot-scope="text, record">
        {{ record.follow_way.label }}
      </span>
      <span slot="follow_status" slot-scope="text, record">
        {{ record.follow_status.label }}
      </span>
      <span slot="contentTitle">
        当前已跟进次数
        <st-help-tooltip id="TSCRM003" />
      </span>
      <template slot="follow_content" slot-scope="text, record">
        <span v-if="text.length === 0">{{ record.object }}</span>
        <div v-else>
          <st-overflow-text title="跟进内容">
            <template slot="content">
              {{ record.follow_content }}
            </template>
            <a class="pop-object__text">{{ text }}</a>
          </st-overflow-text>
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
import tableMixin from '@/mixins/table.mixin'
import { columns } from './follow.config'
export default {
  name: 'memberList',
  mixins: [tableMixin],
  serviceInject() {
    return {
      followService: FollowService,
      userService: UserService
    }
  },
  rxState() {
    const user = this.userService
    return {
      loading: this.followService.loading$,
      shopMemberEnums: user.shopMemberEnums$,
      memberEnums: user.memberEnums$,
      auth: this.followService.auth$,
      list: this.followService.list$,
      page: this.followService.page$,
      staffList: this.followService.staffList$,
      coachList: this.followService.coachList$,
      operatorList: this.followService.operatorList$
    }
  },
  data() {
    return {
      startNum: -1,
      endNum: -1,
      dateFormat: 'YYYY-MM-DD',
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
    followWayList() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.memberEnums.follow_way) return list
      Object.entries(this.memberEnums.follow_way.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    },
    followStatusList() {
      let list = [{ value: -1, label: '全部' }]
      if (!this.memberEnums.follow_status) return list
      Object.entries(this.memberEnums.follow_status.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    }
  },
  mounted() {
    this.setSearchData()
  },
  watch: {
    $searchQuery(newVal) {
      this.setSearchData()
    }
  },

  methods: {
    onChangeSell(value) {
      this.onMultiSearch({ follow_salesman_id: value })
    },
    onChangeCoach(value) {
      this.onMultiSearch({ follow_coach_id: value })
    },
    onChangeOperator(value) {
      this.onMultiSearch({ operator_id: value })
    },
    refeshPage() {
      this.$router.reload()
    },
    // 查询
    onSearchNative() {
      this.$searchQuery.follow_start_date = this.selectTime.startTime.value
        ? `${this.selectTime.startTime.value.format('YYYY-MM-DD')}`
        : ''
      this.$searchQuery.follow_end_date = this.selectTime.endTime.value
        ? `${this.selectTime.endTime.value.format('YYYY-MM-DD')}`
        : ''
      this.onSearch()
    },
    // 设置searchData
    setSearchData() {
      this.selectTime.startTime.value = this.$searchQuery.follow_start_date
        ? cloneDeep(moment(this.$searchQuery.follow_start_date))
        : null
      this.selectTime.endTime.value = this.$searchQuery.follow_end_date
        ? cloneDeep(moment(this.$searchQuery.follow_end_date))
        : null
    },
    moment,
    handleReset() {
      let self = this
      for (let prop in self.form) {
        self.form[prop] = ''
      }
      this.$refs.stSeleter.handleResetItem()
      this.$router.reload()
    }
  }
}
</script>
