<template>
    <st-panel app>
    <a-row :class="bstep()" class="mg-b48" :gutter="8">
      <a-col offset="1" :span="stepsSpan">
        <a-steps :current="currentIndex">
          <a-step v-for="item in stepArr" :key="item.key" :title="item.title"
            @click="changeStep(item.key)" class="cursor-pointer"/>
        </a-steps>
      </a-col>
    </a-row>
    <create-team-course @goNext="goNext" v-show="currentIndex == 0"/>
    <set-course-lesson v-show="currentIndex == 1"/>
  </st-panel>
</template>
<script>
import CreateTeamCourse from './add#/create-team-course'
import SetCourseLesson from './add#/set-course-lesson'
export default {
  components: {
    CreateTeamCourse,
    SetCourseLesson
  },
  bem: {
    b: 'page-add-staff',
    bstep: 'page-add-staff-steps',
    bHeader: 'default-brand-header'
  },
  data() {
    return {
      currentIndex: 0,
      stepsSpan: 12,
      stepArr: [
        {
          title: '创建团体课程',
          key: 1
        },
        {
          title: '设置上课门店',
          key: 2
        }
      ]
    }
  },
  methods: {
    goNext(e) {
      console.log(e)
      if (this.currentIndex < 2) {
        this.currentIndex = this.currentIndex + 1
      }
    },
    changeStep(step) {
      this.currentIndex = step
    }
  }
}
</script>
