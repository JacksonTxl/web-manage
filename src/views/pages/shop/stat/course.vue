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
            showSearch
            placeholder="请选择部门"
            optionFilterProp="children"
            style="width: 200px"
            @focus="onFocusDepartment"
            @blur="onBlurDepartment"
            @change="onChangeDepartment"
            :filterOption="filterOptionDepartment"
          >
            <a-select-option
              :value="department.id"
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
            @focus="onFocusCoach"
            @blur="onBlurCoach"
            @change="onChangeCoach"
            :filterOption="filterOptionCoach"
          >
            <a-select-option
              :value="coach.id"
              v-for="coach in coachList"
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
      :loading="loading.getOrderShopList"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
    >
      <a
        slot="personal_course_num"
        @click="getPersonalCourse(record.id)"
        slot-scope="text, record"
        v-if="text !== 0"
      >
        {{ text }}
      </a>
      <span v-else>{{ text }}</span>
      <a
        slot="personal_consume_amount"
        @click="getPersonalConsume(record.id)"
        slot-scope="text, record"
        v-if="text !== '0.0'"
      >
        {{ text }}
      </a>
      <span v-else>{{ text }}</span>
      <a
        slot="team_course_num"
        slot-scope="text, record"
        @click="getTeamCourse(record.id)"
        v-if="text !== 0"
      >
        {{ text }}
      </a>
      <span v-else>{{ text }}</span>
      <a
        slot="team_consume_amount"
        slot-scope="text, record"
        @click="getTeamConsume(record.id)"
        v-if="text !== '0.0'"
      >
        {{ text }}
      </a>
      <span v-else>{{ text }}</span>
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
import { allColumns, courseColumns } from './course.config.ts'
export default {
  mixins: [tableMixin],
  bem: {
    bPage: 'page-shop-stat-course',
    bHeard: 'heard'
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
      return this.showTable === 'all' ? allColumns() : courseColumns()
    }
  },
  created() {
    this.showTable = this.$route.query.showTable
  },
  methods: {
    getPersonalCourse(id) {
      this.$modalRouter.push({ name: 'shop-stat-personal-course' })
    },
    getPersonalConsume() {
      this.$modalRouter.push({ name: 'shop-stat-personal-consume' })
    },
    getTeamCourse() {
      this.$modalRouter.push({ name: 'shop-stat-team-course' })
    },
    getTeamConsume() {
      this.$modalRouter.push({ name: 'shop-stat-team-consume' })
    },
    onChangeCoach(value) {
      console.log(`selected ${value}`)
      this.$router.push({ query: { ...query, coach_id: value } })
    },
    onBlurCoach() {
      console.log('blur')
    },
    onFocusCoach() {
      console.log('focus')
    },
    filterOptionCoach(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    onChangeDepartment(value) {
      const query = {
        department_id: value
      }
      this.courseService.getCoachList(query).subscribe(() => {
        this.$router.push({ query: { ...query, department_id: value } })
      })
    },
    onBlurDepartment() {
      console.log('blur')
    },
    onFocusDepartment() {
      console.log('focus')
    },
    filterOptionDepartment(input, option) {
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
      this.$router.push({ query: { ...this.query, showTable: this.showTable } })
    }
  }
}
</script>
