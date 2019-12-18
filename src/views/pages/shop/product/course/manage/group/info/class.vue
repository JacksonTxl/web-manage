<template>
  <st-panel app initial>
    <st-table
      :columns="classColumns()"
      rowKey="id"
      :dataSource="groupClassList"
    >
      <div slot="leave_class_hours" slot-scope="text, record">
        <a
          v-modal-link="{
            name: 'course-group-class-leave',
            props: { type: 1, memberId: record.member_id }
          }"
        >
          {{ record.leave_class_hours }}
        </a>
      </div>
      <div slot="truancy_class_hours" slot-scope="text, record">
        <a
          v-modal-link="{
            name: 'course-group-class-truancy',
            props: { type: 2, memberId: record.member_id }
          }"
        >
          {{ record.truancy_class_hours }}
        </a>
      </div>
      <div slot="sign_class_hours" slot-scope="text, record">
        <a
          v-modal-link="{
            name: 'course-group-class-sign',
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
import { classColumns } from '../info#table.config'
import { ClassService } from './class.service'
import CourseGroupClassLeave from '@/views/biz-modals/course/group-class-leave'
import CourseGroupClassTruancy from '@/views/biz-modals/course/group-class-truancy'
import CourseGroupClassSign from '@/views/biz-modals/course/group-class-sign'

export default {
  name: 'GroupCourseClassInfo',
  serviceInject() {
    return {
      classService: ClassService
    }
  },
  rxState() {
    return {
      groupClassList: this.classService.groupClassList$
    }
  },
  modals: {
    CourseGroupClassLeave,
    CourseGroupClassTruancy,
    CourseGroupClassSign
  },
  data() {
    return {
      classColumns
    }
  }
}
</script>
