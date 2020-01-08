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
          :page="false"
        >
          <template slot="ticket_status" slot-scope="text">
            <st-text
              :status="{
                error: text.id === 1,
                success: text.id === 2,
                default: text.id === 3
              }"
            >
              {{ text.name }}
            </st-text>
          </template>
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
              <span v-else>{{ record.ticket_status.name }}</span>
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
      service: CheckinService
    }
  },
  rxState() {
    const { page$, list$, loading$ } = this.service
    return {
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
        this.message.warn({ content: '请输入内容' })
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
