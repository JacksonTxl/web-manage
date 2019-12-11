<template>
  <st-modal
    wrapClassName="modal-stat-sell-amount"
    title="总销售业绩"
    width="1150px"
    v-model="show"
    :loading="loading.init"
  >
    <div class="search mg-b8">
      <div class="search__left">
        <a-select
          showSearch
          placeholder="请选择部门"
          optionFilterProp="children"
          style="width: 200px"
          v-if="showTable === 'all'"
          @change="getAmountList($event, 'changeDepartment')"
          v-model="pageParams.department_id"
          :filterOption="filterOption"
        >
          <a-select-option
            :value="department.id"
            v-for="department in modalDepartmentList"
            :key="department.id"
          >
            {{ department.name }}
          </a-select-option>
        </a-select>
        <a-select
          class="mg-l8"
          showSearch
          placeholder="所有销售"
          optionFilterProp="children"
          style="width: 200px"
          v-if="showTable === 'all'"
          v-model="pageParams.staff_id"
          @change="getAmountList"
          :filterOption="filterOption"
        >
          <a-select-option
            :value="staff.id"
            v-for="staff in staffListFilter"
            :key="staff.id"
          >
            {{ staff.name }}
          </a-select-option>
        </a-select>
      </div>
      <div class="search__right"></div>
    </div>
    <st-table
      :scroll="{ y: 345 }"
      :columns="columns"
      :loading="loading.getSellAmountList"
      rowKey="id"
      :dataSource="amountList"
      page-mode="client"
    >
      <span slot="sale_price" slot-scope="text">
        {{ text }}
      </span>
      <span slot="saleTitle">
        业绩金额
        <st-help-tooltip id="TSSR007" />
      </span>
    </st-table>
    <div slot="footer">
      khjgfxjhsgj
      <st-button
        type="primary"
        v-if="auth$.export"
        v-export-excel="{
          type: '/sale',
          query: query
        }"
      >
        全部导出
      </st-button>
    </div>
  </st-modal>
</template>
<script>
import { columns } from './sell-amount.config'
import tableMixin from '@/mixins/table.mixin'
import { SellAmountService } from './sell-amount.service'
import { COURSE_TYPE } from '@/constants/stat/course'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'SellAmount',
  mixins: [tableMixin],
  serviceInject() {
    return {
      sellAmountervice: SellAmountService
    }
  },
  rxState() {
    let {
      amountList$,
      page$,
      auth$,
      loading$,
      modalDepartmentList$,
      modalStaffList$
    } = this.sellAmountervice
    return {
      auth$,
      page: page$,
      amountList: amountList$,
      loading: loading$,
      modalDepartmentList: modalDepartmentList$,
      modalStaffList: modalStaffList$
    }
  },
  props: {
    record: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: String
  },
  data() {
    return {
      show: false,
      pageParams: {
        stat_date: '',
        amountList: [],
        staff_id: -1,
        department_id: -1,
        current_page: 1,
        size: 999
      }
    }
  },
  computed: {
    columns,
    showTable() {
      return this.$searchQuery.showTable || 'all'
    },
    totalQuery() {
      let query = cloneDeep(this.$searchQuery)
      delete query.showTable
      delete query.current_page
      delete query.size
      return {
        ...query,
        current_page: this.pageParams.current_page,
        size: this.pageParams.size,
        staff_id: this.pageParams.staff_id,
        department_id: this.pageParams.department_id,
        type: '/total'
      }
    },
    query() {
      return {
        stat_date: this.pageParams.stat_date,
        staff_id: this.pageParams.staff_id,
        department_id: this.pageParams.department_id,
        current_page: this.pageParams.current_page,
        size: this.pageParams.size
      }
    },
    staffListFilter() {
      if (this.query.department_id === -1) return this.modalStaffList
      return [
        { id: -1, name: '所有销售' },
        ...this.modalStaffList.filter(item => {
          return this.query.department_id === item.department_id
        })
      ]
    }
  },
  methods: {
    getAmountList(evt, changeType) {
      if (evt.pageSize) {
        this.pageParams.size = evt.pageSize
        this.pageParams.current_page = evt.current
      }
      const query = this.type === 'total' ? this.totalQuery : this.query
      if (changeType === 'changeDepartment') {
        this.pageParams.staff_id = -1
        query.staff_id = -1
        this.sellAmountervice.getDepartmentStaffList(query).subscribe()
      }
      this.sellAmountervice.getSellAmountList(query).subscribe()
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    init() {
      this.pageParams.staff_id = this.record.staff_id || -1
      this.pageParams.stat_date = this.record.stat_date
      const query = this.type === 'total' ? this.totalQuery : this.query
      this.sellAmountervice.init({ ...this.query }).subscribe()
    }
  },
  mounted() {
    this.init()
  }
}
</script>
