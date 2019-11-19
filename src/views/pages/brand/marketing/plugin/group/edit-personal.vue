<template>
  <personal-card :isEdit="true" :info="info.info"></personal-card>
</template>

<script>
import personalCard from './add-personal'
import { EditStoredService } from './edit-stored.service'
export default {
  serviceInject() {
    return {
      editStoredService: EditStoredService
    }
  },
  rxState() {
    return {
      info: this.editStoredService.info$
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
