<template>
  <st-panel app>
    <st-table
      :page="page"
      @change="onTableChange"
      :loading="loading.getUserList"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
    ></st-table>
  </st-panel>
</template>
<script>
import { UserService } from './user.service'
import { columns } from './user.config.ts'
import tableMixin from '@/mixins/table.mixin'
import { RouteService } from '@/services/route.service'

export default {
  name: 'PluginLotteryInfoUser',
  mixins: [tableMixin],
  data() {
    return {}
  },
  serviceInject() {
    return {
      userService: UserService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      list: this.userService.list$,
      page: this.userService.page$,
      loading: this.userService.loading$
    }
  },
  computed: {
    columns
  }
}
</script>
