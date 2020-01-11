<template>
  <st-modal
    wrapClassName="modal-stat-personal-course"
    title="上课节数(私)"
    width="960px"
    v-model="show"
  >
    <div class="search mg-b16">
      <div class="search__left">
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
          v-if="showTable"
          :placeholder="`请选择${$c('coach')}`"
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
      <div class="search__right"></div>
    </div>
    <st-table
      :columns="columns"
      :rowKey="record => record.id"
      :loading="loading$.getCourseList"
      :dataSource="courseList$"
      page-mode="client"
    ></st-table>
    <div slot="footer">
      <st-button
        type="primary"
        v-if="auth$.export && type !== 'total'"
        v-export-excel="exportParams"
      >
        全部导出
      </st-button>
    </div>
  </st-modal>
</template>
<script>
import { columns } from './personal-course.config'
import { PersonalCourseService } from './personal-course.service'
import { COURSE_TYPE } from '@/constants/stat/course'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'PersonalCourse',
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
      courseTypeList$,
      auth$
    } = this.personalCourseService
    return {
      modalCoachList$,
      modalCourseList$,
      courseTypeList$,
      courseList$,
      page$,
      loading$,
      auth$
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
      stat_date: '',
      consumeList: [],
      course_type: COURSE_TYPE.PERSONAL,
      coach_id: -1,
      course_id: -1,
      current_page: 1,
      // TODO: 准备做后端翻页
      size: 99999,
      page: {}
    }
  },
  computed: {
    columns,
    showTable() {
      return this.$route.path.includes('stat/course/summary')
    },
    exportParams() {
      const type = 'shop/personal/course'
      return this.type === 'total'
        ? { type: `${type}/total`, query: this.totalQuery }
        : { type, query: this.query }
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
    courseTypeList() {
      return this.courseTypeList$.filter(
        item => item.value !== COURSE_TYPE.TEAM
      )
    }
  },
  methods: {
    getCourseList() {
      const query = this.type === 'total' ? this.totalQuery : this.query
      this.personalCourseService.getCourseList(query).subscribe()
    },
    init() {
      const course_type = this.course_type
      this.coach_id = this.record.coach_id || -1
      this.stat_date = this.record.stat_date
      const query = this.type === 'total' ? this.totalQuery : this.query
      this.personalCourseService.init({ course_type }, { ...query }).subscribe()
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
