<template>
  <div :class="bPage()">
    <section class="mg-b16" :class="bHeard()">
      <div :class="bHeard('left')">
        <st-button
          v-if="auth.export_all"
          v-show="showTable === 'all'"
          type="primary"
          v-export-excel="{ type: 'course/shop', query: $searchQuery }"
        >
          全部导出
        </st-button>
        <st-button
          type="primary"
          v-if="auth.export_coach"
          v-show="showTable === 'coach'"
          v-export-excel="{ type: 'shop/coach', query: $searchQuery }"
        >
          全部导出
        </st-button>
      </div>
      <div :class="bHeard('right')">
        <a-radio-group
          class="mg-r12"
          :value="showTable"
          @change="handleSizeChange"
        >
          <a-radio-button value="all" v-if="auth.summary">汇总</a-radio-button>
          <a-radio-button value="coach" v-if="auth.coach">
            {{ $c('coach') }}
          </a-radio-button>
        </a-radio-group>
        <div v-if="showTable === 'coach'">
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
            :placeholder="`请选择${$c('coach')}`"
            optionFilterProp="children"
            class="mg-r8"
            style="width: 200px"
            @change="onChangeCoach"
            v-model="$searchQuery.coach_id"
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
    <st-total
      :class="bPage('total')"
      :indexs="columns"
      :dataSource="total$"
      hasTitle
    >
      <template v-slot:personal_checkin_amount="record">
        <st-total-item
          @click.native="onCLickPersonalCheckinAmount"
          :unit="record.unit"
          :label="record.label"
          :value="record.value"
        ></st-total-item>
      </template>
      <template v-slot:team_checkin_amount="record">
        <st-total-item
          @click.native="onCLickTeamCheckinAmount"
          :unit="record.unit"
          :label="record.label"
          :value="record.value"
        ></st-total-item>
      </template>
      <template v-slot:personal_course_num="record">
        <st-total-item
          @click.native="onCLickPersonalNum"
          :unit="record.unit"
          :label="record.label"
          :value="record.value"
        ></st-total-item>
      </template>
      <template v-slot:team_course_num="record">
        <st-total-item
          @click.native="onCLickTeamNum"
          :unit="record.unit"
          :label="record.label"
          :value="record.value"
        ></st-total-item>
      </template>
    </st-total>
    <st-table
      class="mg-t12"
      :page="page"
      :scroll="{ x: 2200 }"
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
      <a
        slot="small_course_num"
        slot-scope="text, record"
        @click="getSmallCourse(record)"
        v-if="text !== 0"
      >
        {{ text }}
      </a>
      <span v-else>{{ text }}</span>
      <a
        slot="small_checkin_amount"
        slot-scope="text, record"
        @click="getSmallConsume(record)"
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
      <span slot="smallTitle">
        {{$c('small_course')}消课价值（元)
        <st-help-tooltip id="TSCR003" />
      </span>
    </st-table>
  </div>
</template>
<script>
import { CourseService } from './course.service'
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
      courseService: CourseService
    }
  },
  rxState() {
    return {
      loading: this.courseService.loading$,
      list: this.courseService.list$,
      total$: this.courseService.total$,
      departmentList: this.courseService.departmentList$,
      coachList: this.courseService.coachList$,
      page: this.courseService.page$,
      auth: this.courseService.auth$
    }
  },
  data() {
    return {
      showTable: 'all'
    }
  },
  computed: {
    columns(vm) {
      return this.showTable === 'all' ? allColumns(vm) : coachColumns(vm)
    },
    coachListFilter(vm) {
      if (this.$searchQuery.department_id === -1) return this.coachList
      return [
        { id: -1, name: `全部${vm.$c('coach')}` },
        ...this.coachList.filter(item => {
          item.department_id = Array.isArray(item.department_id)
            ? item.department_id
            : [item.department_id]
          return item.department_id.includes(this.$searchQuery.department_id)
        })
      ]
    }
  },
  created() {
    this.showTable =
      this.auth.summary && this.$searchQuery.showTable === 'all'
        ? 'all'
        : 'coach'
  },
  methods: {
    onCLickPersonalCheckinAmount() {
      this.$modalRouter.push({
        name: 'shop-stat-personal-consume',
        props: {
          type: 'total'
        }
      })
    },
    onCLickTeamCheckinAmount() {
      console.log('你点击了+ onCLickTeamCheckinAmount')
      this.$modalRouter.push({
        name: 'shop-stat-team-consume',
        props: {
          type: 'total'
        }
      })
    },
    onCLickPersonalNum() {
      this.$modalRouter.push({
        name: 'shop-stat-personal-course',
        props: {
          type: 'total'
        }
      })
    },
    onCLickTeamNum() {
      this.$modalRouter.push({
        name: 'shop-stat-team-course',
        props: {
          type: 'total'
        }
      })
    },
    getPersonalCourse(record) {
      this.$modalRouter.push({
        name: 'shop-stat-personal-course',
        props: {
          record
        }
      })
    },
    getPersonalConsume(record) {
      this.$modalRouter.push({
        name: 'shop-stat-personal-consume',
        props: {
          record
        }
      })
    },
    getTeamCourse(record) {
      this.$modalRouter.push({
        name: 'shop-stat-team-course',
        props: {
          record
        }
      })
    },
    getTeamConsume(record) {
      this.$modalRouter.push({
        name: 'shop-stat-team-consume',
        props: {
          record
        }
      })
    },
    getSmallCourse() {
      console.log('d')
    },
    getSmallConsume() {
      console.log('d')
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
      this.$router.push({ query })
    }
  }
}
</script>
