<template>
  <st-modal
    :title="title"
    v-model="show"
    :footer="null"
    wrapClassName="scroll-modal"
  >
    <div :class="b('total')">
      <div :class="b('num')">{{ info.checkin_amount }}</div>
      <div :class="b('num')">
        {{ info.royalty_price }}
        <label :class="b('tip')" v-if="info.royalty_mode_exist === 2">
          （该员工当月未设置提成模板）
        </label>
      </div>
    </div>
    <div class="mg-b16">
      <a-select
        placeholder="请选择课程类型"
        style="width: 120px"
        v-model="course_type"
        @change="onChangeCourseType"
        :options="courseTypeList"
      ></a-select>
    </div>
    <st-table
      rowKey="id"
      :loading="loading.getList"
      :dataSource="list"
      :columns="columns"
      :scroll="{ x: info.royalty_mode === 2 ? 1200 : 700, y: 230 }"
      @change="onPageChange"
      :simplePage="true"
      :page="page"
      :class="list.length > 0 ? 'st-scroll-data' : ''"
    />
  </st-modal>
</template>
<script>
import { ClassCommissionService } from './class-commission.service'
import { columns } from './class-commission.config'
import { COURSE_TYPE } from '@/constants/stat/course'
export default {
  name: 'ModalBrandFinanceClassCommission',
  bem: {
    b: 'modal-brand-finance'
  },
  serviceInject() {
    return {
      classCommissionService: ClassCommissionService
    }
  },
  rxState() {
    return {
      loading: this.classCommissionService.loading$,
      info: this.classCommissionService.info$,
      list: this.classCommissionService.list$,
      page: this.classCommissionService.page$,
      courseTypeList: this.classCommissionService.courseTypeList$
    }
  },
  computed: {
    columns,
    title() {
      if (this.info.royalty_mode === 1) {
        return '上课提成(按上课节数计算)'
      }
      return this.info.royalty_mode_text
        ? `上课提成(按消课价值计算/${this.info.royalty_mode_text})`
        : '上课提成(按消课价值计算)'
    }
  },
  props: {
    id: {
      type: [String, Number]
    }
  },
  data() {
    return {
      COURSE_TYPE,
      show: false,
      course_type: COURSE_TYPE.PERSONAL
    }
  },
  created() {
    this.getList({
      monthly_summary_id: this.id,
      course_type: this.course_type,
      size: 20,
      current_page: 1
    })
  },
  methods: {
    onChangeCourseType(event) {
      this.course_type = event
      this.getList({
        monthly_summary_id: this.id,
        course_type: this.course_type,
        size: 20,
        current_page: 1
      })
    },
    getList(query) {
      return this.classCommissionService.getList(query).subscribe()
    },
    onPageChange(data) {
      this.getList({
        monthly_summary_id: this.id,
        course_type: this.course_type,
        size: data.pageSize,
        current_page: data.current
      })
    }
  }
}
</script>
