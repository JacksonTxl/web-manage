<template>
  <st-panel app>
    <set-team-course :info="info"/>
  </st-panel>
</template>
<script>
import SetTeamCourse from '@/views/fragments/course/team#/set-team-course'
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
  components: {
    SetTeamCourse
  }
}
</script>
