<template>
  <div>
    <cabinet :value="list" @change="onChange"/>
  </div>
</template>
<script>
import { TemporaryService as CabinetService } from './temporary.service'
import Cabinet from '../cabinet#/cabinet'

export default {
  name: 'TemporaryCabinet',
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
  },
  methods: {
    onChange(checked) {
      this.$emit('change', checked)
    }
  }
}
</script>
