<template>
  <st-panel app>
    <a-row class="mg-b48 mg-t48" :gutter="8">
      <a-col offset="1" :span="22">
        <a-steps :current="currentIndex">
          <a-step
            v-for="item in stepArr"
            :key="item.key"
            :title="item.title"
            @click="changeStep(item.key)"
            class="cursor-pointer"
          />
        </a-steps>
      </a-col>
    </a-row>
    <create-personal-course
      v-show="currentIndex === 0"
      @goNext="goNext"
      @onCourseNameChange="onCourseNameChange"
    />
    <set-shop-coach
      v-show="currentIndex === 1"
      :courseName="courseName"
      :courseId="courseId"
      @goNext="goNext"
    />
    <set-sell-price
      v-show="currentIndex === 2"
      :courseName="courseName"
      :courseId="courseId"
      @goNext="goNext"
    />
  </st-panel>
</template>
<script>
import CreatePersonalCourse from './add#/create-personal-course'
import SetShopCoach from './add#/set-shop-coach'
import SetSellPrice from './add#/set-sell-price'
export default {
  components: {
    CreatePersonalCourse, // 创建私教课程
    SetShopCoach, // 设置上课门店及教练
    SetSellPrice // 设置售卖价格
  },
  data() {
    return {
      currentIndex: 0,
      courseId: 0,
      courseName: '',
      stepArr: [
        {
          title: '创建私教课',
          key: 0
        },
        {
          title: '设置售卖门店及教练',
          key: 1
        },
        {
          title: '设置售卖价格',
          key: 2
        }
      ]
    }
  },
  methods: {
    goNext(courseId) {
      if (courseId) {
        this.courseId = courseId
      }
      if (this.currentIndex < 2) {
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
