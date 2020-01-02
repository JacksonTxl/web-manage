<template>
  <st-panel app initial>
    <st-no-data v-if="isShowNoData" />
    <st-table
      v-else
      :columns="isShowNormalColumns ? classColumns() : classEndColumns()"
      rowKey="member_id"
      :loading="loading.getGroupClassInfo"
      @change="onTableChange"
      :dataSource="groupClassList"
    >
      <div slot="user_name" slot-scope="text, record">
        <span>{{ record.user_name }}</span>
        <st-icon
          type="user-type"
          v-if="record.sex === SEX.BOY && record.is_minors"
          color="#3F66F6"
        />
        <st-icon
          type="user-type"
          v-if="record.sex === SEX.GIRL && record.is_minors"
          color="#FF5E41"
        />
      </div>
      <div slot="leave_class_hours" slot-scope="text, record">
        <a
          v-modal-link="{
            name: 'course-small-course-leave',
            props: { type: 1, memberId: record.member_id }
          }"
        >
          {{ record.leave_class_hours }}
        </a>
      </div>
      <div slot="truancy_class_hours" slot-scope="text, record">
        <a
          v-modal-link="{
            name: 'course-small-course-truancy',
            props: { type: 2, memberId: record.member_id }
          }"
        >
          {{ record.truancy_class_hours }}
        </a>
      </div>
      <div slot="sign_class_hours" slot-scope="text, record">
        <a
          v-modal-link="{
            name: 'course-small-course-sign',
            props: { type: 3, memberId: record.member_id }
          }"
        >
          {{ record.sign_class_hours }}
        </a>
      </div>
    </st-table>
  </st-panel>
</template>
<script>
import { classColumns, classEndColumns } from '../info#table.config'
import { ClassService } from './class.service'
import CourseSmallCourseLeave from '@/views/biz-modals/course/small-course-leave'
import CourseSmallCourseTruancy from '@/views/biz-modals/course/small-course-truancy'
import CourseSmallCourseSign from '@/views/biz-modals/course/small-course-sign'
import { CLASS_STATUS } from '@/constants/course/small-course'
import { SEX } from '@/constants/member/info'
import tableMixin from '@/mixins/table.mixin'

export default {
  name: 'SmallCourseClassInfo',
  mixins: [tableMixin],
  serviceInject() {
    return {
      classService: ClassService
    }
  },
  rxState() {
    return {
      groupClassList: this.classService.groupClassList$,
      loading: this.classService.loading$
    }
  },
  modals: {
    CourseSmallCourseLeave,
    CourseSmallCourseTruancy,
    CourseSmallCourseSign
  },
  data() {
    return {
      classColumns,
      classEndColumns,
      CLASS_STATUS,
      SEX,
      curStatus: 0
    }
  },
  created() {
    this.curStatus = this.curStatus - 0
  },
  computed: {
    isShowNoData() {
      return (
        this.curStatus === this.CLASS_STATUS.UNPUBLISH ||
        this.curStatus === this.CLASS_STATUS.PUBLISH_UNSTARTED
      )
    },
    isShowNormalColumns() {
      return (
        this.curStatus === this.CLASS_STATUS.CLASSED ||
        this.curStatus === this.CLASS_STATUS.CLASS_END
      )
    }
  }
}
</script>
