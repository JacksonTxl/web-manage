<template>
  <stored-card :isEdit="true" :info="info.info"></stored-card>
</template>

<script>
import storedCard from './add-stored'
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
  components: {
    storedCard
  }
}
</script>
