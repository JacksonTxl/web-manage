<template>
  <div :class="basic()">
    <div v-di-view="{ name: 'SHOP_SOLD_COURSE_LIST_SEARCH' }">
      <st-input-search
        v-model="$searchQuery.search"
        @search="onKeywordsSearch('search', $event)"
        placeholder="请输入小班课名称、合同编号、会员姓名或手机号查找"
        style="width:372px"
      />
    </div>
    <st-search-panel @search="onSearchNative" @reset="onSearchResetNative">
      <st-search-panel-item label="课程状态：">
        <st-search-radio
          v-model="$searchQuery.course_status"
          :options="courseStatus"
        />
      </st-search-panel-item>
      <st-search-panel-item label="购买时间：">
        <st-range-picker :disabledDays="180" v-model="date" />
      </st-search-panel-item>
    </st-search-panel>
    <div :class="basic('content')">
      <div>
        <!-- NOTE:批量操作暂时不做 -->
        <!-- :alertSelection="{ onReset: onClear }"
          :rowSelection="{
            selectedRowKeys: selectedRowKeys,
            fixed: true,
            onChange: onSelectChange,
            getCheckboxProps: record => ({
              props: {
                disabled: disabledSelect(record)
              }
            })
          }" -->
        <st-table
          :page="page"
          :loading="loading.getList"
          rowKey="id"
          :scroll="{ x: 1800 }"
          :columns="columns"
          @change="onTableChange"
          :dataSource="list"
        >
          <template slot="course_status" slot-scope="text">
            {{ text | enumFilter('sold_common.course_status') }}
          </template>
          <div slot="action" slot-scope="text, record">
            <st-table-actions>
              <!-- v-if="record.auth['shop:sold:sold_personal_course|get']" -->
              <a @click="onDetail(record)">
                详情
              </a>
              <a @click="onTransfer(record)">
                转让
              </a>
              <a @click="onRefund(record)">
                退款
              </a>
              <a @click="toContract(record)">
                查看合同
              </a>
            </st-table-actions>
          </div>
        </st-table>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { cloneDeep, filter } from 'lodash-es'
import { PersonalService } from './personal.service'
import tableMixin from '@/mixins/table.mixin'
import { columns } from './personal.config'
import SoldCourseRefund from '@/views/biz-modals/sold/course/refund'
import SoldCourseTransfer from '@/views/biz-modals/sold/course/transfer'
import SoldCourseLease from '@/views/biz-modals/sold/course/lease'
import SoldCourseExtendDay from '@/views/biz-modals/sold/course/extend-day'
export default {
  name: 'PageShopSoldCoursePersonalList',
  mixins: [tableMixin],
  bem: {
    basic: 'page-shop-sold'
  },
  modals: {
    SoldCourseRefund,
    SoldCourseTransfer,
    SoldCourseLease,
    SoldCourseExtendDay
  },
  serviceInject() {
    return {
      personalService: PersonalService
    }
  },
  rxState() {
    return {
      loading: this.personalService.loading$,
      list: this.personalService.list$,
      page: this.personalService.page$,
      courseStatus: this.personalService.courseStatus$,
      auth: this.personalService.auth$
    }
  },
  data() {
    return {
      start_time: null,
      end_time: null,
      // 结束时间面板是否显示
      endOpen: false,
      selectedRowKeys: [],
      date: []
    }
  },

  computed: {
    columns
  },
  mounted() {
    this.setSearchData()
  },
  methods: {
    // 查询
    onSearchNative() {
      this.$searchQuery.start_time = this.date[0]
        ? `${this.date[0].format('YYYY-MM-DD')} 00:00:00`
        : ''
      this.$searchQuery.end_time = this.date[1]
        ? `${this.date[1].format('YYYY-MM-DD')} 23:59:59`
        : ''
      this.onSearch()
    },
    onSearchResetNative() {
      this.date = [null, null]
      this.onSearchReset()
    },
    // 设置searchData
    setSearchData() {
      const start = this.$searchQuery.start_time
        ? cloneDeep(moment(this.$searchQuery.start_time))
        : null
      const end = this.$searchQuery.end_time
        ? cloneDeep(moment(this.$searchQuery.end_time))
        : null
      this.date = [start, end]
    },
    // moment
    moment,
    // 转让
    onTransfer(record) {
      this.$modalRouter.push({
        name: 'sold-course-transfer',
        props: {
          type: 'personal',
          id: record.id
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    // 跳转合同
    toContract(record) {
      let url = `${window.location.origin}/common/contract-preview?id=${
        record.order_id
      }`
      window.open(url)
    },
    // 退款
    onRefund(record) {
      this.$modalRouter.push({
        name: 'sold-course-refund',
        props: {
          type: 'personal',
          id: record.id
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    // 详情
    onDetail(record) {
      this.$router.push({
        path: `/shop/sold/course/info/personal/info/operation-record`,
        query: { id: record.id }
      })
    }
  }
}
</script>
