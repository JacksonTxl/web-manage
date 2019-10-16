<template>
  <div :class="bPage()">
    {{ activityInfo$ }}
    <div :class="bPage('info')">
      <st-t3 class="title">{{ activityInfo$.activity_name }}</st-t3>
      <div class="time mg-t24">
        <span class="label">活动时间：</span>
        <span class="value">
          {{ activityInfo$.start_time }}-{{ activityInfo$.end_time }}
        </span>
      </div>
      <div class="address mg-t8">
        <span class="label">活动地点：</span>
        <span class="value">{{ activityInfo$.activity_address }}</span>
      </div>
    </div>
    <st-panel class="mg-t24">
      <div :class="bPage('search')">
        <div :class="bSearch('select-group')">
          <a-select
            placeholder="请选择状态"
            @change="onSingleSearch('ticket_status', $event)"
            class="mg-r16"
            style="width: 160px"
            :options="ticketStatus$"
          ></a-select>
          <a-select
            placeholder="请选择票种"
            @change="onSingleSearch('ticket_id', $event)"
            class="mg-r16"
            style="width: 160px"
            :options="ticketTypeOptions$"
          ></a-select>
        </div>
        <div :class="bSearch('input-group')">
          <st-input-search
            @search="onSingleSearch('activity_name', $event)"
            placeholder="请输入优惠券名称"
            style="width: 290px;"
          />
        </div>
      </div>
      <div :class="bPage('list')" class="mg-t16">
        <st-table
          :page="page$"
          rowKey="id"
          :columns="columns"
          @change="onTableChange"
          :scroll="{ x: 1500 }"
          :dataSource="list$"
        ></st-table>
      </div>
    </st-panel>
  </div>
</template>

<script>
import tableMixin from '@/mixins/table.mixin'
import { columns } from './roster.config'
import { RouteService } from '@/services/route.service'
import { RosterService } from './roster.service'
export default {
  name: 'RosterList',
  mixins: [tableMixin],
  bem: {
    bPage: 'marketing-plugin-activity-roster',
    bSearch: 'roster-search'
  },
  serviceInject() {
    return {
      service: RosterService
    }
  },
  rxState() {
    const {
      list$,
      page$,
      loading$,
      ticketStatus$,
      activityInfo,
      ticketTypeOptions$
    } = this.service
    return {
      list$,
      page$,
      loading$,
      ticketStatus$,
      activityInfo$,
      ticketTypeOptions$
    }
  },
  computed: {
    columns
  }
}
</script>
