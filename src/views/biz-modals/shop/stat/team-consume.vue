<template>
  <st-modal
    wrapClassName="modal-stat-team-course"
    title="消课价值(团)"
    width="878px"
    :footer="null"
    v-model="show"
  >
    <div class="search mg-b8">
      <div class="search__left"></div>
      <div class="search__right">
        <a-select
          class="mg-l8"
          showSearch
          placeholder="请选择课程"
          optionFilterProp="children"
          style="width: 200px"
          @change="getConsumeList"
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
          @change="getConsumeList"
          :filterOption="filterOption"
        >
          <a-select-option
            :value="coach.id"
            v-for="coach in modalCoachList$"
            :key="coach.id"
          >
            {{ coach.name }}
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
import { columns } from './team-consume.config'
import { TeamConsumeService } from './team-consume.service'
import { COURSE_TYPE } from '@/constants/stat/course'
export default {
  name: 'TeamConsume',
  serviceInject() {
    return {
      teamConsumeService: TeamConsumeService
    }
  },
  rxState() {
    const {
      consumeList$,
      page$,
      loading$,
      modalCoachList$,
      modalCourseList$
    } = this.teamConsumeService
    return {
      modalCoachList$,
      modalCourseList$,
      consumeList$,
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
      course_type: COURSE_TYPE.TEAM,
      coach_id: -1,
      course_id: -1
    }
  },
  computed: {
    columns,
    query() {
      return {
        stat_date: this.stat_date,
        coach_id: this.coach_id,
        course_id: this.course_id
      }
    }
  },
  methods: {
    getConsumeList() {
      this.teamConsumeService.getConsumeList(this.query).subscribe()
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
    this.teamConsumeService
      .init({ course_type: COURSE_TYPE.TEAM }, { stat_date: this.stat_date })
      .subscribe()
  }
}
</script>
