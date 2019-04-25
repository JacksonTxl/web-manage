<template>
  <st-panel app>
    <set-course :info="info"/>
  </st-panel>
</template>
<script>
import SetCourse from './edit#/set-course'
import { EditService } from './edit.service'
export default {
  components: {
    SetCourse
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
  }
}
</script>
