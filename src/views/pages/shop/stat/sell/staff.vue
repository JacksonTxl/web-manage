<template>
  <div>
    <st-table-header-section>
      <st-button
        v-if="auth.export"
        type="primary"
        v-export-excel="{
          type: 'sale/staff',
          query: $searchQuery
        }"
      >
        全部导出
      </st-button>
      <div slot="actions">
        <a-select
          class="mg-r8"
          placeholder="请选择部门"
          optionFilterProp="children"
          style="width: 200px"
          @change="onChangeDepartment"
          v-model="$searchQuery.department_id"
          :filterOption="filterOption"
        >
          <a-select-option
            :value="+department.id"
            v-for="department in departmentList"
            :key="department.id"
          >
            {{ department.name }}
          </a-select-option>
        </a-select>
        <a-select
          showSearch
          placeholder="所有销售"
          optionFilterProp="children"
          class="mg-r8"
          style="width: 200px"
          @change="onChangeStaff"
          v-model="$searchQuery.staff_id"
          :filterOption="filterOption"
        >
          <a-select-option
            :value="+staff.id"
            v-for="staff in staffListFilter"
            :key="staff.id"
          >
            {{ staff.name }}
          </a-select-option>
        </a-select>
        <st-recent-radio-group @change="recentChange"></st-recent-radio-group>
      </div>
    </st-table-header-section>

    <st-total
      class="mg-t12"
      :indexs="totalColumns"
      :dataSource="total$"
      hasTitle
    >
      <template v-slot:performance_amount="record">
        <st-total-item
          @click.native="onCLickPerformanceAmount"
          :unit="record.unit"
          :label="record.label"
          :value="record.value"
        ></st-total-item>
      </template>
    </st-total>

    <st-table
      :page="page"
      :scroll="{ x: 2300 }"
      class="mg-t12"
      @change="onTableChange"
      :loading="loading.getSellStaffList"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
    >
      <a
        slot="performance_amount"
        @click="getSellTotalAmount(record)"
        slot-scope="text, record"
        v-if="text !== 0"
      >
        {{ text }}
      </a>
      <span v-else>{{ text }}</span>
      <span slot="memberTitle">
        {{ $c('member_card') }}成单数
        <st-help-tooltip id="TSSR001" />
      </span>
      <span slot="depositTitle">
        储值卡成单数
        <st-help-tooltip id="TSSR002" />
      </span>
      <!-- <span slot="teamTitle">
        团课购买节数
        <st-help-tooltip id="TSSR003" />
      </span> -->
      <span slot="totalTitle">
        总购课节数
        <st-help-tooltip id="TSSR004" />
      </span>
      <span slot="otherTitle">
        其它销售金额（元）
        <st-help-tooltip id="TSSR005" />
      </span>
      <span slot="performanceTitle">
        总销售业绩（元）
        <st-help-tooltip id="TSSR006" />
      </span>
    </st-table>
  </div>
</template>
<script>
import { StaffService } from './staff.service'
import tableMixin from '@/mixins/table.mixin'
import ShopStatSellAmount from '@/views/biz-modals/shop/stat/sell-amount'
import { columns, totalColumns } from './staff.config.ts'
export default {
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-stat-sell-staff'
  },
  modals: {
    ShopStatSellAmount
  },
  serviceInject() {
    return {
      staffService: StaffService
    }
  },
  rxState() {
    return {
      loading: this.staffService.loading$,
      list: this.staffService.list$,
      departmentList: this.staffService.departmentList$,
      staffList: this.staffService.staffList$,
      page: this.staffService.page$,
      total$: this.staffService.total$,
      auth: this.staffService.auth$
    }
  },
  computed: {
    columns,
    totalColumns,
    staffListFilter() {
      if (this.$searchQuery.department_id === -1) return this.staffList
      return [
        { id: -1, name: '所有销售' },
        ...this.staffList.filter(item => {
          return this.$searchQuery.department_id === item.department_id
        })
      ]
    }
  },
  methods: {
    onCLickPerformanceAmount() {
      this.$modalRouter.push({
        name: 'shop-stat-sell-amount',
        props: {
          type: 'total'
        }
      })
    },
    getSellTotalAmount(record) {
      this.$modalRouter.push({
        name: 'shop-stat-sell-amount',
        props: {
          record
        }
      })
    },
    onChangeStaff(value) {
      this.onMultiSearch({ staff_id: value })
    },
    onChangeDepartment(value) {
      this.onMultiSearch({ department_id: value, staff_id: -1 })
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    recentChange(searchFieldsValue) {
      this.onMultiSearch(searchFieldsValue)
    }
  }
}
</script>
