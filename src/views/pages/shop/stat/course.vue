<template>
  <div :class="bPage()">
    <section class="mg-b16" :class="bHeard()">
      <div :class="bHeard('left')">
        <!-- TODO: <st-button type="primary" class="shop-member-list-button">批量导出</st-button> -->
        <a-radio-group :value="showTable" @change="handleSizeChange">
          <a-radio-button value="all">汇总</a-radio-button>
          <a-radio-button value="coach">教练</a-radio-button>
        </a-radio-group>
      </div>
      <div :class="bHeard('right')">
        <div v-if="showTable === 'coach'">
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
            placeholder="请选择教练"
            optionFilterProp="children"
            class="mg-r8"
            style="width: 200px"
            @change="onChangeCoach"
            v-model="query.coach_id"
            :filterOption="filterOption"
          >
            <a-select-option
              :value="+coach.id"
              v-for="coach in coachListFilter"
              :key="coach.id"
            >
              {{ coach.name }}
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
      <span v-else>{{ text }}</span>
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
      </span>
    </st-table>
  </div>
</template>
<script>
import { CourseService } from './course.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import ShopStatPersonalCourse from '@/views/biz-modals/shop/stat/personal-course'
import ShopStatPersonalConsume from '@/views/biz-modals/shop/stat/personal-consume'
import ShopStatTeamCourse from '@/views/biz-modals/shop/stat/team-course'
import ShopStatTeamConsume from '@/views/biz-modals/shop/stat/team-consume'
import { allColumns, coachColumns } from './course.config.ts'
export default {
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-stat-course',
    bHeard: 'header'
  },
  modals: {
    ShopStatPersonalCourse,
    ShopStatPersonalConsume,
    ShopStatTeamCourse,
    ShopStatTeamConsume
  },
  serviceInject() {
    return {
      routeService: RouteService,
      courseService: CourseService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      loading: this.courseService.loading$,
      list: this.courseService.list$,
      departmentList: this.courseService.departmentList$,
      coachList: this.courseService.coachList$,
      page: this.courseService.page$
    }
  },
  data() {
    return {
      showTable: 'all'
    }
  },
  computed: {
    columns() {
      return this.showTable === 'all' ? allColumns() : coachColumns()
    },
    coachListFilter() {
      if (this.query.department_id === -1) return this.coachList
      return [
        { id: -1, name: '全部教练' },
        ...this.coachList.filter(item => {
          return this.query.department_id === item.department_id
        })
      ]
    }
  },
  created() {
    this.showTable = this.query.showTable
  },
  methods: {
    getPersonalCourse(record) {
      const { stat_date } = record
      this.$modalRouter.push({
        name: 'shop-stat-personal-course',
        props: {
          stat_date
        }
      })
    },
    getPersonalConsume(record) {
      const { stat_date } = record
      this.$modalRouter.push({
        name: 'shop-stat-personal-consume',
        props: {
          stat_date
        }
      })
    },
    getTeamCourse(record) {
      const { stat_date } = record
      this.$modalRouter.push({
        name: 'shop-stat-team-course',
        props: {
          stat_date
        }
      })
    },
    getTeamConsume(record) {
      const { stat_date } = record
      this.$modalRouter.push({
        name: 'shop-stat-team-consume',
        props: {
          stat_date
        }
      })
    },
    onChangeCoach(value) {
      this.onMultiSearch({ coach_id: value })
    },
    onChangeDepartment(value) {
      this.onMultiSearch({ department_id: value, coach_id: -1 })
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
      if (this.showTable === 'coach') {
        query.department_id = -1
        query.coach_id = -1
      }
      this.$router.push({ query, force: true })
    }
  }
}
</script>
