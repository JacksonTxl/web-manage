<template>
  <personal-card
    :isEdit="true"
    :info="info.info"
    :coachList="coachList"
  ></personal-card>
</template>

<script>
import personalCard from './add-personal'
import { EditStoredService } from './edit-stored.service'
import { EditCoachService } from './edit-personal.service'
export default {
  serviceInject() {
    return {
      editStoredService: EditStoredService,
      editCoachService: EditCoachService
    }
  },
  rxState() {
    return {
      info: this.editStoredService.info$,
      coachList: this.editCoachService.coachList$
    }
  },
  mounted() {
    this.editStoredService.init().subscribe(res => {})
    // this.editCoachService.init().subscribe(res => {})
  },
  components: {
    personalCard
  }
}
</script>
