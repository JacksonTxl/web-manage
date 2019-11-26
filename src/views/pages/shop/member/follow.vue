<template>
  <st-panel app :class="bPage()">
    <div slot="title">
      <st-input-search
        placeholder="输入用户姓名、手机号"
        v-model="$searchQuery.keyword"
        @search="onKeywordsSearch('keyword', $event)"
      />
    </div>
    <div slot="prepend">
      <st-search-panel @search="onSearchNative" @reset="handleReset">
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
              :class="bPage('item')"
              placeholder="请选择跟进销售"
              optionFilterProp="children"
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
              :class="bPage('item')"
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
              :class="bPage('item')"
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
          <st-search-panel-item label="跟进日期：">
            <st-range-picker
              :disabledDays="180"
              :value="selectTime"
            ></st-range-picker>
          </st-search-panel-item>
          <st-search-panel-item label="跟进次数：">
            <st-input-number
              v-model="$searchQuery.follow_start_num"
              :class="bPage('number')"
              :float="false"
              :min="0"
              :max="9999"
            />
            &nbsp;~&nbsp;
            <st-input-number
              v-model="$searchQuery.follow_end_num"
              :class="bPage('number')"
              :float="false"
              :min="0"
              :max="9999"
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
      :scroll="{ x: 1500 }"
      rowKey="id"
      :page="page"
      @change="onTableChange"
      :dataSource="list"
    >
      <span slot="operator" slot-scope="text, record">
        {{ record.operator.label }}
      </span>
      <span slot="member" slot-scope="text, record">
        <a
          href="javascript:;"
          v-if="auth['shop:member:member|get']"
          @click="infoFunc(record)"
        >
          {{ record.member.label }}
        </a>
        <span v-else>{{ record.member.label }}</span>
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
      <template slot="follow_content" slot-scope="text">
        <div>
          <st-overflow-text
            title="跟进内容"
            max-width="180px"
            :value="text"
          ></st-overflow-text>
        </div>
      </template>
    </st-table>
  </st-panel>
</template>
<script>
import moment from 'moment'
import { cloneDeep, filter } from 'lodash-es'
import { FollowService } from './follow.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './follow.config'
export default {
  name: 'PageShopMemberFollow',
  bem: {
    bPage: 'page-shop-member-follow'
  },
  mixins: [tableMixin],
  serviceInject() {
    return {
      followService: FollowService
    }
  },
  rxState() {
    return {
      loading: this.followService.loading$,
      auth: this.followService.auth$,
      list: this.followService.list$,
      page: this.followService.page$,
      staffList: this.followService.staffList$,
      coachList: this.followService.coachList$,
      operatorList: this.followService.operatorList$,
      memberLevel: this.followService.memberLevel$,
      followWayList: this.followService.followWayList$,
      followStatusList: this.followService.followStatusList$
    }
  },
  data() {
    return {
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
    columns
  },
  methods: {
    onChangeSell(value) {
      this.$searchQuery.follow_salesman_id = value
    },
    onChangeCoach(value) {
      this.$searchQuery.follow_coach_id = value
    },
    onChangeOperator(value) {
      this.$searchQuery.operator_id = value
    },
    refeshPage() {
      this.$router.reload()
    },
    // 查询
    onSearchNative() {
      this.$searchQuery.follow_start_date = this.selectTime.startTime.value
        ? `${this.selectTime.startTime.value.format('YYYY-MM-DD')} 00:00`
        : ''
      this.$searchQuery.follow_end_date = this.selectTime.endTime.value
        ? `${this.selectTime.endTime.value.format('YYYY-MM-DD')} 23:59`
        : ''
      this.onSearch()
    },
    infoFunc(record) {
      this.$router.push({
        name: 'shop-member-info-basic',
        query: { id: record.member.id }
      })
    },
    moment,
    handleReset() {
      this.selectTime.startTime.value = null
      this.selectTime.endTime.value = null
      this.onSearhReset()
    }
  }
}
</script>
