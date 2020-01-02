<template>
  <st-modal
    wrapClassName="modal-submit-remedial-info"
    title="补课信息"
    :footer="null"
    v-model="show"
    width="306px"
  >
    <div class="small-course-message">
      <div class="small-course-title  small-course-item">
        {{ info.course_name }}
      </div>
      <div class="small-course-message-content">
        <div class="small-course-days small-course-item">
          <span>时间</span>
          {{ info.course_time }}
        </div>
        <div class="small-course-coach small-course-item">
          <span>{{ $c('coach') }}</span>
          {{ info.staff_name }}
        </div>
        <div class="small-course-court small-course-item">
          <span>场地</span>
          {{ info.court_name }}
        </div>
        <div class="small-course-status small-course-item">
          <span>状态</span>
          {{ info.status }}
        </div>
      </div>
    </div>
  </st-modal>
</template>

<script>
export default {
  name: 'SubmitCourse',
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {}
}
</script>
