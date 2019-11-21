<template>
  <personal-card
    :isEdit="true"
    :info="info.info"
    :coach="coach"
  ></personal-card>
</template>

<script>
import personalCard from './add-personal'
import { EditStoredService } from './edit-stored.service'
import { EditPersonalService } from './edit-personal.service'
export default {
  serviceInject() {
    return {
      editStoredService: EditStoredService,
      editPersonalService: EditPersonalService
    }
  },
  rxState() {
    return {
      info: this.editStoredService.info$,
      coach: this.editPersonalService.coach$
    }
  },
  mounted() {
    this.editStoredService.init().subscribe(res => {})
  },
  components: {
    personalCard
  }
}
</script>
