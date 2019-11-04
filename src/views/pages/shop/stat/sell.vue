<template>
  <div :class="bPage()">
    <section class="mg-b16" :class="bHeard()">
      <div :class="bHeard('left')">
        <!-- TODO: <st-button type="primary" class="shop-member-list-button">批量导出</st-button> -->
        <a-radio-group :value="showTable" @change="handleSizeChange">
          <a-radio-button value="all">汇总</a-radio-button>
          <a-radio-button value="staff">员工</a-radio-button>
        </a-radio-group>
      </div>
      <div :class="bHeard('right')">
        <div v-if="showTable === 'staff'">
          <a-select
            class="mg-r8"
            placeholder="请选择部门"
            optionFilterProp="children"
            style="width: 200px"
            @change="onChangeDepartment"
            v-model="query.department_id"
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
            v-model="query.staff_id"
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
        </div>

        <st-recent-radio-group @change="recentChange"></st-recent-radio-group>
      </div>
    </section>
    <st-table
      :page="page"
      :scroll="{ x: 2300 }"
      @change="onTableChange"
      :loading="loading.init"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
    >
      <span slot="member_card_num" slot-scope="text">
        {{ text }}
      </span>
      <span slot="deposit_card_num" slot-scope="text">
        {{ text }}
      </span>
      <span slot="deposit_card_num" slot-scope="text">
        {{ text }}
      </span>
      <span slot="team_course_num" slot-scope="text">
        {{ text }}
      </span>
      <span slot="total_course_num" slot-scope="text">
        {{ text }}
      </span>
      <span slot="other_amount" slot-scope="text">
        {{ text }}
      </span>
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
      <span slot="teamTitle">
        团课购买节数
        <st-help-tooltip id="TSSR003" />
      </span>
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
import { SellService } from './sell.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import ShopStatSellAmount from '@/views/biz-modals/shop/stat/sell-amount'
import { allColumns, staffColumns } from './sell.config.ts'
export default {
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-stat-sell',
    bHeard: 'header'
  },
  modals: {
    ShopStatSellAmount
  },
  serviceInject() {
    return {
      routeService: RouteService,
      sellService: SellService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      loading: this.sellService.loading$,
      list: this.sellService.list$,
      departmentList: this.sellService.departmentList$,
      staffList: this.sellService.staffList$,
      page: this.sellService.page$
    }
  },
  data() {
    return {
      showTable: 'all'
    }
  },
  computed: {
    columns() {
      return this.showTable === 'all' ? allColumns(this) : staffColumns(this)
    },
    staffListFilter() {
      if (this.query.department_id === -1) return this.staffList
      return [
        { id: -1, name: '所有销售' },
        ...this.staffList.filter(item => {
          return this.query.department_id === item.department_id
        })
      ]
    }
  },
  created() {
    this.showTable = this.query.showTable
  },
  methods: {
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
    },
    handleSizeChange(val) {
      this.showTable = val.target.value
      let query = { showTable: this.showTable }
      if (this.showTable === 'staff') {
        query.department_id = -1
        query.staff_id = -1
      }
      this.$router.push({ query })
    }
  }
}
</script>
