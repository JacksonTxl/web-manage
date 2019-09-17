<template>
  <transition name="fade">
    <div v-if="loading">
      this is view component
    </div>
    <component-llf v-else>
      haha
    </component-llf>
  </transition>
</template>

<script>
import { ruleOptions } from './llf.config'
import { LlfService } from './llf.service'
import ComponentLlf from './llf#component'
export default {
  data() {
    return {
      loading: true
    }
  },
  components: {
    ComponentLlf
  },
  beforeCreate() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
  }
}
</script>
