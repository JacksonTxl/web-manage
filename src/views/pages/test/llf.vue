<template>
  <div>
    LLF
    {{query}}
    <a-input v-model='query.a'></a-input>
    <a-button :loading='isSwitching'
      @click='onSubmit'>onSubmit</a-button>
  </div>
</template>

<script>
import { ThemeService } from '@/services/theme.service'
import { LlfService } from '@/views/pages/test/llf.service'
import { RouteService } from '@/services/route.service'
var i = 0
export default {
  serviceInject() {
    return {
      themeService: ThemeService,
      llfService: LlfService,
      route: RouteService
    }
  },
  subscriptions() {
    return {
      query: this.route.query$
    }
  },
  data() {
    return {
      isSwitching: false
    }
  },
  methods: {
    onSubmit() {
      this.$router.push({ query: this.query })
    }
  }
}
</script>
