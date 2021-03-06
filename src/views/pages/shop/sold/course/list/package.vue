<template>
  <div :class="basic()">
    <portal to="SHOP_SOLD_COURSE_LIST_SEARCH">
      <st-input-search
        v-model="$searchQuery.search"
        @search="onKeywordsSearch('search', $event)"
        placeholder="请输入课程包名、合同编号、会员姓名或手机号查找"
        style="width:400px"
      />
    </portal>

    <st-search-panel @search="onSearchNative" @reset="onSearchResetNative">
      <st-search-panel-item label="课程状态：">
        <st-search-radio
          v-model="$searchQuery.course_status"
          :options="courseStatus"
        />
      </st-search-panel-item>
      <st-search-panel-item label="课程类型：">
        <st-search-radio
          v-model="$searchQuery.package_type"
          :options="packageTypes"
        />
      </st-search-panel-item>
      <st-search-panel-item label="购买时间：">
        <st-range-picker :disabledDays="180" v-model="date" />
      </st-search-panel-item>
    </st-search-panel>
    <div :class="basic('content')">
      <div :class="basic('content-batch')" class="mg-b16">
        <!-- NOTE: 导出 -->
        <st-button
          v-if="auth.export"
          type="primary"
          class="mg-r8"
          v-export-excel="{
            type: 'sold/course/package',
            query: { conditions: $searchQuery }
          }"
        >
          全部导出
        </st-button>
        <template
          v-if="selectedRowKeys.length >= 1 && diffSelectedRows.length === 0"
        >
          <st-button
            type="primary"
            class="mg-r8"
            @click="onChangeCourse"
            v-if="auth.course_range"
          >
            更换上课范围
          </st-button>
        </template>
        <template v-else>
          <st-help-tooltip
            :isCustom="true"
            title="仅支持范围内课程变更"
            :defaultVisible="true"
            v-model="visible"
          >
            <st-button
              type="primary"
              class="mg-r8"
              :disabled="true"
              v-if="auth.course_range"
            >
              更换上课范围
            </st-button>
          </st-help-tooltip>
        </template>
      </div>
      <st-total
        :indexs="totalColumns"
        :dataSource="total"
        hasTitle
        class="mg-b16"
      ></st-total>
      <div>
        <st-table
          :page="page"
          rowKey="id"
          :loading="loading.getList"
          :alertSelection="{ onReset: onClear }"
          :rowSelection="{
            selectedRowKeys: selectedRowKeys,
            fixed: true,
            onChange: onSelectChange,
            getCheckboxProps: record => ({
              props: {
                disabled: disabledSelect(record)
              }
            })
          }"
          @change="onTableChange"
          :scroll="{ x: 3500 }"
          :columns="columns"
          :dataSource="list"
        >
          <template slot="course_status" slot-scope="text">
            <st-text
              :status="{
                success: text === 1,
                warning: text === 2,
                error: text === 3
              }"
            >
              {{ text | enumFilter('sold_common.course_status') }}
            </st-text>
          </template>
          <template slot="member_name" slot-scope="text, record">
            <template v-if="record.is_minors">
              {{ record.member_name }}(未成年)
            </template>
            <template v-else>
              {{ record.member_name }}
            </template>
          </template>
          <template slot="mobile" slot-scope="text, record">
            <template v-if="record.is_minors">
              {{ record.parent_mobile }}({{ record.parent_user_role }})
            </template>
            <template v-else>
              {{ record.mobile }}
            </template>
          </template>
          <template slot="buy_course_num" slot-scope="text, record">
            {{ text }}/{{ record.team_course_init }}/{{
              record.personal_course_init
            }}
          </template>
          <template slot="remain_course_num" slot-scope="text, record">
            {{ text }}/{{ record.team_course_remain }}/{{
              record.personal_course_remain
            }}
          </template>
          <template slot="sex" slot-scope="text">
            {{ text | enumFilter('staff.sex') }}
          </template>
          <template slot="package_type" slot-scope="text">
            {{ text | enumFilter('package_course.package_type') }}
          </template>
          <template slot="course_end_time" slot-scope="text">
            {{ moment(text).format('YYYY-MM-DD HH:mm') }}
          </template>
          <template slot="course_buy_time" slot-scope="text">
            {{ moment(text).format('YYYY-MM-DD HH:mm') }}
          </template>
          <st-table-actions slot="action" slot-scope="text, record">
            <a
              v-if="record.auth['shop:sold:sold_package_course|get']"
              @click="onDetail(record)"
            >
              详情
            </a>
            <a
              v-if="record.auth['shop:sold:sold_package_course|course_num']"
              @click="onSurplus(record)"
            >
              修改剩余课时
            </a>
            <a
              v-if="record.auth['shop:sold:sold_package_course|frozen']"
              @click="onFreeze(record)"
            >
              冻结
            </a>
            <a
              v-if="record.auth['shop:sold:sold_package_course|unfrozen']"
              @click="onUnfreeze(record)"
            >
              取消冻结
            </a>
            <a
              v-if="record.auth['shop:sold:sold_package_course|transfer']"
              @click="onTransfer(record)"
            >
              转让
            </a>
            <a
              v-if="record.auth['brand_shop:order:order|refund']"
              @click="onRefund(record)"
            >
              退款
            </a>
            <a
              v-if="
                record.auth['shop:sold:sold_package_course|export_contract']
              "
              @click="toContract(record)"
            >
              查看合同
            </a>
          </st-table-actions>
        </st-table>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { cloneDeep, filter } from 'lodash-es'
