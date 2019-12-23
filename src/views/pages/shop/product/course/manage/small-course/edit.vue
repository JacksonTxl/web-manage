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
      :info="info"
      @onCourseNameChange="onCourseNameChange"
    />
    <set-shop-coach
      v-show="currentIndex === 1"
      :courseName="courseName"
      :info="info"
      :courseId="courseId"
      @goNext="goNext"
    />
    <set-sell-price
      v-show="currentIndex === 2"
      :courseName="courseName"
      :info="info"
      :courseId="courseId"
      @goNext="goNext"
    />
  </st-panel>
</template>
<script>
import CreateGroupCourse from './edit#/create-group-course'
import SetShopCoach from './edit#/set-shop-coach'
import SetSellPrice from './edit#/set-sell-price'
import { EditService } from './edit.service'

export default {
  components: {
    CreateGroupCourse, // 创建小班课程
    SetShopCoach, // 设置上课门店及教练
    SetSellPrice // 设置售卖价格
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
      stepArr: [
        {
          title: '基础信息',
          key: 0
        },
        {
          title: '教练信息',
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
    }
  }
}
</script>
