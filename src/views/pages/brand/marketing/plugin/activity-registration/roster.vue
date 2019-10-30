<template>
  <div :class="bPage()">
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
        <span class="value">{{ activityInfo$.address }}</span>
      </div>
    </div>
    <st-panel class="mg-t24" app>
      <div :class="bPage('search')">
        <div :class="bSearch('select-group')">
          <a-select
            placeholder="请选择状态"
            @change="onSingleSearch('ticket_status', $event)"
            class="mg-r16"
            v-model="query.ticket_status"
            style="width: 160px"
            :options="ticketStatus$"
          ></a-select>
          <a-select
            placeholder="请选择票种"
            @change="onSingleSearch('ticket_id', $event)"
            class="mg-r16"
            v-model="query.ticket_id"
            style="width: 160px"
            :options="ticketTypeOptions$"
          ></a-select>
        </div>
        <div :class="bSearch('input-group')">
          <st-input-search
            @search="onSingleSearch('keyword', $event)"
            placeholder="请输入姓名、手机号"
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
        >
          <span
            class="status"
            :class="bPage(`list-status-${text.id}`)"
            slot="ticket_status"
            slot-scope="text"
          >
            {{ text.name }}
          </span>
          <div slot="registration_info" slot-scope="text">
            <span v-if="!Array.isArray(text)">--</span>
            <a v-else @click="onClickShowInfo(text)">查看详情</a>
          </div>
          <template slot="action" slot-scope="text, record">
            <st-table-actions>
              <a v-if="record.ticket_status.id === 1">
                <st-popconfirm
                  title="签到后将视为已使用，您确定要将其核销签到吗？"
                  @confirm="onConfirmSignIn(record)"
                  okText="确认"
                  cancelText="取消"
                >
                  签到
                </st-popconfirm>
              </a>
            </st-table-actions>
          </template>
        </st-table>
      </div>
    </st-panel>
  </div>
</template>

<script>
import tableMixin from '@/mixins/table.mixin'
import { columns } from './roster.config'
import { RouteService } from '@/services/route.service'
import { RosterService } from './roster.service'
import MarketingActivitySignUpInfo from '@/views/biz-modals/marketing/activity-signup-info'
export default {
  name: 'RosterList',
  mixins: [tableMixin],
  bem: {
    bPage: 'marketing-plugin-activity-roster',
    bSearch: 'roster-search'
  },
  modals: {
    MarketingActivitySignUpInfo
  },
  serviceInject() {
    return {
      service: RosterService,
      routeService: RouteService
    }
  },
  rxState() {
    const {
      list$,
      page$,
      loading$,
      ticketStatus$,
      activityInfo$,
      ticketTypeOptions$
    } = this.service
    return {
      list$,
      page$,
      loading$,
      ticketStatus$,
      activityInfo$,
      ticketTypeOptions$,
      query: this.routeService.query$
    }
  },
  computed: {
    columns
  },
  methods: {
    onClickShowInfo(record) {
      this.$modalRouter.push({
        name: 'marketing-activity-sign-up-info',
        props: {
          signUpInfo: record
        }
      })
    },
    onConfirmSignIn(record) {
      this.service.updateSignUpChecked(record.id).subscribe(res => {
        this.$router.reload()
      })
    }
  }
}
</script>
