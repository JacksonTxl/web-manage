<template>
  <member-card :isEdit="true" :info="info.info"></member-card>
</template>

<script>
import memberCard from './add-member'
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
    this.editStoredService
      .init(this.$route.query.id ? this.$route.query.id : '')
      .subscribe(res => {})
  },
  components: {
    memberCard
  }
}
</script>
