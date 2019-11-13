<template>
  <st-modal title="抛入公海" @ok="save" v-model="show" width="328px">
    是否将教练抛入公海？
  </st-modal>
</template>
<script>
import { DropCoachSeaService } from './drop-coach-sea.service'
export default {
  serviceInject() {
    return {
      Service: DropCoachSeaService
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
      this.Service.dropCoachSea(this.memberIds).subscribe(state => {
        this.show = false
        this.$emit('success', true)
      })
    }
  }
}
</script>
