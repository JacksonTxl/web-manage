<template>
  <st-modal
    wrapClassName="modal-stat-sell-amount"
    title="总销售业绩"
    width="1150px"
    :footer="null"
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
            v-for="staff in modalStaffList"
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
      :page="page"
      :columns="columns"
      :loading="loading.getSellAmountList"
      @change="getAmountList"
      rowKey="id"
      :dataSource="amountList"
    >
      <span slot="sale_price" slot-scope="text">
        {{ text }}
      </span>
      <span slot="saleTitle">
        业绩金额
        <st-help-tooltip id="TSSR007" />
      </span>
    </st-table>
  </st-modal>
</template>
<script>
import { columns } from './sell-amount.config'
import tableMixin from '@/mixins/table.mixin'
import { SellAmountService } from './sell-amount.service'
import { COURSE_TYPE } from '@/constants/stat/course'
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
      loading$,
      modalDepartmentList$,
      modalStaffList$
    } = this.sellAmountervice
    return {
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
      default: () => {}
    }
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
        size: 20
      }
    }
  },
  computed: {
    columns,
    showTable() {
      return this.$route.query.showTable || 'all'
    },
    query() {
      return {
        stat_date: this.pageParams.stat_date,
        staff_id: this.pageParams.staff_id,
        department_id: this.pageParams.department_id,
        current_page: this.pageParams.current_page,
        size: this.pageParams.size
      }
    }
  },
  methods: {
    getAmountList(evt, changeType) {
      if (evt.pageSize) {
        this.pageParams.size = evt.pageSize
        this.pageParams.current_page = evt.current
      }
      if (changeType === 'changeDepartment') {
        this.pageParams.staff_id = -1
      }
      this.sellAmountervice.getSellAmountList(this.query).subscribe()
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
      this.sellAmountervice.init({ ...this.query }).subscribe()
    }
  },
  mounted() {
    this.init()
  }
}
</script>
