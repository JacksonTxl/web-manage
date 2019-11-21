<template>
  <stored-card :isEdit="true" :list="list.list" :info="info.info"></stored-card>
</template>

<script>
import storedCard from './add-stored'
import { EditStoredService } from './edit-stored.service'
export default {
  name: 'PageBrandMarketingGroupEditStored',
  serviceInject() {
    return {
      edit: EditStoredService
    }
  },
  rxState() {
    return {
      info: this.edit.info$,
      list: this.edit.list$
    }
  },
  components: {
    storedCard
  }
}
</script>
