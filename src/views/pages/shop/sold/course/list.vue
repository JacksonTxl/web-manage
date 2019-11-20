<template>
  <st-panel app initial :tabs="authTabs">
    <di-view slot="actions" name="SHOP_SOLD_COURSE_LIST_SEARCH"></di-view>

    <router-view></router-view>
  </st-panel>
</template>
<script>
import { ListService } from './list.service'
export default {
  name: 'PageShopSoldCourse',
  bem: {
    b: 'page-shop-sold'
  },
  serviceInject() {
    return {
      listService: ListService
    }
  },
  rxState() {
    return {
      authTabs: this.listService.authTabs$,
      placeholder: this.listService.placeholder$
    }
  },
  methods: {
    onSearchCourseName(val) {
      this.$router.push({
        query: { ...this.$searchQuery, search: this.$searchQuery.search }
      })
    }
  }
}
</script>
