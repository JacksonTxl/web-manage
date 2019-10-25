<template>
  <st-panel app initial :tabs="authTabs">
    <div slot="actions">
      <st-input-search
        v-model="query.search"
        @search="onSearchCourseName"
        :placeholder="placeholder"
        :class="b('search')"
        style="width:372px"
      />
    </div>
    <router-view></router-view>
  </st-panel>
</template>
<script>
import { RouteService } from '@/services/route.service'
import { ListService } from './list.service'
export default {
  name: 'PageShopSoldCourse',
  bem: {
    b: 'page-shop-sold'
  },
  serviceInject() {
    return {
      routeService: RouteService,
      listService: ListService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      authTabs: this.listService.authTabs$,
      placeholder: this.listService.placeholder$
    }
  },
  methods: {
    onSearchCourseName(val) {
      this.$router.push({ query: { ...this.query, search: this.query.search } })
    }
  }
}
</script>
