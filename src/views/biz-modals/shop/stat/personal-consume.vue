<template>
  <st-modal
    wrapClassName="modal-stat-personal-course"
    title="消课价值(私)"
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
      :loading="loading$.getConsumeList"
      :showSizeChanger="false"
      :dataSource="consumeList$"
    ></st-table>
  </st-modal>
</template>
<script>
import { columns } from './personal-course.config'
import tableMixin from '@/mixins/table.mixin'
import { PersonalConsumeService } from './personal-consume.service'
export default {
  name: 'PersonalConsume',
  mixins: [tableMixin],
  serviceInject() {
    return {
      personalConsumeService: PersonalConsumeService
    }
  },
  rxState() {
    const {
      consumeList$,
      page$,
      loading$,
      modalCoachList$,
      modalCourseList$,
      courseTypeList$
    } = this.personalConsumeService
    return {
      modalCoachList$,
      modalCourseList$,
      courseTypeList$,
      consumeList$,
      page$,
      loading$
    }
  },
  data() {
    return {
      show: false,
      consumeList: [],
      course_type: 1,
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
      return this.courseTypeList$.filter(item => item.value !== 3)
    }
  },
  props: {
    stat_date: String
  },
  watch: {
    query(newVal, oldVal) {
      this.personalConsumeService.getConsumeList(newVal).subscribe()
    }
  },
  methods: {
    onChangeCourseType(val) {
      this.course_id = -1
      this.coach_id = -1
      this.personalConsumeService
        .getCheckinModalCoachAndCourseList({ course_type: val })
        .subscribe()
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
    this.personalConsumeService
      .init({ course_type: 1 }, { stat_date: this.stat_date, course_type: 1 })
      .subscribe()
  }
}
</script>
