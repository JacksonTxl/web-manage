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
    <create-group-course
      v-show="currentIndex === 0"
      @goNext="goNext"
      @onCourseNameChange="onCourseNameChange"
    />
    <set-shop-coach
      @back="onBack"
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
import CreateGroupCourse from './add#/create-group-course'
import SetShopCoach from './add#/set-shop-coach'
import SetSellPrice from './add#/set-sell-price'
export default {
  components: {
    CreateGroupCourse, // 创建小班课程
    SetShopCoach, // 设置上课门店及教练
    SetSellPrice // 设置售卖价格
  },
  data(vm) {
    return {
      currentIndex: 0,
      courseId: 0,
      courseName: '',
      stepArr: [
        {
          title: '基础信息',
          key: 0
        },
        {
          title: `${vm.$c('coach')}信息`,
          key: 1
        },
        {
          title: '售卖信息',
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
    },
    onBack(step) {
      this.currentIndex = step
    }
  }
}
</script>
