<template>
  <good-add :isEditMode="true" :info="info"></good-add>
</template>
<script>
import GoodAdd from './add'
import { EditService } from './edit.service.ts'
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
    GoodAdd
  }
}
</script>
