<template>
  <st-panel app initial :tabs="authTabs">
    <div slot="actions">
      <st-input-search
        v-model="query.search"
        @search="onSearchCourseName"
        :placeholder="placeholder"
        :class="b('search')"
        :style="width"
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
      routerName: this.listService.routerName$
    }
  },
  data() {
    return {
      placeholder: '请输入私教课名、合同编号、会员姓名或手机号查找',
      width: '350px'
    }
  },
  watch: {
    routerName(newVal) {
      if (newVal === 'shop-sold-course-list-personal') {
        this.placeholder = '请输入私教课名、合同编号、会员姓名或手机号查找'
      } else if (newVal === 'shop-sold-course-list-package') {
        this.placeholder = '请输入课程包名、合同编号、会员姓名或手机号查找'
      }
    }
  },
  created() {},
  methods: {
    onSearchCourseName(val) {
      this.$router.push({ query: { ...this.query, search: this.query.search } })
    }
  }
}
</script>