import { PackageService } from './package.service'
import tableMixin from '@/mixins/table.mixin'
import { columns, totalColumns } from './package.config'
import SoldCourseFreeze from '@/views/biz-modals/sold/course/freeze'
import SoldCourseRefund from '@/views/biz-modals/sold/course/refund'
import SoldCourseSurplus from '@/views/biz-modals/sold/course/surplus'
import SoldCourseTransfer from '@/views/biz-modals/sold/course/transfer'
import SoldCourseScope from '@/views/biz-modals/sold/course/scope'
import CommonTaskSuccessTip from '@/views/biz-modals/common/task/success-tip'
export default {
  name: 'PageShopSoldCoursePackageList',
  mixins: [tableMixin],
  bem: {
    basic: 'page-shop-sold'
  },
  modals: {
    SoldCourseFreeze,
    SoldCourseRefund,
    SoldCourseSurplus,
    SoldCourseTransfer,
    SoldCourseScope,
    CommonTaskSuccessTip
  },
  serviceInject() {
    return {
      packageService: PackageService
    }
  },
  rxState() {
    return {
      list: this.packageService.list$,
      loading: this.packageService.loading$,
      page: this.packageService.page$,
      courseStatus: this.packageService.courseStatus$,
      packageTypes: this.packageService.packageTypes$,
      auth: this.packageService.auth$,
      total: this.packageService.total$
    }
  },
  data() {
    return {
      visible: false,
      // 结束时间面板是否显示
      endOpen: false,
      selectedRowKeys: [],
      selectedRows: [],
      diffSelectedRows: [],
      date: []
    }
  },
  mounted() {
    this.setSearchData()
  },
  computed: {
    columns,
    totalColumns
  },
  methods: {
    disabledSelect(record) {
      if (record.course_status !== 1 && record.course_status !== 4) {
        return true
      }
    },
    // 清空列表选择
    onClear() {
      this.selectedRowKeys = []
      this.selectedRows = []
    },
    // 变更上课范围
    onChangeCourse() {
      this.$modalRouter.push({
        name: 'sold-course-scope',
        props: {
          ids: this.selectedRowKeys,
          searchQuery: this.$searchQuery
        },
        on: {
          success: () => {
            this.successTip()
          }
        }
      })
    },
    successTip() {
      this.$modalRouter.push({
        name: 'common-task-success-tip',
        on: {
          success: () => {
            this.$router.reload()
            this.onClear()
          }
        }
      })
    },
    onPageChange(data) {
      this.$router.push({
        query: { ...this.$searchQuery, page: data.current, size: data.pageSize }
      })
    },
    // 修改剩余课时
    onSurplus(record) {
      let data = {
        id: record.id,
        courseName: record.course_name,
        time: `${moment(record.course_buy_time).format(
          'YYYY-MM-DD HH:mm'
        )} 至 ${moment(record.course_end_time).format('YYYY-MM-DD HH:mm')}`
      }
      this.$modalRouter.push({
        name: 'sold-course-surplus',
        props: {
          courseType: 'coursePackage',
          courseData: data
        },
        on: {
          success() {
            this.$router.reload()
          }
        }
      })
    },
    // 冻结
    onFreeze(record) {
      this.$modalRouter.push({
        name: 'sold-course-freeze',
        props: {
          type: 'package',
          id: record.id
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    // 取消冻结
    onUnfreeze(record) {
      this.$confirm({
        title: '提示',
        content: '是否取消冻结？',
        maskClosable: true,
        onOk: () => {
          this.packageService
            .unFreeze(record.id)
            .toPromise()
            .then(() => {
              this.$router.reload()
            })
        }
      })
    },
    // 转让
    onTransfer(record) {
      this.$modalRouter.push({
        name: 'sold-course-transfer',
        props: {
          type: 'package',
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
          type: 'package',
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
        path: `/shop/sold/course/info/package/info/operation-record`,
        query: { id: record.id }
      })
    },
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
    onSelectChange(selectedRowKeys, selectedRows) {
      this.visible = false
      this.selectedRowKeys = selectedRowKeys
      this.diffSelectedRows = selectedRows.filter(
        item => item.package_type !== 2
      )
      if (this.diffSelectedRows.length) {
        this.visible = true
        setTimeout(() => {
          this.visible = false
        }, 2000)
      }
    }
  }
}
</script>
