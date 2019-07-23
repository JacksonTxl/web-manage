<template>
  <div class="notice"></div>
</template>
<script>
import { RouteService } from '@/services/route.service'

import { NoticeService } from './notice.service'
export default {
  serviceInject() {
    return {
      routeService: RouteService,
      NoticeService: NoticeService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      authTabs: this.NoticeService.authTabs$
    }
  },
  methods: {
    onSearch() {
      this.$events.emit(
        `${this.$route.name}:onSingleSearch`,
        'search',
        this.query.search,
        { keyword: true }
      )
    }
  }
}
</script>
