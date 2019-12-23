<template>
  <st-modal
    wrapClassName="modal-submit-course"
    @ok="save"
    :footer="null"
    v-model="show"
    width="504px"
  >
    <div class="submit-course-content">
      <img
        class="submit-tips-pic"
        src="~@/assets/img/icon_setting_success.png"
        alt="验证成功提示图片"
      />
      <st-t3 class="submit-tips-text">验证成功</st-t3>
      <p class="submit-item">
        <span>总课时：</span>
        8节
      </p>
      <p class="submit-item mg-b8">
        <span>总排课：</span>
        19节
      </p>
      <p class="mg-b24">固定排课，已自动为您去掉后11节</p>
      <div class="save-schedule-btn">
        <st-button @click="cancelSchedule">
          取消排课
        </st-button>
        <st-button type="primary" class="mg-l12">
          完成排课
        </st-button>
      </div>
    </div>
  </st-modal>
</template>

<script>
import { SubmitCourseService } from './submit-course.service'
export default {
  name: 'SubmitCourse',
  serviceInject() {
    return {
      submitCourseService: SubmitCourseService
    }
  },
  rxState() {
    return {}
  },
  props: {
    scheduleList: Array,
    default: () => {
      return []
    }
  },
  data() {
    return {
      show: false
    }
  },
  created() {
    console.log(this.scheduleList)
  },
  methods: {
    cancelSchedule() {
      this.show = false
    },
    save() {
      // this.InbatchInfoService.addScheduleInBatch(reqdata).subscribe(() => {
      //   this.show = false
      //   this.$router.push({
      //     query: {
      //       ...this.$searchQuery
      //     }
      //   })
      // })
    }
  }
}
</script>
