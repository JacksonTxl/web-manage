<template>
  <st-panel app>
    <a-row class="mg-b48 mg-t48" :gutter="8">
      <a-col offset="1" :span="22" >
        <a-steps :current="currentIndex">
          <a-step v-for="item in stepArr" :key="item.key" :title="item.title"
            @click="changeStep(item.key)" class="cursor-pointer"/>
        </a-steps>
      </a-col>
    </a-row>
    <set-course  v-show="currentIndex === 0" :info="info" @goNext="goNext"
      @onCourseNameChange="onCourseNameChange" />
    <set-shop-coach v-show="currentIndex === 1" :info="info" :courseName="courseName"
      :courseId="courseId" @goNext="goNext"
    />
  </st-panel>
</template>
<script>
import SetCourse from './edit#/set-course'
import SetShopCoach from './edit#/set-shop-coach'
import { EditService } from './edit.service'
export default {
  components: {
    SetCourse, // 创建团体课程
    SetShopCoach // 设置上课门店及教练
  },
  serviceInject() {
    return {
      editService: EditService
    }
  },
  rxState() {
    return {
      info: this.editService.info$
    }
  },
  data() {
    return {
      currentIndex: 0,
      courseId: 0,
      courseName: '',
      stepArr: [{
        title: '创建团体课',
        key: 0
      }, {
        title: '设置上课门店',
        key: 1
      }]
    }
  },
  methods: {
    goNext(courseId) {
      if (courseId) {
        this.courseId = courseId
      }
      if (this.currentIndex < 1) {
        this.currentIndex = this.currentIndex + 1
      }
    },
    changeStep(step) {
      this.currentIndex = step
    },
    onCourseNameChange(courseName) {
      this.courseName = courseName
      console.log('courseName', courseName)
    }
  }
}
</script>
