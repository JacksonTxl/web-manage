<template>
  <st-panel app>
    <div :class="bPage()">
      <st-table
        :page="page"
        @change="onTableChange"
        :loading="loading.getUserList"
        :columns="columns"
        :dataSource="list"
        rowKey="id"
      ></st-table>
    </div>
  </st-panel>
</template>
<script>
import { UserService } from './user.service'
import { columns } from './user.config.ts'
import tableMixin from '@/mixins/table.mixin'

export default {
  name: 'PluginLotteryInfoUser',
  mixins: [tableMixin],
  data() {
    return {}
  },
  bem: {
    bPage: 'brand-marketing-plugin-lottery-info-user'
  },
  serviceInject() {
    return {
      userService: UserService
    }
  },
  rxState() {
    return {
      list: this.userService.list$,
      page: this.userService.page$,
      loading: this.userService.loading$
    }
  },
  components: {},
  computed: {
    columns
  }
}
</script>
