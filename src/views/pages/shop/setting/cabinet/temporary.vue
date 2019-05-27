<template>
  <div>
    <cabinet :value="list"/>
  </div>
</template>
<script>
import { TemporaryService as CabinetService } from './temporary.service'
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
