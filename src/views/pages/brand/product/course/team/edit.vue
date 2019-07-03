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
    <set-team-course
      v-show="currentIndex === 0"
      from="brand"
      :info="info"
      @goNext="goNext"
      @onCourseNameChange="onCourseNameChange"
    />
    <set-shop-coach
      v-show="currentIndex === 1"
      :info="info"
      @goNext="goNext"
    />
  </st-panel>
</template>
<script>
import SetTeamCourse from '@/views/fragments/course/team#/set-team-course'
import SetShopCoach from '@/views/fragments/course/team#/set-shop-coach'
import { EditService } from './edit.service'
export default {
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
      stepArr: [{
        title: '编辑团体课',
        key: 0
      }, {
        title: '设置上课门店',
        key: 1
      }]
    }
  },
  methods: {
    goNext(courseId) {
      this.setInfo({
        course_id: courseId
      })
      if (this.currentIndex < 1) {
        this.currentIndex = this.currentIndex + 1
      }
    },
    changeStep(step) {
      this.currentIndex = step
    },
    onCourseNameChange(courseName) {
      this.setInfo({
        course_name: courseName
      })
    },
    setInfo(obj) {
      this.info = {
        ...this.info,
        ...obj
      }
    }
  },
  components: {
    SetTeamCourse,
    SetShopCoach
  }
}
</script>
