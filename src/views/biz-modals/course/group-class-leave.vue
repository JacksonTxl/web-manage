<template>
  <st-modal title="请假情况" :footer="null" v-model="show">
    <div :class="b('left')">
      <div :class="b('item')" class="bg-gray">
        请假课程
      </div>
      <div
        :class="b('item')"
        type="2"
        v-for="(item, index) in list"
        :key="index"
      >
        <div :class="b('item-title')">
          {{ item.class_info.course_name }}
        </div>
        <div>
          <span :class="b('item-label')">时间：</span>
          <span :class="b('item-value')" class="mg-r16">
            {{ item.class_info.time }}
          </span>
          <span :class="b('item-label')">教练：</span>
          <span :class="b('item-value')">
            {{ item.class_info.coach_name }}
          </span>
        </div>
      </div>
    </div>
    <div :class="b('right')">
      <div :class="b('item')" class="bg-gray">
        补课信息
      </div>
      <div
        :class="b('item')"
        type="2"
        v-for="(item, index) in list"
        :key="index"
      >
        <div :class="b('item-title')">
          {{ item.make_up_info.course_name }}
        </div>
        <div>
          <span :class="b('item-label')">时间：</span>
          <span :class="b('item-value')" class="mg-r16">
            {{ item.make_up_info.time }}
          </span>
          <span :class="b('item-label')">教练：</span>
          <span :class="b('item-value')">
            {{ item.make_up_info.coach_name }}
          </span>
          <span :class="b('item-label')">状态：</span>
          <span :class="b('item-value')">
            {{ item.make_up_info.sign_status ? '已签到' : '未签到' }}
          </span>
        </div>
      </div>
    </div>
  </st-modal>
</template>
<script>
import { GroupUserClassLeaveService } from './group-class-leave.service'
export default {
  name: 'GroupClass',
  bem: {
    b: 'modal-course-group-class'
  },
  serviceInject() {
    return {
      groupUserClassLeaveService: GroupUserClassLeaveService
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
      return this.groupUserClassLeaveService
        .getCourseGroupClassUserInfo(para)
        .subscribe(res => {
          this.list = res.list
        })
    }
  },
  mounted() {
    this.getCourseGroupClassUserInfo()
  }
}
</script>
