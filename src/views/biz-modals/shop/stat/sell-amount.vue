<template>
  <st-modal
    wrapClassName="modal-stat-sell-amount"
    title="总销售业绩"
    width="960px"
    :footer="null"
    v-model="show"
  >
    <div class="search mg-b8">
      <div class="search__left">
        <a-select
          showSearch
          placeholder="请选择部门"
          optionFilterProp="children"
          style="width: 200px"
          @change="onChangeDepartment"
          v-model="department_id"
          :filterOption="filterOption"
        >
          <a-select-option
            :value="department.id"
            v-for="department in modalDepartmentList$"
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
          v-model="staff_id"
          @change="onChangeStaff"
          :filterOption="filterOption"
        >
          <a-select-option
            :value="staff.id"
            v-for="staff in modalStaffList$"
            :key="staff.id"
          >
            {{ staff.name }}
          </a-select-option>
        </a-select>
      </div>
      <div class="search__right"></div>
    </div>
    <st-table
      :columns="columns"
      :rowKey="record => record.id"
      :loading="loading$.getAmountList"
      :dataSource="amountList$"
      page-mode="client"
    ></st-table>
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
    const {
      amountList$,
      page$,
      loading$,
      modalDepartmentList$,
      modalStaffList$
    } = this.sellAmountervice
    return {
      amountList$,
      page$,
      loading$,
      modalDepartmentList$,
      modalStaffList$
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
      stat_date: '',
      amountList: [],
      // course_type: COURSE_TYPE.TEAM,
      staff_id: -1,
      department_id: -1,
      current_page: 1,
      size: 999
    }
  },
  computed: {
    columns,
    showTable() {
      return this.$route.query.showTable || 'all'
    },
    page() {
      const { current_page, total_counts } = this.page$
      return { current_page, total_counts }
    },
    query() {
      return {
        stat_date: this.stat_date,
        staff_id: this.staff_id,
        department_id: this.department_id,
        current_page: this.current_page,
        size: this.size
      }
    }
  },
  methods: {
    getAmountList() {
      this.sellAmountervice.getSellAmountList(this.query).subscribe()
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
    init() {
      this.staff_id = this.record.staff_id || -1
      this.stat_date = this.record.stat_date
      this.sellAmountervice
        .init({ ...this.query })
        .subscribe()
    }
  },
  mounted() {
    this.init()
    console.log('获取传参===============');
    console.log(this.amountList);
    //console.log(this.record);
    console.log(this.modalStaffList$);
    console.log(this.modalDepartmentList$);
  }
}
</script>
