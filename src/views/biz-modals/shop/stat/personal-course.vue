<template>
  <st-modal
    wrapClassName="modal-stat-personal-course"
    title="上课节数(私)"
    :footer="null"
    v-model="show"
  >
    {{ modalCoachList$ }}
    {{ modalCourseList$ }}
    <div class="search mg-b8">
      <div class="search__left"></div>
      <div class="search__right">
        <a-select
          class="mg-l8"
          showSearch
          placeholder="请选择课程"
          optionFilterProp="children"
          style="width: 200px"
          @change="onChangeCourse"
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
          @change="onChangeCoach"
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
      @change="onTableChange"
      :showSizeChanger="false"
      :dataSource="courseList$"
    ></st-table>
  </st-modal>
</template>
<script>
import { columns } from './personal-course.config'
import { PersonalCourseService } from './personal-course.service'
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
      modalCourseList$
    } = this.personalCourseService
    return {
      modalCoachList$,
      modalCourseList$,
      courseList$,
      page$,
      loading$
    }
  },
  data() {
    return {
      show: false,
      consumeList: [],
      course_type: 1
    }
  },
  computed: {
    columns
  },
  props: {
    stat_date: String
  },
  methods: {
    onChangeCoach(value) {
      this.personalCourseService
        .getCourseList({
          stat_date: this.stat_date,
          course_type: this.course_type,
          coach_id: value
        })
        .subscribe()
    },
    handleChangeCourse() {},
    filterOptionCoach(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    }
  },
  mounted() {
    this.personalCourseService
      .init({ course_type: 1 }, { stat_date: this.stat_date, course_type: 1 })
      .subscribe()
  }
}
</script>
