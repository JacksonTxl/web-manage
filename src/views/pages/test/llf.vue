<template>
  <div>
    LLF
    {{searchQuery}}
    <a-input v-model='searchQuery.a'></a-input>
    <a-button :loading='isSwitching'
      @click='onSubmit'>onSubmit</a-button>
  </div>
</template>

<script>
import { ThemeService } from '@/services/theme.service'
import { LlfService } from '@/views/pages/test/llf.service'
var i = 0
export default {
  serviceInject() {
    return {
      themeService: ThemeService,
      llfService: LlfService
    }
  },
  subscriptions() {
    return {
      searchQuery: this.llfService.searchQuery$
    }
  },
  data() {
    return {
      isSwitching: false
    }
  },
  methods: {
    onSubmit() {
      console.log('submit')
      this.$router.push({ query: this.searchQuery })
    }
  }
}
</script>
