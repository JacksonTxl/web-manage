<template>
  <st-panel-layout :class="b()">
    <st-panel app>
      <div :class="b('action')">
        <a-select
          placeholder="请选择部门"
          v-model="$searchQuery.department_id"
          :class="b('select')"
          @change="onSingleSearch('department_id', $event)"
        >
          <a-select-option :value="-1">
            全部
          </a-select-option>
          <a-select-option
            v-for="(item, index) of department"
            :key="index"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
        <a-select
          placeholder="请选择门店"
          v-model="$searchQuery.shop_id"
          @change="onSingleSearch('shop_id', $event)"
          :class="b('select')"
        >
          <a-select-option :value="-1">
            全部
          </a-select-option>
          <a-select-option
            v-for="(item, index) of shopList"
            :key="index"
            :value="item.shop_id"
          >
            {{ item.shop_name }}
          </a-select-option>
        </a-select>
        <!-- <a-range-picker
          :class="[bDate('range'), b('range')]"
          :placeholder="['开始月份', '结束月份']"
          format="YYYY-MM"
          :mode="['month', 'month']"
          @change="change"
          @panelChange="panelChange"
          v-model="monthRange"
        /> -->
        <a-month-picker
          @change="change"
          v-model="start_month"
          placeholder="开始月份"
          :class="b('range')"
          :disabledDate="disabledStartDate"
        />
        ~
        <a-month-picker
          @change="change"
          v-model="end_month"
          placeholder="结束月份"
          :class="b('range')"
          :disabledDate="disabledEndDate"
        />

        <st-input-search
          :class="b('search')"
          v-model="$searchQuery.search"
          @search="onKeywordsSearch('search', $event)"
          placeholder="请输入工号、员工姓名或手机号查找"
        ></st-input-search>
      </div>

      <st-table
        :page="page"
        @change="onTableChange"
        :loading="loading.getList"
        :columns="columns"
        :dataSource="list"
        rowKey="id"
      >
        <template slot="shop" slot-scope="text, record">
          <a
            v-if="text.count > 1"
            v-modal-link="{
              name: 'brand-finance-staff-shop',
              props: {
                id: record.id
              }
            }"
          >
            共{{ text.count }}家门店
          </a>
          <span v-else>
            {{ text.name }}
          </span>
        </template>
        <template slot="sales_commission" slot-scope="text, record">
          <a
            v-modal-link="{
              name: 'brand-finance-sale-commission',
              props: {
                id: record.id
              }
            }"
          >
            {{ text }}
          </a>
        </template>
        <template slot="course_commission" slot-scope="text, record">
          <a
            v-modal-link="{
              name: 'brand-finance-class-commission',
              props: {
                id: record.id
              }
            }"
          >
            {{ text }}
          </a>
        </template>
      </st-table>
    </st-panel>
  </st-panel-layout>
</template>
<script>
import { ListService } from './list.service'
import { columns } from './list.config.ts'
import tableMixin from '@/mixins/table.mixin'
import { UserService } from '@/services/user.service'
import BrandFinanceClassCommission from '@/views/biz-modals/brand/finance/class-commission'
import BrandFinanceSaleCommission from '@/views/biz-modals/brand/finance/sale-commission'
import BrandFinanceStaffShop from '@/views/biz-modals/brand/finance/staff-shop'
import moment from 'moment'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'BrandFinanceSalary',
  mixins: [tableMixin],
  data() {
    return {
      monthRange: [],
      start_month: null,
      end_month: null
    }
  },
  bem: {
    b: 'page-brand-finance-salary',
    bDate: 'st-recent-radio-group'
  },
  modals: {
    BrandFinanceClassCommission,
    BrandFinanceSaleCommission,
    BrandFinanceStaffShop
  },
  serviceInject() {
    return {
      listService: ListService,
      userService: UserService
    }
  },
  rxState() {
    return {
      list: this.listService.list$,
      page: this.listService.page$,
      loading: this.listService.loading$,
      info: this.listService.info$,
      department: this.listService.department$,
      shopList: this.userService.shopList$,
      auth: this.listService.auth$
    }
  },
  computed: {
    columns
  },
  mounted() {
    this.setQueryParams()
  },
  watch: {
    $searchQuery() {
      this.setQueryParams()
    }
  },
  methods: {
    setQueryParams() {
      this.start_month = null
      this.end_month = null
      if (this.$searchQuery.start_month && this.$searchQuery.end_month) {
        this.start_month = moment(this.$searchQuery.start_month)
        this.end_month = moment(this.$searchQuery.end_month)
      }
    },
    change() {
      if (this.start_month && this.end_month) {
        this.$searchQuery.start_month = this.start_month.format('YYYY-MM')
        this.$searchQuery.end_month = this.end_month.format('YYYY-MM')
        this.onSearch()
      }
      if (!this.start_month && !this.end_month) {
        this.$searchQuery.start_month = ''
        this.$searchQuery.end_month = ''
        this.onSearch()
      }
    },
    disabledStartDate(current) {
      if (this.end_month) {
        const startMonth = cloneDeep(current).startOf('month')
        const endMonth = cloneDeep(this.end_month).startOf('month')
        return startMonth > endMonth
      }
      return false
    },
    disabledEndDate(current) {
      return current && current < this.start_month
    }
  }
}
</script>
