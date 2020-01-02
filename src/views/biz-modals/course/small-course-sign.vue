<template>
  <st-modal title="签到课程" :footer="null" v-model="show">
    <div :class="b('item')" class="bg-gray">
      请假课程
    </div>
    <div
      :class="b('bitem')"
      type="2"
      v-for="(item, index) in list"
      :key="index"
    >
      <div :class="b('title')">
        {{ item.class_info.course_name }}
      </div>
      <div>
        <span :class="b('label')">时间：</span>
        <span :class="b('value')" class="mg-r16">
          {{ item.class_info.time }}
        </span>
        <span :class="b('label')">教练：</span>
        <span :class="b('value')">{{ item.class_info.coach_name }}</span>
      </div>
    </div>
  </st-modal>
</template>
<script>
import { GroupUserClassSignService } from './small-course-sign.service'
export default {
  name: 'SmallCourseSign',
  bem: {
    b: 'modal-course-group-class',
    bitem: 'modal-course-group-class-item'
  },
  serviceInject() {
    return {
      groupUserClassSignService: GroupUserClassSignService
    }
  },
  data() {
    return {
      show: false,
      list: []
    }
  },
  props: {
    type: {
      type: Number
    },
    memberId: {
      type: Number
    }
  },
  methods: {
    getCourseGroupClassUserInfo() {
      let para = {
        id: this.$route.query.courseId,
        member_id: this.memberId,
        class_type: this.type
      }
      return this.groupUserClassSignService
        .getCourseGroupClassUserInfo(para)
        .subscribe(res => {
          this.list = res.list.filter(item => {
            return item.class_type === 1
          })
        })
    }
  },
  mounted() {
    this.getCourseGroupClassUserInfo()
  }
}
</script>
