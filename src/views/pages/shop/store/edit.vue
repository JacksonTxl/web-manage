<template>
  <good-add :isEditMode="true" :info="info"></good-add>
</template>
<script>
import GoodAdd from './add'
import { EditService } from './edit.service.ts'
export default {
  rxState() {
    return {
      info: this.editService.info$
    }
  },
  serviceInject() {
    return {
      editService: EditService
    }
  },
  components: {
    GoodAdd
  }
}
</script>
