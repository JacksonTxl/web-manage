<template>
  <div>
    <cabinet
      type="temporary"
      :value="list"
      @change="onChange"
      :isOperationInBatch="isOperationInBatch"
    />
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
  props: {
    isOperationInBatch: {
      type: Boolean,
      default: false
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
