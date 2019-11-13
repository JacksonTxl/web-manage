<template>
  <st-modal title="抛入公海" @ok="save" v-model="show" width="328px">
    是否将销售抛入公海？
  </st-modal>
</template>
<script>
import { DropSalerSeaService } from './drop-saler-sea.service'
export default {
  serviceInject() {
    return {
      Service: DropSalerSeaService
    }
  },
  props: {
    memberIds: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      show: false
    }
  },
  created() {},
  methods: {
    save(e) {
      e.preventDefault()
      this.Service.dropSalerSea(this.memberIds).subscribe(state => {
        this.show = false
        this.$emit('success', true)
      })
    }
  }
}
</script>
