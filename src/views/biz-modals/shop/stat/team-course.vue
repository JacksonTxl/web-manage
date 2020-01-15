<template>
  <st-modal
    wrapClassName="modal-stat-team-course"
    title="上课节数(团)"
    width="960px"
    v-model="show"
  >
    <div class="search mg-b16">
      <div class="search__left">
        <a-select
          showSearch
          placeholder="请选择课程"
          optionFilterProp="children"
          style="width: 200px"
          v-model="course_id"
          @change="getCourseList"
          :filterOption="filterOption"
        >
          <a-select-option
            :value="course.id"
            v-for="course in modalCourseList$"
            :key="course.id"
          >
            {{ course.name }}
          </a-select-option>
        </a-select>
        <a-select
          class="mg-l8"
          showSearch
          :placeholder="`请选择${$c('coach')}`"
          v-if="showTable"
          optionFilterProp="children"
          style="width: 200px"
          v-model="coach_id"
          @change="getCourseList"
          :filterOption="filterOption"
        >
          <a-select-option
            :value="course.id"
            v-for="course in modalCoachList$"
            :key="course.id"
          >
            {{ course.name }}
          </a-select-option>
        </a-select>
      </div>
      <div class="search__right"></div>
    </div>
    <st-table
      :columns="columns"
      :rowKey="record => record.id"
      :loading="loading$.getCourseList"
      :dataSource="courseList$"
      :simplePage="true"
      :page="page$"
      page-mode="client"
    ></st-table>
    <div slot="footer">
      <st-button
        type="primary"
        v-if="auth$.export"
        v-export-excel="exportParams"
      >
        全部导出
      </st-button>
    </div>
  </st-modal>
</template>
<script>
import { columns } from './team-course.config'
import { TeamCourseService } from './team-course.service'
import { COURSE_TYPE } from '@/constants/stat/course'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'TeamCourse',
  serviceInject() {
    return {
      teamCourseService: TeamCourseService
    }
  },
  rxState() {
    const {
      courseList$,
      page$,
      loading$,
      modalCoachList$,
      modalCourseList$,
      auth$
    } = this.teamCourseService
    return {
      modalCoachList$,
      modalCourseList$,
      courseList$,
      page$,
      auth$,
      loading$
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
      consumeList: [],
      stat_date: '',
      course_type: COURSE_TYPE.TEAM,
      coach_id: -1,
      course_id: -1,
      current_page: 1,
      // TODO: 准备做后端翻页
      size: 99999
    }
  },
  computed: {
    columns,
    showTable() {
      return this.$route.path.includes('shop/course/summary') ? 'all' : 'coach'
    },
    exportParams() {
      const type = 'shop/team/course'
      return this.type === 'total'
        ? { type: `${type}/total`, query: this.totalQuery }
        : { type, query: this.query }
    },
    totalQuery() {
      let query = cloneDeep(this.$searchQuery)
      delete query.showTable
      delete query.current_page
      delete query.size
      query = {
        course_type: this.course_type,
        current_page: this.current_page,
        size: this.size,

        course_id: this.course_id,
        type: '/total',
        ...query
      }
      if (this.showTable) {
        query.coach_id = this.coach_id
      }
      return query
    },
    query() {
      return {
        stat_date: this.stat_date,
        course_type: this.course_type,
        coach_id: this.coach_id,
        course_id: this.course_id,
        current_page: this.current_page,
        size: this.size
      }
    }
  },
  methods: {
    getCourseList() {
      const query = this.type === 'total' ? this.totalQuery : this.query
      this.teamCourseService.getCourseList(query).subscribe()
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    init() {
      this.coach_id = this.record.coach_id || -1
      this.stat_date = this.record.stat_date
      const query = this.type === 'total' ? this.totalQuery : this.query
      this.teamCourseService
        .init({ course_type: COURSE_TYPE.TEAM }, { ...query })
        .subscribe()
    }
  },
  mounted() {
    this.init()
  }
}
</script>
