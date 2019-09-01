<template>
  <st-modal
    wrapClassName="modal-stat-personal-course"
    title="上课节数(私)"
    :footer="null"
    v-model="show"
  >
    <div class="search mg-b8">
      <div class="search__left"></div>
      <div class="search__right">
        <a-select
          class="mg-l8"
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
      :page="page$"
      :loading="loading$.getCourseList"
      :showSizeChanger="false"
      :dataSource="courseList$"
    ></st-table>
  </st-modal>
</template>
<script>
import { columns } from './personal-course.config'
import { PersonalCourseService } from './personal-course.service'
import { COURSE_TYPE } from '@/constants/stat/course'
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
    stat_date: String
  },
  data() {
    return {
      show: false,
      consumeList: [],
      course_type: COURSE_TYPE.PERSONAL,
      coach_id: -1,
      course_id: -1
    }
  },
  computed: {
    columns,
    query() {
      return {
        stat_date: this.stat_date,
        course_type: this.course_type,
        coach_id: this.coach_id,
        course_id: this.course_id
      }
    },
    courseTypeList() {
      return this.courseTypeList$.filter(
        item => item.value !== COURSE_TYPE.TEAM
      )
    }
  },
  methods: {
    onChange() {
      this.personalCourseService.getCourseList(this.query).subscribe()
    },
    init() {
      const course_type = this.course_type
      this.personalCourseService
        .init({ course_type }, { stat_date: this.stat_date, course_type })
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
