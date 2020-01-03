<template>
  <st-modal
    wrapClassName="modal-submit-remedial-info"
    title="补课信息"
    :footer="null"
    v-model="show"
    width="380px"
  >
    <div class="small-course-message">
      <div class="small-course-title  small-course-item">
        {{ info.course_name }}
      </div>
      <div class="small-course-message-content">
        <div class="small-course-item">
          <div class="small-course-days">
            <span>时间</span>
            {{ info.start_date }}
          </div>
          <div class="small-course-coach">
            <span>{{ $c('coach') }}</span>
            {{ info.coach_name }}
          </div>
        </div>
        <div class=" small-course-item">
          <div class="small-course-court">
            <span>场地</span>
            {{ info.court_name }}
          </div>
          <div class="small-course-status">
            <span>状态</span>
            {{ info.reserve_status }}
          </div>
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
