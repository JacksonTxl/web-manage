<template>
  <st-container>
    <st-table
      :columns="columns"
      rowKey="id"
      @change="onTableChange"
      :scroll="{ x: 1500 }"
      :dataSource="list$"
    ></st-table>
  </st-container>
</template>

<script>
import { columns } from './checkin-table.config'
import tableMixin from '@/mixins/table.mixin'
import { RouteService } from '@/services/route.service'
import { CheckinService } from '../plugin/activity-registration/checkin.service'
export default {
  name: 'CheckInGuide',
  mixins: [tableMixin],
  computed: {
    columns
  },
  serviceInject() {
    return {
      service: CheckinService,
      routeService: RouteService
    }
  },
  rxState() {
    const { page$, list$ } = this.service
    return {
      query: this.routeService.query$,
      page$,
      list$
    }
  }
}
</script>
