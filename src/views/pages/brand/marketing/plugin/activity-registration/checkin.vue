<template>
  <st-panel :class="bPage()" app initial>
    <header :class="bPage('header')">
      <a-input-search
        placeholder="输入票号，用户姓名，手机号进行搜索"
        @search="onSingleSearch('keyword', $event)"
      >
        <a-button type="primary" slot="enterButton">
          搜索
        </a-button>
      </a-input-search>
    </header>
    <main :class="bPage('main')">
      <st-container v-if="isSearch">
        <st-table
          :columns="columns"
          rowKey="id"
          @change="onTableChange"
          :scroll="{ x: 1500 }"
          :loading="loading$.getList"
          :dataSource="list$"
          :page="page$"
        ></st-table>
      </st-container>
      <checkin-guide v-else />
    </main>
  </st-panel>
</template>

<script>
import tableMixin from '@/mixins/table.mixin'
import { columns } from './checkin-table.config'
import CheckinGuide from '@/views/pages/brand/marketing/plugin/activity-registration/components#/checkin-guide.vue'
import { RouteService } from '@/services/route.service'
import { CheckinService } from './checkin.service'
export default {
  name: 'CheckInList',
  mixins: [tableMixin],
  bem: {
    bPage: 'page-activity-checkin'
  },
  components: {
    CheckinGuide
  },
  serviceInject() {
    return {
      service: CheckinService,
      routeService: RouteService
    }
  },
  rxState() {
    const { page$, list$, loading$ } = this.service
    return {
      query: this.routeService.query$,
      loading$,
      page$,
      list$
    }
  },
  computed: {
    columns,
    isSearch() {
      return !!this.query.keyword
    }
  }
}
</script>
