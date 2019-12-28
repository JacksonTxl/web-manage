<template>
  <st-panel app initial>
    <st-no-data
      v-if="
        $route.query.status === CLASS_STATUS.UNPUBLISH ||
          $route.query.status === CLASS_STATUS.PUBLISH_UNSTARTED
      "
    />
    <st-table
      v-if="
        $route.query.status !== CLASS_STATUS.UNPUBLISH &&
          $route.query.status !== CLASS_STATUS.PUBLISH_UNSTARTED
      "
      :columns="
        CLASS_STATUS.CLASSED || CLASS_STATUS.CLASS_END
          ? classColumns()
          : classEndColumns()
      "
      rowKey="member_id"
      :loading="loading.getGroupClassInfo"
      @change="onTableChange"
      :dataSource="groupClassList"
    >
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

export default {
  name: 'SmallCourseClassInfo',
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
      CLASS_STATUS
    }
  }
}
</script>
