<template>
  <st-modal
    wrapClassName="modal-stat-team-course"
    title="消课价值(团)"
    width="960px"
    v-model="show"
  >
    <div class="search mg-b8">
      <div class="search__left">
        <a-select
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
          :placeholder="`请选择${$c('coach')}`"
          optionFilterProp="children"
          style="width: 200px"
          v-if="showTable === 'all'"
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
      <div class="search__right"></div>
    </div>
    <st-table
      :columns="columns"
      :rowKey="record => record.id"
      :loading="loading$.getConsumeList"
      :dataSource="consumeList$"
      page-mode="client"
    ></st-table>
    <div slot="footer">
      <st-button
        type="primary"
        v-if="auth$.export"
        v-export-excel="{
          type: 'shop/team/course/checkin',
          query: query
        }"
      >
        全部导出
      </st-button>
    </div>
  </st-modal>
</template>
<script>
import { columns } from './team-consume.config'
import { TeamConsumeService } from './team-consume.service'
import { COURSE_TYPE } from '@/constants/stat/course'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'ModalTeamConsume',
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
      modalCourseList$,
      auth$
    } = this.teamConsumeService
    return {
      modalCoachList$,
      modalCourseList$,
      consumeList$,
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
      course_type: COURSE_TYPE.TEAM,
      coach_id: -1,
      course_id: -1,
      current_page: 1,
      size: 999
    }
  },
  computed: {
    columns,
    showTable() {
      return this.$searchQuery.showTable || 'all'
    },
    totalQuery() {
      let query = cloneDeep(this.$searchQuery)
      delete query.showTable
      delete query.current_page
      delete query.size
      return {
        current_page: this.current_page,
        size: this.size,
        coach_id: this.coach_id,
        course_id: this.course_id,
        type: '/total',
        ...query
      }
    },
    query() {
      return {
        stat_date: this.stat_date,
        coach_id: this.coach_id,
        course_id: this.course_id,
        current_page: this.current_page,
        size: this.size
      }
    }
  },
  methods: {
    getConsumeList() {
      const query = this.type === 'total' ? this.totalQuery : this.query
      this.teamConsumeService.getConsumeList(query).subscribe()
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
      this.teamConsumeService
        .init({ course_type: COURSE_TYPE.TEAM }, { ...query })
        .subscribe()
    }
  },
  mounted() {
    this.init()
  }
}
</script>
