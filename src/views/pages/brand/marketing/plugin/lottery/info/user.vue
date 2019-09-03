<template>
  <div>
    <st-panel app class="mg-b24">
      <Header />
    </st-panel>
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
  </div>
</template>
<script>
import { UserService } from './user.service'
import { columns } from './user.config.ts'
import tableMixin from '@/mixins/table.mixin'
import Header from './components#/header'

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
  components: { Header },
  computed: {
    columns
  }
}
</script>
