<template>
  <div>
    <cabinet :value="list"/>
  </div>
</template>
<script>
import { LongTermService as CabinetService } from './long-term.service'
import Cabinet from '../cabinet#/cabinet'
export default {
  serviceInject() {
    return {
      cabinetService: CabinetService
    }
  },
  rxState() {
    const cabinetService = this.cabinetService
    return {
      resData: cabinetService.resData$
    }
  },
  components: {
    Cabinet
  },
  computed: {
    list() {
      return this.resData.list
    }
  }
}
</script>
