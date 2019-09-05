<template>
  <st-modal
    wrapClassName="modal-stat-team-course"
    title="上课节数(团)"
    :footer="null"
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
          placeholder="请选择教练"
          v-if="showTable === 'all'"
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
      :page="page"
      :loading="loading$.getCourseList"
      @change="onChangePage"
      :showSizeChanger="false"
      :dataSource="courseList$"
    ></st-table>
  </st-modal>
</template>
<script>
import { columns } from './team-course.config'
import { TeamCourseService } from './team-course.service'
import { COURSE_TYPE } from '@/constants/stat/course'
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
      modalCourseList$
    } = this.teamCourseService
    return {
      modalCoachList$,
      modalCourseList$,
      courseList$,
      page$,
      loading$
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
      consumeList: [],
      stat_date: '',
      course_type: COURSE_TYPE.TEAM,
      coach_id: -1,
      course_id: -1,
      current_page: 1,
      size: 999,
      page: {}
    }
  },
  computed: {
    columns,
    showTable() {
      return this.$route.query.showTable || 'all'
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
      this.teamCourseService.getCourseList(this.query).subscribe()
    },
    onChangePage(pagination) {
      this.page.pageSize = pagination.size
      this.page.current_page = pagination.current
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    }
  },
  mounted() {
    this.coach_id = this.record.coach_id || -1
    this.stat_date = this.record.stat_date
    let { current_page, total_counts } = this.page$
    this.page = { current_page, total_counts }
    this.teamCourseService
      .init({ course_type: COURSE_TYPE.TEAM }, { ...this.query })
      .subscribe()
  }
}
</script>
