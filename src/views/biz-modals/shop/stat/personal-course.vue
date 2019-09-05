<template>
  <st-modal
    wrapClassName="modal-stat-personal-course"
    title="上课节数(私)"
    :footer="null"
    v-model="show"
  >
    <div class="search mg-b16">
      <div class="search__left"></div>
      <div class="search__right">
        <a-select
          placeholder="请选择课程类型"
          style="width: 120px"
          v-model="course_type"
          @change="onChangeCourseType"
          :options="courseTypeList"
        ></a-select>
        <a-select
          class="mg-l8"
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
          v-if="showTable === 'all'"
          placeholder="请选择教练"
          optionFilterProp="children"
          style="width: 200px"
          @change="getCourseList"
          v-model="coach_id"
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
    </div>
    <st-table
      :columns="columns"
      :rowKey="record => record.id"
      :page="page"
      :loading="loading$.getCourseList"
      :dataSource="courseList$"
    ></st-table>
  </st-modal>
</template>
<script>
import { columns } from './personal-course.config'
import { PersonalCourseService } from './personal-course.service'
import { COURSE_TYPE } from '@/constants/stat/course'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'PersonalConsume',
  serviceInject() {
    return {
      personalCourseService: PersonalCourseService
    }
  },
  rxState() {
    const {
      courseList$,
      page$,
      loading$,
      modalCoachList$,
      modalCourseList$,
      courseTypeList$
    } = this.personalCourseService
    return {
      modalCoachList$,
      modalCourseList$,
      courseTypeList$,
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
      stat_date: '',
      consumeList: [],
      course_type: COURSE_TYPE.PERSONAL,
      coach_id: -1,
      course_id: -1,
      current_page: 1,
      size: 999
    }
  },
  computed: {
    columns,
    page() {
      const { current_page, total_counts } = this.page$
      return { current_page, total_counts }
    },
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
    },
    courseTypeList() {
      return this.courseTypeList$.filter(
        item => item.value !== COURSE_TYPE.TEAM
      )
    }
  },
  methods: {
    getCourseList() {
      this.personalCourseService.getCourseList(this.query).subscribe()
    },
    init() {
      const course_type = this.course_type
      this.coach_id = this.record.coach_id || -1
      this.stat_date = this.record.stat_date
      this.personalCourseService
        .init({ course_type }, { ...this.query })
        .subscribe()
    },
    onChangeCourseType(val) {
      this.course_id = -1
      this.coach_id = -1
      this.course_type = val
      this.init()
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
    this.init()
  }
}
</script>
