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
            v-model="query.department"
            :filterOption="filterOption"
          >
            <a-select-option
              :value="+department.id"
              v-for="department in departmentList"
              :key="department"
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
            v-model="query.id"
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
      :scroll="{ x: 1800 }"
      @change="onTableChange"
      :loading="loading.init"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
    >
      <a
        slot="personal_course_num"
        @click="getPersonalCourse(record)"
        slot-scope="text, record"
        v-if="text !== 0"
      >
        {{ text }}
      </a>
      <!-- <span v-else>{{ text }}</span>
      <a
        slot="personal_checkin_amount"
        @click="getPersonalConsume(record)"
        slot-scope="text, record"
      >
        {{ text }}
      </a>
      <a
        slot="team_course_num"
        slot-scope="text, record"
        @click="getTeamCourse(record)"
        v-if="text !== 0"
      >
        {{ text }}
      </a>
      <span v-else>{{ text }}</span>
      <a
        slot="team_checkin_amount"
        slot-scope="text, record"
        @click="getTeamConsume(record)"
      >
        {{ text }}
      </a>
      <span slot="personalTitle">
        私教消课价值（元)
        <st-help-tooltip id="TSCR001" />
      </span>
      <span slot="teamTitle">
        团课消课价值（元）
        <st-help-tooltip id="TSCR002" />
      </span> -->
    </st-table>
  </div>
</template>
<script>
import { SellService } from './sell.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
//import ShopStatPersonalCourse from '@/views/biz-modals/shop/stat/personal-course'
import { allColumns, staffColumns } from './sell.config.ts'
export default {
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-stat-sell',
    bHeard: 'header'
  },
  modals: {
    // ShopStatPersonalCourse
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
      return this.showTable === 'all' ? allColumns() : staffColumns()
    },
    // 改变员的时候使用该方法 ： 如果选全部员工，则执行第一句
    staffListFilter() {
      if (this.query.department === 1) return this.staffList
      return [
        { id: -1, name: '所有销售' },
        ...this.staffList.filter(item => {
          return this.query.department === item.department
        })
      ]
    }
  },
  created() {
    this.showTable = this.query.showTable
    console.log(this.departmentList);
    console.log();
  },
  methods: {
    // getPersonalCourse(record) {
    //   this.$modalRouter.push({
    //     name: 'shop-stat-personal-course',
    //     props: {
    //       record
    //     }
    //   })
    // },
    onChangeStaff(value) {
      console.log('选择员工');
      console.log(value);
      this.onMultiSearch({ staff: value })
    },
    onChangeDepartment(value) {
      this.onMultiSearch({ department: value, staff: -1 })
    },
    // 格式化
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
        query.department = -1
        query.staff = -1
      }
      this.$router.push({ query, force: true })
    }
  }
}
</script>
