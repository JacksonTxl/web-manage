<template>
  <st-panel :class="bPage()" app initial>
    <header :class="bPage('header')">
      <a-input-search
        placeholder="输入票号，用户姓名，手机号进行搜索"
        v-model="keyword"
        @search="getList"
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
          :loading="loading$.getList"
          :dataSource="list$"
          :pagination="null"
        >
          <span
            :class="bPage(`main-status-${text.id}`)"
            slot="ticket_status"
            slot-scope="text"
          >
            <st-status-text v-if="text.id === 1" :status="{ error: 1 }">
              {{ text.name }}
            </st-status-text>
            <st-status-text v-if="text.id === 2" :status="{ success: 1 }">
              {{ text.name }}
            </st-status-text>
            <st-status-text v-if="text.id === 5" :status="{ warning: 1 }">
              {{ text.name }}
            </st-status-text>
            <st-status-text v-if="text.id === 4" :status="{ info: 1 }">
              {{ text.name }}
            </st-status-text>
            <st-status-text v-if="text.id === 3" :status="{ normal: 1 }">
              {{ text.name }}
            </st-status-text>
          </span>
          <template slot="action" slot-scope="text, record">
            <st-table-actions>
              <st-popconfirm
                v-if="record.ticket_status.id === 1"
                title="签到后将视为已使用，您确定要将其核销签到吗？"
                @confirm="onConfirmSignIn(record)"
                okText="确认"
                cancelText="取消"
              >
                <a>
                  签到
                </a>
              </st-popconfirm>
            </st-table-actions>
          </template>
        </st-table>
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
    columns
  },
  data() {
    return {
      keyword: '',
      isSearch: false
    }
  },
  methods: {
    getList() {
      if (!this.keyword) {
        this.message.warning({ content: '请输入内容' })
        return
      }
      return this.service.getList({ keyword: this.keyword }).subscribe(res => {
        this.isSearch = true
      })
    },
    onConfirmSignIn(record) {
      this.service.updateSignUpChecked(record.id).subscribe(res => {
        this.keyword = ''
        this.$router.reload()
      })
    },
    onTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      pager.pageSize = pagination.pageSize
      this.page$ = pager
    }
  }
}
</script>
